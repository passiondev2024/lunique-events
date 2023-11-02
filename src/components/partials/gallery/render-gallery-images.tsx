"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { type ImageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface RenderGalleryImagesProps {
  galleryId: string;
  images: ImageProps[];
}

export const RenderGalleryImages = ({
  images,
  galleryId,
}: RenderGalleryImagesProps) => {
  const { onOpen } = useModal();

  return (
    <>
      {images.map((image, idx) => (
        <Link
          id={`gallery-image-${idx}`}
          key={image.id}
          href={`/gallery/${galleryId}/?photoId=${idx}`}
          shallow
          scroll={false}
          onClick={() =>
            onOpen("event-gallery", {
              galleryImages: images,
              galleryId: galleryId,
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
        </Link>
      ))}
    </>
  );
};
