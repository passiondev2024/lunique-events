"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useMemo } from "react";

interface RenderGalleryImagesProps {
  eventId: string;
}

export const RenderGalleryImages = ({ eventId }: RenderGalleryImagesProps) => {
  const { onOpen } = useModal();

  const { data } = api.event.getImages.useQuery(
    { eventId },
    { staleTime: Infinity },
  );

  const images = useMemo(() => {
    if (!data) return [];
    return data.map((image, idx) => ({ id: idx, src: image.url }));
  }, [data]);

  return (
    <>
      {images.map((image, idx) => (
        <div
          id={`gallery-image-${idx}`}
          key={image.id}
          onClick={() =>
            onOpen("event-gallery", {
              galleryImages: images,
              currentImage: idx,
            })
          }
        >
          <AspectRatio
            ratio={4 / 3}
            className="transition md:cursor-pointer md:duration-300 md:hover:brightness-110"
          >
            <Image
              src={image.src}
              alt={`Gallery Image ${image.id}`}
              width={460}
              height={345}
              className="h-full w-full rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
      ))}
    </>
  );
};
