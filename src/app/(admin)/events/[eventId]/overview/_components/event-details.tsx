import { MapPinIcon } from "lucide-react";

import { CalendarIcon } from "@/components/icons/calendar-icon";

export const EventDetails = () => {
  return (
    <>
      <h2 className="text-xl font-semibold">When & Where</h2>

      <div className="flex items-center gap-3">
        <CalendarIcon date={new Date()} />
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-5">Wednesday, Mar 20</p>
          <p className="text-sm text-muted-foreground">
            14:30 - 21 Mar, 15:30 CET
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-muted-foreground/20 p-[11px]">
          <MapPinIcon className="size-5" />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium leading-5">Belgrade</p>
          <p className="text-sm text-muted-foreground">Serbia</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        This address is shown publicly on the event page.
      </p>
    </>
  );
};
