import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { EventCard } from "@/components/cards/event-card";
import { events } from "@/lib/data";
import { paths } from "@/routes/paths";
import { GalleryThumbnailsIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="space-y-5  md:space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">Events</h1>
          <p className="hidden text-xl text-zinc-500 md:block">
            Create end manage your events.
          </p>
        </div>
        <OpenModalButton modalType="create-event" size="sm">
          <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
        </OpenModalButton>
      </div>
      {!events && (
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
          <OpenModalButton modalType="create-event" size="sm" variant="outline">
            <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
          </OpenModalButton>
        </div>
      )}
      {events && (
        <div className="grid gap-5 md:grid-cols-3 md:gap-8">
          {events.map((event) => (
            <Link
              href={paths.events.event(String(event.id))}
              key={event.id}
              className="transition duration-200 hover:opacity-80"
            >
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
