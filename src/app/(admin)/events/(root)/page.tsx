import { EventActions } from "@/components/partials/event/event-actions";
import { Events } from "@/components/partials/event/events";

export default function EventsPage() {
  return (
    <div className="mx-auto space-y-8 md:max-w-4xl md:space-y-16">
      <EventActions />
      <Events />
    </div>
  );
}
