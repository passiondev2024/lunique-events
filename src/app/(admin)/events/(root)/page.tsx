import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { Events } from "@/components/partials/event/events";
import { PlusCircleIcon } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5 md:space-y-8">
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

      <Events />
    </div>
  );
}
