"use client";

import { useState } from "react";
import { TicketIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ConfirmRegistrationModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "confirm-registration";
  const [acceptRegistration, setAcceptRegistration] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] space-y-2">
        <DialogHeader>
          <div className="size-fit rounded-full bg-muted p-2">
            <TicketIcon size={40} />
          </div>
          <DialogTitle className="text-xl">Registration</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          <p>
            Close registration to stop accepting new guests, including anyone
            who may have been invited.
          </p>
          <p>
            Please note that capacity and availability settings apply when
            registration is open.
          </p>
        </DialogDescription>

        <div className="flex items-center justify-between">
          <Label className="text-base font-normal">Accept Registration</Label>
          <Switch
            className="focus-visible:ring-0 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground"
            checked={acceptRegistration}
            onCheckedChange={setAcceptRegistration}
          />
        </div>
        <Button variant={"default"}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};
