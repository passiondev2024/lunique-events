"use client";

import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Maximize2Icon } from "lucide-react";

export const InviteInsights = () => {
  return (
    <div className="relative h-full w-full rounded-md bg-muted p-3 tracking-widest">
      <Button variant="ghost" size="icon" className="absolute right-1 top-1">
        <Maximize2Icon className="h-5 w-5" />
      </Button>

      <div className="space-y-5 md:flex md:h-full md:flex-col md:justify-between">
        <div>
          <div>
            <span className="text-3xl">1</span>
            <span className="text-xl text-muted-foreground">/1</span>
          </div>
          <p className="text-sm text-muted-foreground">Invite Accepted</p>
        </div>

        <div>
          <p className="flex items-center text-sm text-muted-foreground">
            1 Email Opend <InfoCircledIcon className="ml-1.5 h-4 w-4" />
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            0 Declined
          </p>
        </div>
      </div>
    </div>
  );
};
