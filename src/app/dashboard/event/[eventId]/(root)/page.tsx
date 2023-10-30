import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { events } from "@/lib/data";
import { format } from "date-fns";
import { GalleryThumbnailsIcon, Share2Icon, ShareIcon } from "lucide-react";

export default function EventIdPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const eventId = Number(params.eventId);
  const event = events[eventId - 1];

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        <div>
          <h1 className="text-2xl font-bold md:text-4xl">{event?.name}</h1>
          <div className="flex flex-col md:flex-row md:gap-3">
            {event?.date && (
              <p className="text-zinc-500 md:text-xl">
                {format(event.date, "do MMMM, yyy")}
              </p>
            )}
            {event?.location && (
              <p className="text-zinc-500 md:text-xl">@{event.location}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <OpenModalButton
            modalType="share-event"
            modalData={{ eventId: String(event?.id) }}
            variant="outline"
            size="sm"
          >
            <Share2Icon className="mr-1.5 h-5 w-5" />
            Share
          </OpenModalButton>
          <OpenModalButton modalType="upload-event-images" size="sm">
            <ShareIcon className="mr-1.5 h-5 w-5" />
            Upload
          </OpenModalButton>
        </div>
      </div>
      <div className="flex h-96 w-full flex-col items-center justify-center gap-5 rounded-lg border border-dashed text-center">
        <div className="h-fit w-fit rounded-full bg-primary/40 p-5">
          <GalleryThumbnailsIcon className="h-16 w-16 text-primary-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-semibold">No photos added</p>
          <p className="text-sm text-zinc-500">
            You don&apos;t have any photos yet. Upload your first photo to get
            started.
          </p>
        </div>
        <OpenModalButton
          modalType="upload-event-images"
          size="sm"
          variant="outline"
        >
          <ShareIcon className="mr-1.5 h-5 w-5" /> Upload
        </OpenModalButton>
      </div>
    </div>
  );
}
