"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Maximize2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const InviteInsights = () => {
  return (
    <div className="relative size-full rounded-md bg-muted p-3 tracking-widest">
      <Button variant="ghost" size="icon" className="absolute right-1 top-1">
        <Maximize2Icon className="size-5" />
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
            1 Email Opend <InfoCircledIcon className="ml-1.5 size-4" />
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            0 Declined
          </p>
        </div>
      </div>
    </div>
  );
};
