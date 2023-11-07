import { type Event } from "@prisma/client";
import { format } from "date-fns";

interface EventHeaderProps {
  event: Event;
}

export const EventHeader = ({ event }: EventHeaderProps) => (
  <header>
    <h1 className="text-2xl font-bold md:text-4xl">{event?.name}</h1>
    <div className="flex flex-col md:flex-row md:gap-3">
      {event?.date && (
        <p className="text-zinc-500 md:text-xl">
          {format(event.date, "do MMMM, yyy")}
        </p>
      )}
      {event?.location && (
        <p className="text-zinc-500 md:text-xl">@{event.location}</p>
      )}
    </div>
  </header>
);
