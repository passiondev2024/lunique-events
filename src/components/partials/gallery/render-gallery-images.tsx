"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useEffect } from "react";

interface RenderGalleryImagesProps {
  eventId: string;
}

export const RenderGalleryImages = ({ eventId }: RenderGalleryImagesProps) => {
  const { onOpen, updateImages } = useGalleryModal();

  const { data: images } = api.event.getImages.useQuery({ eventId });

  useEffect(() => {
    if (!images) return;

    updateImages(images);
  }, [updateImages, images]);

  if (!images) return <div>Loading...</div>;

  return (
    <>
      {images.map((image, idx) => (
        <div key={image.id} onClick={() => onOpen(idx)}>
          <AspectRatio
            ratio={4 / 3}
            className="transition md:cursor-pointer md:duration-300 md:hover:brightness-110"
          >
            <Image
              src={image.url}
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
