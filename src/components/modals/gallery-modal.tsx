"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Gallery,
  type GalleryHandlers,
  type GalleryOptions,
} from "../ui/gallery";

export const GalleryModal = () => {
  const {
    isOpen,
    type,
    onClose,
    data: { gallery },
  } = useModal();

  const isModalOpen = isOpen && type === "event-gallery";

  const handleDownload = () => {
    alert("DOWNLOADING...");
  };
  const handleShare = () => {
    alert("SHARING...");
  };

  const options: GalleryOptions = {
    thumbs: true,
    chevrons: true,
    close: true,
    download: true,
    share: true,
  };

  const handlers: GalleryHandlers = {
    onClose: onClose,
    onDownload: handleDownload,
    onShare: handleShare,
  };

  if (!gallery) return;

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={onClose} modal>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0">
          <Gallery
            images={gallery.images}
            currentImage={gallery.currentImage ?? 0}
            {...options}
            {...handlers}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
