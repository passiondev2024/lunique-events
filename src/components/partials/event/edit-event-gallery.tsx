"use client";

import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { ControlBar } from "./control-bar";
import { EventSelectImages } from "./event-select-images";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";

interface EditEventGalleryProps {
  eventId: string;
}

export const EditEventGallery = ({ eventId }: EditEventGalleryProps) => {
  const [isSelectMode, setIsSelectMode] = useState(false);

  const { selected, updateImages, selectAll, deselectAll } = useGalleryModal();

  const { data: images } = api.event.getImages.useQuery(
    { eventId },
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (!images) return;
    updateImages(images);
  }, [images, updateImages]);

  return (
    <div className="space-y-3">
      <ControlBar
        isSelectMode={isSelectMode}
        setIsSelectMode={setIsSelectMode}
        max={images?.length ?? 0}
        selected={selected ?? []}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
      />

      {images && (
        <EventSelectImages
          images={images}
          isSelectMode={isSelectMode}
          selected={selected}
        />
      )}
      {!images && <div>Loading Images...</div>}
    </div>
  );
};
