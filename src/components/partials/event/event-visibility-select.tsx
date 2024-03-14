"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { GlobeIcon, KeyIcon } from "lucide-react";
import { useState } from "react";

type EventVisibility = "public" | "private";

export function VisibilitySelect() {
  const [value, setValue] = useState<EventVisibility>("public");

  const icon: Record<EventVisibility, JSX.Element> = {
    public: <GlobeIcon className="h-4 w-4 text-muted-foreground" />,
    private: <KeyIcon className="h-4 w-4 text-muted-foreground" />,
  };

  return (
    <div>
      <Select
        value={value}
        onValueChange={(value) => setValue(value as EventVisibility)}
      >
        <SelectTrigger className="h-8 w-32 border-muted-foreground/10 bg-muted capitalize data-[state=open]:bg-muted-foreground/50">
          {icon[value]}
          {value}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="public" className="px-0">
              <div className="flex items-center gap-3 p-3">
                <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <p>Public</p>
                  <p className="max-w-xs text-muted-foreground">
                    Shown on your calendar and eligible to be featured.
                  </p>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="private" className="px-0">
              <div className="flex items-center gap-3 p-3">
                <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <p>Private</p>
                  <p className="max-w-xs text-muted-foreground">
                    Unlisted. Only people with the link can register.
                  </p>
                </div>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
