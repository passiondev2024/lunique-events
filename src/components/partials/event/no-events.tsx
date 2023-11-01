import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { GalleryThumbnailsIcon, PlusCircleIcon } from "lucide-react";

export const NoEvents = () => (
  <div className="flex h-96 w-full flex-col items-center justify-center gap-8 rounded-lg border border-dashed text-center">
    <div className="h-fit w-fit rounded-full bg-primary/40 p-5">
      <GalleryThumbnailsIcon className="h-16 w-16 text-primary-foreground" />
    </div>
    <div className="space-y-1">
      <p className="text-xl font-semibold">No events created</p>
      <p className="text-sm text-zinc-500">
        You don&apos;t have any events yet. Create your first event to get
        started.
      </p>
    </div>
    <OpenModalButton modalType="create-event" variant="outline">
      <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
    </OpenModalButton>
  </div>
);
