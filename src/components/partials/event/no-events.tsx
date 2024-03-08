import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { CalendarOff, Plus } from "lucide-react";
import { EventTimeFrame } from "./list-events";

export const NoEvents = ({
  eventTimeFrame: timeFrame,
}: {
  eventTimeFrame: EventTimeFrame;
}) => {
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
