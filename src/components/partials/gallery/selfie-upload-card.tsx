"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { CrownIcon, SparklesIcon, TrashIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface SelfieUploadCardProps {
  eventId: string;
}

export const SelfieUploadCard = ({ eventId }: SelfieUploadCardProps) => {
  const { data: event } = api.event.get.useQuery(
    { id: eventId },
    { staleTime: Infinity },
  );

  return (
    <Card className="row-span-2 flex flex-col gap-10 bg-primary/5">
      <CardHeader>
        <Link href={paths.events.root}>
          <div className="flex items-center justify-center gap-5 rounded-md text-center text-3xl font-extrabold tracking-wider text-primary">
            <CrownIcon className="h-8 w-8" /> Better Event
            <CrownIcon className="h-8 w-8" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="h-fit w-fit rounded-full bg-primary/20 p-10">
            <UserIcon className="h-20 w-20 text-primary" />
          </div>
          <p className="text-sm text-zinc-300">
            Upload your selfie to find your images.
          </p>
        </div>
        <div className="flex gap-3">
          <Button disabled className="w-28">
            <SparklesIcon className="mr-1.5 h-4 w-4" /> Find me
          </Button>
          <Button className="w-28 text-destructive" disabled>
            <TrashIcon className="mr-1.5 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
      {event && (
        <CardFooter className="flex flex-col items-center gap-1">
          <p className="text-3xl font-bold md:text-4xl">{event.name}</p>
          <div className="flex gap-1.5 text-zinc-300">
            <p>{format(event?.date, "do MMMM, yyy")}</p>
            <p>@{event?.location}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
