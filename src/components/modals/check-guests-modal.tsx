"use client";

import { QrCodeIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const CheckGuestsModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "check-guests";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex size-14 items-center justify-center rounded-full border-2 bg-muted p-0">
            <QrCodeIcon size={30} />
          </div>
          <DialogTitle>
            <h1 className="text-xl capitalize">Check In Guests</h1>
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              You can check in guests with our web scanner, or with our iOS and
              Android apps.
            </p>
            <Button
              onClick={() => alert("App Clicked")}
              className="w-full"
              variant={"default"}
            >
              <p>Open Web Scanner</p>
            </Button>
            <Button
              onClick={() => alert("App Clicked")}
              className="w-full"
              variant={"secondary"}
            >
              <p>Download for iOS</p>
            </Button>
            <Button
              onClick={() => alert("App Clicked")}
              className="w-full"
              variant={"secondary"}
            >
              <p>Download for Android</p>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
