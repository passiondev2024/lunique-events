"use client";

import { Fragment } from "react";
import { type Image as ImageType } from "@prisma/client";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { awsImageLoader } from "@/lib/image-loader";
import { cn } from "@/lib/utils";

interface EventSelectImagesProps {
  imagesPerPage: number;
  images: ImageType[];
  isSelectMode: boolean;
  selected: ImageType[];
}

export const EventSelectImages = ({
  imagesPerPage,
  images,
  isSelectMode,
  selected,
}: EventSelectImagesProps) => {
  const { onOpen, updateSelected } = useGalleryModal();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "");

  const handlePreview = (idx: number) => {
    onOpen(idx);
  };

  const renderImages = images.slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage,
  );

  return (
    <ToggleGroup.Root
      disabled={!isSelectMode}
      type="multiple"
      orientation="horizontal"
      value={selected.map((image) => image.id)}
      onValueChange={(value: string[]) => {
        updateSelected(images.filter((img) => value.includes(img.id)));
      }}
      className="grid grid-cols-3 gap-0.5 md:grid-cols-5 md:gap-1"
    >
      {renderImages.map((image, idx) => (
        <Fragment key={image.id}>
          {isSelectMode && (
            <ToggleGroup.Item
              value={image.id}
              className={cn(
                "relative rounded-lg p-0.5 data-[state=on]:ring-2",
                !isSelectMode && "data-[state=on]:ring-0",
              )}
            >
              <AspectRatio ratio={1 / 1}>
                <Image
                  loader={awsImageLoader}
                  alt={image.name}
                  src={image.url}
                  width={172}
                  height={172}
                  className="size-full rounded-lg object-cover"
                  loading="lazy"
                />
              </AspectRatio>

              {isSelectMode && (
                <div
                  className={cn(
                    "absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selected.find((img) => img.id === image.id) &&
                      "bg-primary shadow-white",
                  )}
                >
                  <CheckIcon
                    className={cn(
                      "hidden text-primary-foreground",
                      selected.find((img) => img.id === image.id) && "block",
                    )}
                  />
                </div>
              )}
            </ToggleGroup.Item>
          )}
          {!isSelectMode && (
            <AspectRatio
              ratio={1 / 1}
              onClick={() => handlePreview(idx)}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
            >
              <Image
                loader={awsImageLoader}
                alt={image.name}
                src={image.url}
                width={172}
                height={172}
                className="size-full rounded-lg object-cover"
                loading="lazy"
              />
            </AspectRatio>
          )}
        </Fragment>
      ))}
    </ToggleGroup.Root>
  );
};
