import { EventCard } from "@/components/cards/event-card";
import { paths } from "@/routes/paths";
import { type Event } from "@prisma/client";
import Link from "next/link";

interface ListEventsProps {
  events: Event[];
}

export const ListEvents = ({ events }: ListEventsProps) => (
  <div className="grid gap-3 md:grid-cols-4">
    {events.map((event) => (
      <Link
        href={paths.events.event(String(event.id))}
        key={event.id}
        className="transition duration-200 lg:hover:opacity-80"
      >
        <EventCard {...event} />
      </Link>
    ))}
  </div>
);
