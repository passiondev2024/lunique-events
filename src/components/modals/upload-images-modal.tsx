"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { GalleryDropzone } from "../partials/event/gallery-dropzone";

export const UploadImagesModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const { eventId } = data;

  const isModalOpen = isOpen && type === "upload-event-images";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload photos</DialogTitle>
          <DialogDescription>Upload event photos here</DialogDescription>
        </DialogHeader>

        {eventId && <GalleryDropzone eventId={eventId} />}
      </DialogContent>
    </Dialog>
  );
};
