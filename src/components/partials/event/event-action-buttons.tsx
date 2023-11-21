import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { type Event } from "@prisma/client";
import { Share2Icon, ShareIcon } from "lucide-react";

interface EventActionButtonsProps {
  event: Event;
}

export const EventActionButtons = ({ event }: EventActionButtonsProps) => (
  <div className="flex gap-3">
    <OpenModalButton
      modalType="share-event"
      modalData={{ eventId: event.id }}
      variant="outline"
    >
      <Share2Icon className="mr-1.5 h-5 w-5" />
      Share
    </OpenModalButton>
    <OpenModalButton
      modalType="upload-event-images"
      modalData={{ eventId: event.id }}
    >
      <ShareIcon className="mr-1.5 h-5 w-5" />
      Upload
    </OpenModalButton>
  </div>
);
