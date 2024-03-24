"use client";

import { useState } from "react";
import { ArrowUpToLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const EventCapacityModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "event-capacity";

  const [waitlist, setWaitlist] = useState(() => false);
  const [capacity, setCapacity] = useState<number | null>(() => 10);

  const handleSetLimit = () => {
    setCapacity(capacity);
    setWaitlist(waitlist);
    onClose();
  };

  const handleRemoveLimit = () => {
    setCapacity(null);
    setWaitlist(false);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px]">
        <DialogHeader className="space-y-4 text-left">
          <div className="size-fit rounded-full bg-muted p-2">
            <ArrowUpToLineIcon size={40} />
          </div>
          <DialogTitle className="text-xl">Max Capacity</DialogTitle>
          <DialogDescription>
            Auto-close registration when the capacity is reached. Only approved
            guests count toward the cap.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="font-normal">Capacity</Label>
            <Input
              type="number"
              min={1}
              value={capacity ?? undefined}
              onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
            />
            <div className="flex items-center justify-between">
              <Label className="text-base font-normal">
                Over-Capacity Waitlist
              </Label>
              <Switch
                className=" focus-visible:ring-0 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground"
                checked={waitlist}
                onCheckedChange={setWaitlist}
              />
            </div>
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
