"use client";

import { useEffect, useState } from "react";
import { type Image as ImageProps } from "@prisma/client";
import { api } from "@/trpc/react";
import { ControlBar } from "./control-bar";
import { EventSelectImages } from "./event-select-images";
import { EventImagesPagination } from "./event-images-pagination";

interface EditEventGalleryProps {
  eventId: string;
}

export const EditEventGallery = ({ eventId }: EditEventGalleryProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [page, setPage] = useState<number>(0);

  const { data: imagesCount } = api.event.getImagesCount.useQuery(
    { eventId },
    { staleTime: Infinity },
  );

  const { data, fetchNextPage, hasNextPage } =
    api.event.getImages.useInfiniteQuery(
      {
        eventId,
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  useEffect(() => {
    if (!data) return;
    const tmpImages: ImageProps[] = [];

    data?.pages.forEach((page) => {
      page.images.forEach((image) => tmpImages.push(image));
    });

    setImages(tmpImages);
  }, [data]);

  useEffect(() => {
    setSelectedImages(() =>
      images.filter((image) => selected.includes(image.key)),
    );
  }, [images, selected]);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSelectAll = () => {
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
        max={imagesCount ?? 0}
        selectedCount={selected.length}
        selectedImages={selectedImages}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDesectAll}
      />

      {data?.pages && imagesCount && imagesCount !== 0 && (
        <EventSelectImages
          images={images}
          isSelectMode={isSelectMode}
          page={page}
          pages={data.pages}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {data?.pages && imagesCount && imagesCount !== 0 && (
        <EventImagesPagination
          handleFetchPreviousPage={handleFetchPreviousPage}
          handleFetchNextPage={handleFetchNextPage}
          page={page}
          pagesCount={data.pages.length}
          hasNextPage={!!hasNextPage}
          imagesCount={imagesCount}
        />
      )}
    </div>
  );
};
