import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { ListEvents } from "@/components/partials/event/list-events";
import { NoEvents } from "@/components/partials/event/no-events";
import { api } from "@/trpc/server";
import { PlusCircleIcon } from "lucide-react";

export default async function EventsPage() {
  const events = await api.event.list.query();

  return (
    <div className="space-y-5  md:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Events</h1>
          <p className="text-sm text-zinc-500 md:block md:text-base">
            Create end manage your events.
          </p>
        </div>
        <OpenModalButton modalType="create-event">
          <PlusCircleIcon className="mr-1.5 h-4 w-4" /> Create
        </OpenModalButton>
      </div>
      {events.length === 0 && <NoEvents />}
      {events && <ListEvents events={events} />}
    </div>
  );
}
