"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const GroupRegistrationModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "group-registration";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-xl capitalize">Group Registration</h1>
          </DialogTitle>
          <DialogDescription className="space-y-2">
            If turned on, guests will be able to get multiple tickets at once.{" "}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
