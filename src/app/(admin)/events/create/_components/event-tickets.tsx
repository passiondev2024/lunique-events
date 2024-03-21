import { PencilIcon, TicketIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EventTicketsProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const EventTickets = ({ value, onChange }: EventTicketsProps) => {
  // TODO: Stripe integration
  return (
    <div
      onClick={() => onChange(!value)}
      className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2"
    >
      <span className="flex items-center gap-3">
        <TicketIcon
          className={cn(
            "h-4 w-4 text-muted-foreground",
            false && "text-[#47C87F]",
          )}
        />
        <span>Tickets</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="text-muted-foreground">
          {value ? "Premium" : "Free"}
        </span>
        <PencilIcon className="size-4 text-muted-foreground" />
      </span>
    </div>
  );
};
