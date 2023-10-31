import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { ListEvents } from "@/components/partials/event/list-events";
import { NoEvents } from "@/components/partials/event/no-events";
import { events } from "@/lib/data";
import { PlusCircleIcon } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="space-y-5  md:space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">Events</h1>
          <p className="hidden text-xl text-zinc-500 md:block">
            Create end manage your events.
          </p>
        </div>
        <OpenModalButton modalType="create-event" size="sm">
          <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
        </OpenModalButton>
      </div>
      {!events && <NoEvents />}
      {events && <ListEvents />}
    </div>
  );
}
