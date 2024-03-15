import { type Event } from "@prisma/client";
import { GalleryThumbnailsIcon, ShareIcon } from "lucide-react";

import { OpenModalButton } from "@/components/buttons/open-modal-button";

interface NoEventImages {
  id: Event["id"];
}

export const NoEventImages = ({ id }: NoEventImages) => (
  <div className="flex h-96 w-full flex-col items-center justify-center gap-5 rounded-lg border border-dashed text-center md:h-[500px]">
    <div className="size-fit rounded-full bg-primary/40 p-5">
      <GalleryThumbnailsIcon className="size-16 text-primary-foreground" />
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
      modalData={{ eventId: id }}
      variant="outline"
    >
      <ShareIcon className="mr-1.5 size-5" /> Upload
    </OpenModalButton>
  </div>
);
