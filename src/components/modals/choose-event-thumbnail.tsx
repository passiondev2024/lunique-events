"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ChooseThumbnailModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "choose-event-thumbnail";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Event Thumbnail</DialogTitle>
          <DialogDescription>@TODO - thumbnails gallery</DialogDescription>
          {/*@TODO - thumbnails gallery*/}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
