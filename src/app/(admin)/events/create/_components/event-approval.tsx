"use client";

import { UserCheckIcon } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface EventApprovalProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const EventApproval = ({ value, onChange }: EventApprovalProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-3 px-3.5 py-2">
      <span className="flex items-center gap-3">
        <UserCheckIcon
          className={cn(
            "h-4 w-4 text-muted-foreground",
            true && "text-[#D77F48]",
          )}
        />
        <span>Require approval</span>
      </span>
      <Switch
        checked={value}
        onCheckedChange={onChange}
        className="focus-visible:ring-0 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-muted-foreground"
      />
    </div>
  );
};
