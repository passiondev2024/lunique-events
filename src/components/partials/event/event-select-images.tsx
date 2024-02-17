import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { type $Enums, type Image as ImageType } from "@prisma/client";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

interface EventSelectImagesProps {
  pages: {
    images: {
      id: string;
      key: string;
      name: string;
      url: string;
      type: $Enums.ImageType;
      eventId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    nextCursor: number | undefined;
  }[];
  images: ImageType[];
  isSelectMode: boolean;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
}

export const EventSelectImages = ({
  pages,
  isSelectMode,
  images,
  selected,
  setSelected,
  page,
}: EventSelectImagesProps) => {
  const { onOpen } = useModal();

  const handlePreview = (idx: number) => {
    onOpen("event-gallery", {
      gallery: {
        images: images,
        currentImage: idx,
      },
    });
  };
  return (
    <ToggleGroup.Root
      disabled={!isSelectMode}
      type="multiple"
      orientation="horizontal"
      value={selected}
      onValueChange={setSelected}
      className="grid grid-cols-3 gap-1 md:grid-cols-5 "
    >
      {pages[page]?.images.map((image, idx) => (
        <Fragment key={image.id}>
          {isSelectMode && (
            <ToggleGroup.Item
              value={image.key}
              className={cn(
                "relative rounded-lg p-0.5 data-[state=on]:ring-2",
                !isSelectMode && "data-[state=on]:ring-0",
              )}
            >
              <AspectRatio ratio={1 / 1}>
                <Image
                  alt={image.name}
                  src={image.url}
                  width={200}
                  height={200}
                  className="h-full rounded-lg object-cover"
                />
              </AspectRatio>

              {isSelectMode && (
                <div
                  className={cn(
                    "absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selected.includes(image.key) && "bg-primary shadow-white",
                  )}
                >
                  <CheckIcon
                    className={cn(
                      "hidden text-primary-foreground",
                      selected.includes(image.key) && "block",
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
                alt={image.name}
                src={image.url}
                width={200}
                height={200}
                className="h-full rounded-lg object-cover"
              />
            </AspectRatio>
          )}
        </Fragment>
      ))}
    </ToggleGroup.Root>
  );
};
