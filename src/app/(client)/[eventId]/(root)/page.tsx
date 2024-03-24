import { EventContact } from "./_components/event-contact";
import { EventDetails } from "./_components/event-details";
import { EventGallery } from "./_components/event-gallery";
import { EventGuests } from "./_components/event-guests";
import { EventHostedBy } from "./_components/event-hosted-by";
import { EventLocation } from "./_components/event-location";
import { EventThumbnail } from "./_components/event-thumbnail";
import { RegisterGuest } from "./_components/register-guest";

export default function ClientEventIdPage(
  {
    // params: { eventId },
  }: {
    params: {
      eventId: string;
    };
  },
) {
  return (
    <div className="mx-auto max-w-4xl space-y-5 p-3 pb-10 md:flex md:gap-5 md:space-y-0">
      <div className="space-y-5 md:w-2/5">
        <EventThumbnail />
        <div className="hidden space-y-5 md:block">
          <EventHostedBy />
          <EventGuests />
          <EventContact />
        </div>
      </div>
      <div className="space-y-5 md:w-3/5">
        <EventDetails />
        <RegisterGuest />
        <EventGallery />
        <EventLocation />
        <div className="space-y-5 md:hidden">
          <EventHostedBy />
          <EventGuests />
          <EventContact />
        </div>
      </div>
    </div>
  );
}
