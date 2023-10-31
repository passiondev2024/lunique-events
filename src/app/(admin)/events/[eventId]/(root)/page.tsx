import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { EventActionButtons } from "@/components/partials/event/event-action-buttons";
import { EventHeader } from "@/components/partials/event/event-header";
import { ImageToggleGroup } from "@/components/partials/event/image-toggle-group";
import { NoEventImages } from "@/components/partials/event/no-event-images";
import { events, images } from "@/lib/data";
import { format } from "date-fns";
import { Share2Icon, ShareIcon } from "lucide-react";

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
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        {event && <EventHeader event={event} />}
        {event && <EventActionButtons event={event} />}
      </div>

      {!images && <NoEventImages />}
      {images && <ImageToggleGroup />}
    </div>
  );
}
