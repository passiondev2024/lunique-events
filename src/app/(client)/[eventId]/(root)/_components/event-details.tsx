import { MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";

export const EventDetails = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-semibold">Event Title</h1>
        <p className="text-xs text-muted-foreground">
          Hosted by Nikola Mladenovic
        </p>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <CalendarIcon date={new Date()} />
          <div className="flex flex-col">
            <p className="font-medium leading-5">Wednesday, Mar 20</p>
            <p className="text-xs text-muted-foreground">
              14:30 - 21 Mar, 15:30 CET
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-muted-foreground/20 p-[11px]">
            <MapPinIcon className="size-5" />
          </div>
          <div className="flex flex-col">
            <p className="font-medium leading-5">Belgrade</p>
            <p className="text-xs text-muted-foreground">Serbia</p>
          </div>
        </div>
      </div>
    </div>
  );
};
