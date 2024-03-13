import { EditEventGallery } from "@/components/partials/event/edit-event-gallery";
import { EventActionButtons } from "@/components/partials/event/event-action-buttons";
import { NoEventImages } from "@/components/partials/event/no-event-images";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

// TODO:
// - replace root with redirect to overview
// - move images to /{eventID}/images

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

  const images = await api.event.getImages.query({ eventId: event.id });
  if (!images) redirect(paths.events.root);

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      {/* TODO: find place for share, upload buttons */}
      <EventActionButtons event={event} />

      {images.length > 0 && <EditEventGallery images={images} />}
      {images.length === 0 && <NoEventImages id={event.id} />}
    </div>
  );
}
