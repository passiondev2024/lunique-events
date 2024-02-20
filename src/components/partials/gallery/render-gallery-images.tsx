"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import { api } from "@/trpc/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import Image from "next/image";
import { useEffect } from "react";
import { CheckIcon } from "lucide-react";

interface RenderGalleryImagesProps {
  eventId: string;
}

export const RenderGalleryImages = ({ eventId }: RenderGalleryImagesProps) => {
  const { onOpen, updateImages, selected, updateSelected, toggleSelected } =
    useGalleryModal();

  const { data: images } = api.event.getImages.useQuery({ eventId });

  useEffect(() => {
    if (!images) return;

    updateImages(images);
  }, [updateImages, images]);

  useEffect(() => {
    console.log({ selected });
  }, [selected]);

  const isSelected = (id: string) =>
    !!selected.find((item) => item.id === id) ?? false;

  if (!images) return <div>Loading...</div>;

  return (
    <ToggleGroup.Root
      type="multiple"
      orientation="horizontal"
      value={selected.map((image) => image.id)}
      onValueChange={(value: string[]) => {
        updateSelected(images.filter((img) => value.includes(img.id)));
      }}
      className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-1.5 2xl:grid-cols-4 2xl:gap-2"
    >
      {images.map((image, idx) => (
        <div key={image.id} onClick={() => onOpen(idx)} className="relative">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-2 top-2 z-10"
          >
            <SelectButton
              isSelected={isSelected(image.id)}
              onSelectChange={() => toggleSelected(image)}
            />
          </div>

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
    </ToggleGroup.Root>
  );
};

type SelectButtonProps = {
  isSelected: boolean;
  onSelectChange: () => void;
};

const SelectButton = ({ isSelected, onSelectChange }: SelectButtonProps) => (
  <div
    onClick={() => onSelectChange()}
    className="flex h-7 cursor-pointer select-none items-center justify-center gap-1 rounded-full bg-white/20 px-2.5 transition duration-200 hover:scale-105 hover:bg-white/20"
  >
    <p className="text-xs font-medium uppercase text-primary">
      {isSelected ? "selected" : "select"}
    </p>
    <Checkbox.Root
      checked={isSelected}
      className="peer h-3.5 w-3.5 rounded-full border border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"
    >
      <Checkbox.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-2.5 w-2.5 text-primary" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
);
