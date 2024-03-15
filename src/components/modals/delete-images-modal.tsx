"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
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

export const DeleteEventImagesModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "delete-event-images";

  const { mutate: deleteImages } = api.event.deleteImages.useMutation();

  const router = useRouter();
  const utils = api.useUtils();

  const handleDelete = () => {
    if (!data.galleryImages) return;

    deleteImages(
      { images: data.galleryImages },
      {
        onSuccess: ({ count }) => {
          toast({
            title: "Images deleted",
            description: `Successfully deleted ${count} images`,
          });

          utils.invalidate().catch((e) => console.log(e));
          router.refresh();
        },
        onError: () => {
          toast({
            title: "Images deleted",
            description: "Failed to delete images",
            variant: "destructive",
          });
        },
      },
    );

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
            <TrashIcon className="mr-1.5 size-4" /> Delete
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
