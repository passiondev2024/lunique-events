"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

export const DeleteEventImagesModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "delete-event-images";

  const { eventId, images } = data;

  const handleDelete = () => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ eventId, images }, null, 2)}
          </code>
        </pre>
      ),
    });

    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3">
          <Button
            variant="destructive"
            className="h-fit w-full"
            onClick={handleDelete}
          >
            <TrashIcon className="mr-1.5 h-4 w-4" /> Delete
          </Button>
          <Button
            variant="secondary"
            className="h-fit w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
