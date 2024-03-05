"use client";

import { useEffect, useState } from "react";
import { ControlBar } from "./control-bar";
import { EventSelectImages } from "./event-select-images";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { type Image } from "@prisma/client";
import { EventImagesPagination } from "./event-images-pagination";

interface EditEventGalleryProps {
  images: Image[];
}

const IMAGES_PER_PAGE = 15 as const;

export const EditEventGallery = ({ images }: EditEventGalleryProps) => {
  const [isSelectMode, setIsSelectMode] = useState(false);

  const { selected, updateImages, selectAll, deselectAll } = useGalleryModal();

  useEffect(() => {
    if (!images) return;
    updateImages(images);
  }, [images, updateImages]);

  const pages = Math.ceil(images.length / IMAGES_PER_PAGE);

  return (
    <div className="space-y-3 md:space-y-5">
      {images && (
        <ControlBar
          isSelectMode={isSelectMode}
          setIsSelectMode={setIsSelectMode}
          max={images?.length ?? 0}
          selected={selected ?? []}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
        />
      )}
      {images && (
        <EventSelectImages
          imagesPerPage={IMAGES_PER_PAGE}
          images={images}
          isSelectMode={isSelectMode}
          selected={selected}
        />
      )}
      {images && <EventImagesPagination pages={pages} />}
    </div>
  );
};
