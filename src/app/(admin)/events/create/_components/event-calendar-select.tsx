"use client";

import { CalendarIcon } from "lucide-react";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CalendarSelect() {
  return (
    <div>
      <Select>
        <SelectTrigger
          disabled={true}
          className="h-8 w-48 border-muted-foreground/10 bg-muted capitalize data-[state=open]:bg-muted-foreground/50"
        >
          <CalendarIcon className="mr-1.5 size-4" />
          <SelectValue placeholder="Personal calendar" />
        </SelectTrigger>
      </Select>
    </div>
  );
}
