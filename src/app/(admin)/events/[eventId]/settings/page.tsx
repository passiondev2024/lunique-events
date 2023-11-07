import { EventHeader } from "@/components/partials/event/event-header";
import {
  DeleteEvent,
  EditEventInfo,
  EventGalleryConfig,
} from "@/components/partials/event/event-setting";
import { api } from "@/trpc/server";

export default async function EventSettingsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const eventSettings = await api.event.settings.query({ id: params.eventId });
  const event = await api.event.get.query({ id: params.eventId });

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        {event && <EventHeader event={event} />}
      </div>
      <div className="space-y-5">
        {event && <EditEventInfo event={event} />}
        {eventSettings && <EventGalleryConfig settings={eventSettings} />}
        {event && <DeleteEvent eventId={event.id} />}
      </div>
    </div>
  );
}
