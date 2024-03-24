import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Ticket } from "./ticket";

export type TicketType = {
  id: number;
  ticketName: string;
  requireApproval: boolean;
  available: boolean;
};

interface TicketsGridProps {
  tickets: TicketType[];
}
export const TicketsGrid = ({ tickets }: TicketsGridProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between ">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Button className="h-7 gap-2 bg-muted  pl-2 text-muted-foreground">
          <PlusIcon className="size-4 p-0" />
          New Ticket Type
        </Button>
      </div>
      <div className="flex  gap-4 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 md:overflow-hidden">
        {tickets.map((ticket, idx) => (
          <Ticket key={idx} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
