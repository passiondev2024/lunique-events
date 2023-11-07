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
import { RotateCwIcon, TrashIcon } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";

export const DeleteEventModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "delete-event";

  const { eventId } = data;

  const mutation = api.event.delete.useMutation();

  const router = useRouter();

  const handleDelete = () => {
    if (eventId) {
      mutation.mutate(
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
            disabled={mutation.isLoading}
            variant="destructive"
            className="h-fit w-full"
            onClick={handleDelete}
          >
            {!mutation.isLoading && <TrashIcon className="mr-1.5 h-4 w-4" />}
            {mutation.isLoading && (
              <RotateCwIcon className="mr-1.5 h-4 w-4 animate-spin" />
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
