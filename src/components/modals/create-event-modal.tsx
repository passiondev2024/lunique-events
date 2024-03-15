"use client";

import { useModal } from "@/hooks/use-modal-store";

import { CreateEventForm } from "../forms/create-event-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const CreateEventModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "create-event";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create a new event here. Click save when you are done.
          </DialogDescription>

          <CreateEventForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
