"use client";

import { useState } from "react";
import { ArrowUpToLineIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { type EventSchema } from "./validation";

type Capacity = EventSchema["capacity"];

interface EventCapacityProps {
  value: Capacity;
  onChange: (value: Capacity) => void;
}

export const EventCapacity = ({ value, onChange }: EventCapacityProps) => {
  const [open, setOpen] = useState(false);
  const [capacity, setCapacity] = useState<number | null>(() => value.value);
  const [waitlist, setWaitlist] = useState(() => value.waitlist);

  const handleSetLimit = () => {
    onChange({ value: capacity, waitlist: waitlist });
    setOpen(false);
  };

  const handleRemoveLimit = () => {
    onChange({ value: null, waitlist: false });
    setCapacity(null);
    setWaitlist(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2">
        <span className="flex items-center gap-3">
          <ArrowUpToLineIcon
            className={cn(
              "h-4 w-4 text-muted-foreground",
              true && "text-[#B596FF]",
            )}
          />
          <span>Capacity</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground">
            {value.value ? value.value : "Unlimited"}
          </span>
          <PencilIcon className="size-4 text-muted-foreground" />
        </span>
      </DialogTrigger>
      <DialogContent className="md:max-w-xs">
        <DialogHeader className="text-left">
          <DialogTitle>Max Capacity</DialogTitle>
          <DialogDescription>
            Auto-close registration when the capacity is reached. Only approved
            guests count toward the cap.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              min={1}
              value={capacity ?? undefined}
              onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Over-Capacity Waitlist</Label>
            <Switch
              checked={waitlist}
              onCheckedChange={setWaitlist}
              className="focus-visible:ring-0 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-muted-foreground"
            />
          </div>
        </div>

        <DialogFooter className="flex-row gap-1.5">
          <Button onClick={handleSetLimit} className="flex-1">
            Set Limit
          </Button>
          <Button
            onClick={handleRemoveLimit}
            variant="secondary"
            className="flex-1"
          >
            Remove Limit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
