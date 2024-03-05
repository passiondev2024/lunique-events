"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  Gallery,
  type GalleryData,
  type GalleryHandlers,
  type GalleryOptions,
} from "../ui/gallery";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { useMemo } from "react";

export const GalleryModal = () => {
  const { isOpen, images, currentImage, selected, onClose, toggleSelected } =
    useGalleryModal();

  const handleShare = () => {
    alert("SHARING...");
  };
  const handleSelectImage = (index: number) => {
    toggleSelected(images[index]!);
  };

  const options: GalleryOptions = {
    thumbs: true,
    chevrons: true,
    close: true,
    download: true,
    share: true,
    select: true,
  };

  const handlers: GalleryHandlers = {
    onClose: onClose,
    onShare: handleShare,
    onImageSelect: handleSelectImage,
  };

  const selectedIndexes = useMemo(
    () =>
      images
        .map((img, idx) => {
          if (selected.find((item) => item.id === img.id)) return idx;
          return null;
        })
        .filter((v) => v !== null) as number[],
    [images, selected],
  );

  const data: GalleryData = {
    selected: selectedIndexes,
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="h-fill fixed inset-0 z-[999] overflow-hidden">
          <Gallery
            images={images}
            currentImage={currentImage}
            {...options}
            {...handlers}
            {...data}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
