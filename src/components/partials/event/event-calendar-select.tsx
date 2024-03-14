"use client";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export function CalendarSelect() {
  return (
    <div>
      <Select>
        <SelectTrigger
          disabled={true}
          className="h-8 w-48 border-muted-foreground/10 bg-muted capitalize data-[state=open]:bg-muted-foreground/50"
        >
          <CalendarIcon className="mr-1.5 h-4 w-4" />
          <SelectValue placeholder="Personal calendar" />
        </SelectTrigger>
      </Select>
    </div>
  );
}
