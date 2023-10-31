import { EventCard } from "@/components/cards/event-card";
import { events } from "@/lib/data";
import { paths } from "@/routes/paths";
import Link from "next/link";

export const ListEvents = () => (
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
);
