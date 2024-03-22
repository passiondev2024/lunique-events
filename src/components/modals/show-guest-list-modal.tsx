"use client";

import { useState } from "react";
import { UsersIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ShowGuestListModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "show-guest-list";

  const [publicList, setPublicList] = useState(true);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex size-14 items-center justify-center rounded-full border-2 bg-muted p-0">
            <UsersIcon size={30} />
          </div>
          <DialogTitle>
            <h1 className="text-xl">Public Guest List</h1>
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Display the guest count and a few guests on the event page.</p>
            <p>
              Even when it is turned on, only registered guests can access the
              full list.
            </p>
            <Button
              onClick={() => setPublicList(!publicList)}
              className="w-full"
            >
              {publicList && <p className="capitalize">Hide Guest List </p>}
              {!publicList && <p className="capitalize">Show Guest List </p>}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
