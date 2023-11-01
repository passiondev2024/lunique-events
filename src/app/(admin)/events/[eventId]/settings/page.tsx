import { EventHeader } from "@/components/partials/event/event-header";
import {
  DeleteEvent,
  EditEventInfo,
  EventGalleryConfig,
} from "@/components/partials/event/event-setting";
import { events } from "@/lib/data";

export default function EventSettingsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const event = events[Number(eventId) - 1];

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        {event && <EventHeader event={event} />}
      </div>
      <div className="space-y-5">
        <EditEventInfo eventId={eventId} />
        <EventGalleryConfig />
        <DeleteEvent />
      </div>
    </div>
  );
}
