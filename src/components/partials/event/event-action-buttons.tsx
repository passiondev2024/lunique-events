import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { type events } from "@/lib/data";
import { Share2Icon, ShareIcon } from "lucide-react";

interface EventActionButtonsProps {
  event: (typeof events)[number];
}

export const EventActionButtons = ({ event }: EventActionButtonsProps) => (
  <div className="flex gap-3">
    <OpenModalButton
      modalType="share-event"
      modalData={{ eventId: String(event.id) }}
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
);
