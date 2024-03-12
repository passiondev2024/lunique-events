"use client";

import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { CalendarOff, Plus, Users2Icon } from "lucide-react";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarIcon,
  GalleryThumbnailsIcon,
  MapPinIcon,
} from "lucide-react";
import { type RouterOutputs } from "@/trpc/shared";
import { redirect, useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import Image from "next/image";
import { awsImageLoader } from "@/lib/image-loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type Timeframe } from "./events";

type RenderTimeframeProps = {
  timeframe: Timeframe;
};

export const RenderTimeframe = ({ timeframe }: RenderTimeframeProps) => {
  const { data, isLoading, isError } = api.event.list.useQuery(
    { eventTimeFrame: timeframe },
    { enabled: !!timeframe },
  );

  if (isLoading) return <div>TODO: Loading events...</div>;

  if (isError) return redirect(paths.events.error);

  if (data && data.length === 0) return <NoEvents timeframe={timeframe} />;
  if (data && data.length !== 0)
    return (
      <div className="flex">
        {data.map((event) => (
          <div key={event.id} className="w-full">
            <div className="flex">
              <div className="w-1/6 md:w-1/3">Date Graph</div>
              <div className="flex-1">
                <EventCard event={event} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return null;
};

interface EventCardProps {
  event: RouterOutputs["event"]["list"][number];
}
type TargetClick = "eventPage" | "manageEventPage";

export const EventCard = ({ event }: EventCardProps) => {
  const { images, name, date, location } = event;
  const router = useRouter();

  const handleClick = (dest: TargetClick) => {
    if (dest === "eventPage") {
      router.push(paths.events.event(event.id));
    }
    if (dest === "manageEventPage") {
      router.push(paths.events.overview(event.id));
    }
  };

  return (
    <Card className="flex flex-col-reverse rounded-lg md:flex-row ">
      <CardHeader className="flex flex-1 flex-col justify-around py-3">
        <CardDescription>1:00 PM</CardDescription>
        <CardTitle className="cursor-pointer text-lg font-semibold">
          {name}
        </CardTitle>
        <div className="space-y-1.5 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm">
            <CalendarIcon className="h-4 w-4" />
            {format(date, "do MMMM, yyy")}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <MapPinIcon className="h-4 w-4" />
            {location ? location : "Missing location "}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Users2Icon className="h-4 w-4" />
            No Guests
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => handleClick("manageEventPage")}
          className="md:w-44"
        >
          <p>Manage Event</p>
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="p-3 md:p-5">
        {images[0] && (
          <Image
            loader={awsImageLoader}
            width={500}
            height={281}
            src={images[0].url ?? ""}
            alt={name}
            className="rounded-lg object-cover md:h-[180px] md:w-[180px] "
          />
        )}
        {!images[0] && (
          <div className="flex h-full w-full items-center justify-center rounded-l-lg bg-muted-foreground md:rounded-l-lg md:rounded-t-none">
            <GalleryThumbnailsIcon className="h-24 w-24 text-muted" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const NoEvents = ({ timeframe: timeFrame }: { timeframe: Timeframe }) => {
  return (
    <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
      <div className="h-fit w-fit rounded-full bg-primary/40 p-5">
        <CalendarOff className="h-16 w-16 text-primary-foreground" />
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
          <Plus className="mr-1.5 h-5 w-5" /> Create Event
        </OpenModalButton>
      )}
    </div>
  );
};
