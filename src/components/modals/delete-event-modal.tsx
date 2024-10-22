"use client";

import { RotateCwIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

export const DeleteEventModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "delete-event";

  const { eventId } = data;

  const { mutate: deleteEvent, isLoading: isDeletingEvent } =
    api.event.delete.useMutation();

  const router = useRouter();

  const handleDelete = () => {
    if (eventId) {
      deleteEvent(
        { id: eventId },
        {
          onSuccess: (event) => {
            toast({
              title: `${event.name} deleted!`,
            });

            router.push(paths.events.root);
            router.refresh();
          },
          onError: () => {
            toast({
              variant: "destructive",
              title: "Failed to delete event.",
            });
          },
        },
      );
    }
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete event?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3">
          <Button
            disabled={isDeletingEvent}
            variant="destructive"
            className="h-fit w-full"
            onClick={handleDelete}
          >
            {!isDeletingEvent && <TrashIcon className="mr-1.5 size-4" />}
            {isDeletingEvent && (
              <RotateCwIcon className="mr-1.5 size-4 animate-spin" />
            )}
            Delete
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
