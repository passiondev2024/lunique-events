// import { EditEventGallery } from "@/components/partials/event/edit-event-gallery";
import { EventActionButtons } from "@/components/partials/event/event-action-buttons";
import { EventHeader } from "@/components/partials/event/event-header";
import { NoEventImages } from "@/components/partials/event/no-event-images";
import { api } from "@/trpc/server";

export default async function EventIdPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const event = await api.event.get.query({ id: params.eventId });

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        {event && <EventHeader event={event} />}
        {event && <EventActionButtons event={event} />}
      </div>

      {/* {images && event && (
        <EditEventGallery eventId={String(event.id)} images={images} />
      )} */}
      <NoEventImages />
    </div>
  );
}
