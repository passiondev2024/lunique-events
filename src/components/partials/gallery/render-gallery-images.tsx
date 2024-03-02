"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGalleryModal } from "@/hooks/use-gallery-modal-store";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpFromLineIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import { useImagesStore } from "@/hooks/use-images-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";

interface RenderGalleryImagesProps {
  event: NonNullable<RouterOutputs["event"]["get"]>;
  images: NonNullable<RouterOutputs["event"]["getImages"]>;
}

export const RenderGalleryImages = ({
  event,
  images,
}: RenderGalleryImagesProps) => {
  return (
    <>
      <div className="col-span-2 hidden overflow-hidden md:block">
        <ScrollArea className="relative h-screen p-3">
          <GalleryImages event={event} images={images} />
          <Scrollbar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className="p-3 md:hidden">
        <GalleryImages event={event} images={images} />
      </div>
    </>
  );
};

const ScrollTopButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="fixed bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground"
      onClick={onClick}
    >
      <ArrowUpFromLineIcon className="h-4 w-4 text-primary" />
    </button>
  );
};

export const GalleryImages = ({ images }: RenderGalleryImagesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { onOpen, updateImages, selected, updateSelected, toggleSelected } =
    useGalleryModal();

  const { images: foundImages } = useImagesStore();

  useEffect(() => {
    updateImages(images);
  }, [updateImages, images]);

  useEffect(() => {
    if (foundImages.length === 0) return;

    updateSelected([]);
    updateImages(foundImages);
  }, [foundImages, updateImages, updateSelected]);

  const isSelected = (id: string) =>
    !!selected.find((item) => item.id === id) ?? false;

  const handleScroll = () => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const imagesToRender = foundImages.length ? foundImages : images;

  return (
    <div>
      <div ref={ref} />
      {!isInView && <ScrollTopButton onClick={handleScroll} />}

      <ToggleGroup.Root
        type="multiple"
        orientation="horizontal"
        value={selected.map((image) => image.id)}
        onValueChange={(value: string[]) => {
          updateSelected(images.filter((img) => value.includes(img.id)));
        }}
        className="grid grid-cols-1 gap-1 pb-20 pt-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-1.5 2xl:grid-cols-4 2xl:gap-2"
      >
        {imagesToRender.map((image, idx) => (
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
                width={308}
                height={231}
                alt={`Gallery Image ${image.id}`}
                className="h-full w-full rounded-lg object-cover"
                loading="lazy"
              />
            </AspectRatio>
          </div>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

type SelectButtonProps = {
  isSelected: boolean;
  onSelectChange: () => void;
};

const SelectButton = ({ isSelected, onSelectChange }: SelectButtonProps) => (
  <motion.div
    className={cn(
      "flex h-7 cursor-pointer select-none items-center justify-center gap-1 rounded-full bg-white/20 transition duration-200 hover:bg-white/20 md:hover:scale-105",
    )}
    animate={{ width: isSelected ? 96 : 80 }}
    transition={{ duration: 0.2 }}
    onClick={() => onSelectChange()}
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
  </motion.div>
);
