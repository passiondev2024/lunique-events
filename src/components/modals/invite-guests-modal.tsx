"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const InviteGuestsModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "invite-guests";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-xl capitalize">Invite Guests</h1>
          </DialogTitle>
          <DialogDescription className="space-y-2">@ TODO</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
