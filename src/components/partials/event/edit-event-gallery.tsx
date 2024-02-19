"use client";

import { useEffect, useState } from "react";
import { type Image as ImageProps } from "@prisma/client";
import { api } from "@/trpc/react";
import { ControlBar } from "./control-bar";
import { EventSelectImages } from "./event-select-images";

interface EditEventGalleryProps {
  eventId: string;
}

export const EditEventGallery = ({ eventId }: EditEventGalleryProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const { data: images } = api.event.getImages.useQuery(
    { eventId },
    { staleTime: Infinity, select: (data) => data.images },
  );

  useEffect(() => {
    if (!images) return;

    setSelectedImages(() =>
      images.filter((image) => selected.includes(image.key)),
    );
  }, [images, selected]);

  const handleSelectAll = () => {
    if (!images) return;

    setSelected(() => images.map((img) => img.key));
    setSelectedImages(images);
  };

  const handleDesectAll = () => {
    setSelected([]);
    setSelectedImages([]);
  };

  return (
    <div className="space-y-3">
      <ControlBar
        isSelectMode={isSelectMode}
        setIsSelectMode={setIsSelectMode}
        max={images?.length ?? 0}
        selectedCount={selected.length}
        selectedImages={selectedImages}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDesectAll}
      />

      {images && (
        <EventSelectImages
          images={images}
          isSelectMode={isSelectMode}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {/* <EventImagesPagination
          handleFetchPreviousPage={handleFetchPreviousPage}
          handleFetchNextPage={handleFetchNextPage}
          page={page}
          pagesCount={data.pages.length}
          hasNextPage={!!hasNextPage}
          imagesCount={imagesCount}
        /> */}
    </div>
  );
};
