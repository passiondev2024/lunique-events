import { EventActions } from "@/components/partials/event/event-actions";
import { Events } from "@/components/partials/event/events";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 md:space-y-16">
      <EventActions />
      <Events />
    </div>
  );
}
