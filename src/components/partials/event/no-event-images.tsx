import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { GalleryThumbnailsIcon, ShareIcon } from "lucide-react";

export const NoEventImages = () => (
  <div className="flex h-96 w-full flex-col items-center justify-center gap-5 rounded-lg border border-dashed text-center md:h-[500px]">
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
    <OpenModalButton modalType="upload-event-images" variant="outline">
      <ShareIcon className="mr-1.5 h-5 w-5" /> Upload
    </OpenModalButton>
  </div>
);
