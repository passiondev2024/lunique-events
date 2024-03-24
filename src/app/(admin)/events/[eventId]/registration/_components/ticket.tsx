import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CircleEllipsisIcon, CircleIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export type TicketType = {
  id: number;
  ticketName: string;
  requireApproval: boolean;
  available: boolean;
};

interface TicketProps {
  ticket: TicketType;
}

export const Ticket = ({ ticket }: TicketProps) => {
  const [requireApproval, setRequireApproval] = useState(false);

  const handleChange = () => {
    setRequireApproval(!requireApproval);
  };

  return (
    <Card key={ticket.id} className="min-w-64 bg-muted/30">
      <CardHeader className="space-y-4">
        <CardTitle className="flex justify-between">
          <div>
            <h1>{ticket.ticketName}</h1>
          </div>
          <div>
            <button>
              <CircleEllipsisIcon className="size-4 text-foreground/30 transition-all hover:text-foreground" />
            </button>
          </div>
        </CardTitle>
        <CardDescription className="text-2xl font-medium text-foreground">
          FREE
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between pb-2">
        <div className="flex items-center space-x-2">
          <p>Require Approval</p>
          <InfoCircledIcon className="size-4 text-foreground/30" />
        </div>
        <Switch
          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-primary/20"
          onChange={handleChange}
        />
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between py-2 text-base font-light">
        <div className="flex items-center space-x-2 ">
          {ticket.available && (
            <CircleIcon className="size-2 rounded-full bg-green-500 text-green-500 " />
          )}
          {!ticket.available && (
            <CircleIcon className="size-2 rounded-full bg-red-600 text-red-600 " />
          )}
          <p>
            {ticket.available && "Available"}
            {!ticket.available && "Unavailable"}
          </p>
        </div>
        <div>
          <p>1 sold</p>
        </div>
      </CardFooter>
    </Card>
  );
};
