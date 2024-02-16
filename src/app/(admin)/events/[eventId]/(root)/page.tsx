import { EditEventGallery } from "@/components/partials/event/edit-event-gallery";
import { EventActionButtons } from "@/components/partials/event/event-action-buttons";
import { EventHeader } from "@/components/partials/event/event-header";
import { NoEventImages } from "@/components/partials/event/no-event-images";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function EventIdPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const session = await getServerAuthSession();
  if (!session?.user.id) redirect(paths.root);

  const event = await api.event.get.query({ id: params.eventId });
  if (!event?.id) redirect(paths.events.root);

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        <EventHeader event={event} />
        <EventActionButtons event={event} />
      </div>

      {event.images.length > 0 && <EditEventGallery eventId={event.id} />}
      {event.images.length === 0 && <NoEventImages event={event} />}
    </div>
  );
}
