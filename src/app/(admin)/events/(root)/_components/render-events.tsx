"use client";

import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { CalendarOff, CircleIcon, Plus, Users2Icon } from "lucide-react";
import { ArrowRight, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { awsImageLoader } from "@/lib/image-loader";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

import { type Timeframe } from "./events";

type RenderTimeframeProps = {
  timeframe: Timeframe;
};

export const RenderTimeframe = ({ timeframe }: RenderTimeframeProps) => {
  const { data, isLoading, isError } = api.event.list.useQuery(
    { eventTimeFrame: timeframe },
    { enabled: !!timeframe },
  );

  if (isLoading) return <Skeleton />;

  if (isError) return redirect(paths.events.error);

  if (data && data.length === 0) return <NoEvents timeframe={timeframe} />;

  if (data && data.length !== 0)
    return (
      <div className="flex flex-col gap-6 md:gap-0">
        {data.map((event, idx) => (
          <div
            key={event.id}
            className="flex w-full gap-4 md:h-[250px] md:gap-0"
          >
            <div className="flex w-1/12 flex-col justify-between md:w-1/3 md:flex-row">
              <div className="hidden px-1.5 md:block">
                <EventDate date={event.date} />
              </div>
              <div className="flex h-full flex-col items-center md:px-10  ">
                <CircleIcon className="size-4 text-border" />
                <div
                  className={cn(
                    "relative -mb-6 h-[105%] w-[1px] border-l-2 border-dashed border-border/80 md:mb-0",
                  )}
                >
                  {idx === data.length - 1 && (
                    <div className="absolute -right-2.5 top-0 h-full w-5 bg-gradient-to-b from-background/0 via-background/70 to-background"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mt-2 flex-1 space-y-3">
              <div className="flex items-center gap-3 px-3 md:hidden">
                <EventDate date={event.date} />
              </div>
              <EventCard event={event} />
            </div>
          </div>
        ))}
      </div>
    );

  return null;
};

const EventDate = ({ date }: { date: Date }) => (
  <>
    {isYesterday(date) && <p className="text-lg">Yesterday</p>}
    {isToday(date) && <p className="text-lg">Today</p>}
    {isTomorrow(date) && <p className="text-lg">Tomorrow</p>}
    {!isYesterday(date) && !isToday(date) && !isTomorrow(date) && (
      <p className="md:text-lg">{format(date, "LLL d")}</p>
    )}
    <p className="text-sm text-muted-foreground md:text-base">
      {format(date, "EEEE")}
    </p>
    <p className="text-sm text-muted-foreground md:hidden">15:00 PM</p>
  </>
);

interface EventCardProps {
  event: RouterOutputs["event"]["list"][number];
}

export const EventCard = ({ event }: EventCardProps) => {
  const { images, name, location } = event;

  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(paths.event.root(event.id))}
      className="flex flex-col-reverse rounded-lg md:flex-row "
    >
      <CardHeader className="flex flex-1 flex-col justify-around gap-3 py-3">
        <CardDescription className="hidden md:block">
          {/* TODO: add real time */}
          1:00 PM
        </CardDescription>
        <CardTitle className="cursor-pointer text-lg font-semibold">
          {name}
        </CardTitle>
        <div className="space-y-1.5 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm">
            <MapPinIcon className="size-4" />
            {location ? location : "Missing location "}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Users2Icon className="size-4" />
            {/* TODO: add real guests number */}
            No Guests
          </p>
        </div>
        <Link
          href={paths.events.overview(event.id)}
          className={buttonVariants({
            size: "sm",
            variant: "default",
            className: "md:w-44",
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <p>Manage Event</p>
          <ArrowRight className="ml-1.5 size-3.5" />
        </Link>
      </CardHeader>
      {images[0] && (
        <CardContent className="p-3 pb-0 md:p-5">
          <Image
            loader={awsImageLoader}
            width={500}
            height={281}
            src={images[0].url ?? ""}
            alt={name}
            className="rounded-lg object-cover md:size-[180px] "
          />
        </CardContent>
      )}
    </Card>
  );
};

const NoEvents = ({ timeframe: timeFrame }: { timeframe: Timeframe }) => {
  return (
    <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
      <div className="size-fit rounded-full bg-primary/40 p-5">
        <CalendarOff className="size-16 text-primary-foreground" />
      </div>
      {timeFrame === "upcoming" && (
        <div className="space-y-1">
          <p className="text-xl font-semibold">No Upcoming Events</p>
          <p className="text-sm text-zinc-500">
            You have no upcoming events. Why not host one?
          </p>
        </div>
      )}
      {timeFrame === "past" && (
        <div className="space-y-1">
          <p className="text-xl font-semibold">No Past Events</p>
          <p className="text-sm text-zinc-500">
            You have not hosted or attended any event.
          </p>
        </div>
      )}
      {timeFrame === "upcoming" && (
        <OpenModalButton modalType="create-event" variant="outline">
          <Plus className="mr-1.5 size-5" /> Create Event
        </OpenModalButton>
      )}
    </div>
  );
};

const Skeleton = () => (
  <div className="flex animate-pulse flex-col gap-6 md:gap-0">
    {Array(3)
      .fill(0)
      .map((_, index) => index + 1)
      .map((idx) => (
        <div key={idx} className="flex w-full gap-4 md:h-[250px] md:gap-0">
          <div className="flex w-1/12 flex-col justify-between md:w-1/3 md:flex-row">
            <div className="hidden space-y-1.5 px-1.5 md:block">
              <div className="h-5 w-24 rounded-md bg-muted/80" />
              <div className="h-5 w-20 rounded-md bg-muted/60" />
            </div>
            <div className="flex h-full flex-col items-center md:px-10  ">
              <CircleIcon className="size-4 text-border" />
              <div
                className={cn(
                  " -mb-6 h-[105%] w-[1px] border-l-2 border-dashed border-border/80 md:mb-0",
                )}
              />
            </div>
          </div>
          <div className="-mt-2 flex-1 space-y-3">
            <div className="flex items-center gap-3 px-3 md:hidden">
              <div className="h-5 w-36 rounded-md bg-muted/60" />
            </div>
            <Card className="flex flex-col-reverse rounded-lg md:flex-row ">
              <CardHeader className="flex flex-1 flex-col justify-around gap-3 py-3">
                <CardDescription className="hidden h-4 w-16 rounded-md bg-muted/60 md:block" />

                <CardTitle className="h-5 w-36 rounded-md bg-muted/80" />

                <div className="space-y-2">
                  <p className="h-4 w-40 rounded-md bg-muted/60" />
                  <p className="h-4 w-32 rounded-md bg-muted/60" />
                </div>
                <div className="h-8 w-full rounded-md bg-muted/80 md:w-44" />
              </CardHeader>
              <div className="p-3 md:p-5">
                <div className="h-[180px] w-full rounded-md bg-muted/60 md:w-[180px]" />
              </div>
            </Card>
          </div>
        </div>
      ))}
  </div>
);
