"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { CheckIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageAttributes = {
  id: number;
  src: string;
};

interface ImageToggleGroupProps {
  images: ImageAttributes[];
  eventId: string;
}

export const EditEventGallery = ({
  images,
  eventId,
}: ImageToggleGroupProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const { onOpen } = useModal();

  const handleSelectAll = () => {
    setSelected(() => images.map((image) => String(image.id)));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        {selected.length === 0 && (
          <Button variant="secondary" onClick={handleSelectAll}>
            Select All
          </Button>
        )}
        {selected.length !== 0 && (
          <div className="flex gap-1.5">
            <Button variant="secondary" onClick={handleDeselectAll}>
              Deselect All
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="text-destructive"
              onClick={() =>
                onOpen("delete-event-images", { eventId, images: selected })
              }
            >
              <TrashIcon />
            </Button>
          </div>
        )}
        <p className="text-sm text-zinc-500">
          {selected.length} of {images.length} photo(s) selected.
        </p>
      </div>
      <ToggleGroup.Root
        type="multiple"
        orientation="horizontal"
        value={selected}
        onValueChange={setSelected}
        className="grid grid-cols-3 gap-3 md:grid-cols-5"
      >
        {images.map((image) => (
          <ToggleGroup.Item
            key={image.id}
            value={String(image.id)}
            className="relative rounded-lg p-0.5 data-[state=on]:ring-2"
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                alt={`Gallery image ${image.id}`}
                src={image.src}
                width={300}
                height={300}
                className="h-full rounded-lg object-cover"
              />
            </AspectRatio>

            <div
              className={cn(
                "absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                selected.includes(String(image.id)) &&
                  "bg-primary shadow-white",
              )}
            >
              <CheckIcon
                className={cn(
                  "hidden text-primary-foreground",
                  selected.includes(String(image.id)) && "block",
                )}
              />
            </div>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};
