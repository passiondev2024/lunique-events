"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Image from "next/image";
import { type Image as ImageType } from "@prisma/client";
import {
  type LucideIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Share,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useArrowKey } from "@/hooks/use-arrow-key";

export type GalleryOptions = {
  thumbs?: boolean;
  close?: boolean;
  chevrons?: boolean;
  share?: boolean;
  download?: boolean;
  select?: boolean;
};
export type GalleryHandlers = {
  onClose?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onImageSelect?: (index: number) => void;
};
export type GalleryData = {
  selected?: number[];
};

type GalleryProps = {
  images: ImageType[];
  currentImage: number;
} & GalleryOptions &
  GalleryHandlers &
  GalleryData;

export const Gallery = ({
  images,
  currentImage = 0,
  thumbs,
  chevrons = true,
  close,
  download,
  share,
  select,
  selected,
  onClose,
  onDownload,
  onShare,
  onImageSelect,
}: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainCarouselApi || !thumbCarouselApi) return;

      mainCarouselApi.scrollTo(index, true);
    },
    [mainCarouselApi, thumbCarouselApi],
  );

  const onSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbCarouselApi) return;

    setSelectedIndex(mainCarouselApi.selectedScrollSnap());
    thumbCarouselApi.scrollTo(mainCarouselApi.selectedScrollSnap());
  }, [mainCarouselApi, thumbCarouselApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainCarouselApi || !thumbCarouselApi || !currentImage) return;

    mainCarouselApi.scrollTo(currentImage, true);
    thumbCarouselApi.scrollTo(currentImage, true);
  }, [currentImage, mainCarouselApi, thumbCarouselApi]);

  useEffect(() => {
    if (!mainCarouselApi) return;

    onSelect();

    mainCarouselApi.on("select", onSelect);
    mainCarouselApi.on("reInit", onSelect);
  }, [mainCarouselApi, onSelect]);

  useEffect(() => {
    if (selected?.includes(selectedIndex)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedIndex, selected]);

  const handleLeft = useCallback(() => {
    mainCarouselApi?.scrollPrev();
  }, [mainCarouselApi]);

  const handleRight = useCallback(() => {
    mainCarouselApi?.scrollNext();
  }, [mainCarouselApi]);

  useArrowKey({ onArrowLeft: handleLeft, onArrowRight: handleRight });

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const handleDownload = useCallback(() => {
    if (onDownload) onDownload();
  }, [onDownload]);

  const handleShare = useCallback(() => {
    if (onShare) onShare();
  }, [onShare]);

  const handleImageSelect = useCallback(
    (index: number) => {
      if (onImageSelect) onImageSelect(index);
    },
    [onImageSelect],
  );

  return (
    <div className="relative bg-primary">
      <div className="absolute right-3 top-3 z-10 flex gap-2.5 md:right-5 md:top-5 md:gap-3.5">
        {select && (
          <SelectButton
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onSelectChange={() => handleImageSelect(selectedIndex)}
          />
        )}
        {download && <ActionButton Icon={Download} onAction={handleDownload} />}
        {share && <ActionButton Icon={Share} onAction={handleShare} />}
        {close && <ActionButton Icon={X} onAction={handleClose} />}
      </div>

      {chevrons && mainCarouselApi?.canScrollPrev() && (
        <ChevronButton side="left" onAction={handleLeft} />
      )}
      {chevrons && mainCarouselApi?.canScrollNext() && (
        <ChevronButton side="right" onAction={handleRight} />
      )}

      <div className="overflow-hidden" ref={mainCarouselRef}>
        <div className="flex touch-pan-y gap-1.5">
          {images.map((img, idx) => (
            <CarouselSlide key={img.id} idx={idx} url={img.url} />
          ))}
        </div>
      </div>

      {thumbs && (
        <div className="absolute bottom-3 z-10 flex w-full items-center justify-center 2xl:bottom-8">
          <Thumbs
            images={images}
            carouselRef={thumbCarouselRef}
            onThumbClick={onThumbClick}
            selectedIndex={selectedIndex}
          />
        </div>
      )}
    </div>
  );
};

type CarouselSlideProps = {
  idx: number;
  url: string;
};

const CarouselSlide = ({ idx, url }: CarouselSlideProps) => (
  <div
    style={{
      flex: "0 0 100%",
    }}
    className="relative h-screen"
    key={idx}
  >
    <Image
      src={url}
      fill
      className="absolute object-cover blur-2xl brightness-75"
      alt=""
    />
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[500px] w-full lg:h-[800px] 2xl:h-[700px]">
        <Image src={url} fill alt="" className="object-contain" />
      </div>
      I
    </div>
  </div>
);

type ThumbsProps = {
  images: ImageType[];
  onThumbClick: (index: number) => void;
  carouselRef: UseEmblaCarouselType["0"];
  selectedIndex: number;
};

const Thumbs = ({
  images,
  carouselRef,
  onThumbClick,
  selectedIndex,
}: ThumbsProps) => {
  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div className="flex gap-0.5 md:gap-0">
        {images.map((img, idx) => (
          <ThumbButton
            key={idx}
            index={idx}
            selected={idx === selectedIndex}
            onClick={() => onThumbClick(idx)}
            src={img.url}
          />
        ))}
      </div>
    </div>
  );
};

type ThumbButtonProps = {
  onClick: (index: number) => void;
  selected: boolean;
  index: number;
  src: string;
};

const ThumbButton = ({ index, selected, src, onClick }: ThumbButtonProps) => (
  <button
    onClick={() => onClick(index)}
    className={cn(
      "h-12 w-1/5 flex-none flex-shrink-0 flex-grow-0 rounded-sm transition duration-200 md:h-16 md:w-[8%] 2xl:h-20 2xl:w-[5%]",
      !selected && "scale-90 opacity-25 hover:opacity-50",
    )}
  >
    <Image
      className="rounded-sm object-cover"
      src={src}
      width={120}
      height={60}
      alt=""
    />
  </button>
);

type ActionButtonProps = {
  Icon: LucideIcon;
  onAction: (idx?: number) => void;
};

const ActionButton = ({ Icon, onAction }: ActionButtonProps) => (
  <button
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20  transition duration-200 hover:bg-white/20 md:hover:scale-105"
    onClick={() => onAction()}
  >
    <Icon className="h-4 w-4 text-primary-foreground" />
  </button>
);

type SelectButtonProps = {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectChange: (idx?: number) => void;
};

const SelectButton = ({
  isSelected,
  setIsSelected,
  onSelectChange,
}: SelectButtonProps) => (
  <div
    onClick={() => onSelectChange()}
    className="flex h-10 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-white/20 px-4 transition duration-200 hover:bg-white/20 md:hover:scale-105"
  >
    <span className="text-xs font-bold uppercase text-primary-foreground">
      {isSelected ? "selected" : "select"}
    </span>
    <Checkbox.Root
      checked={isSelected}
      onCheckedChange={(c: boolean) => setIsSelected(c)}
      className="peer h-4 w-4 rounded-full border border-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"
    >
      <Checkbox.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="h-3 w-3" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
);

type ChevronButtonProps = {
  side: "left" | "right";
  onAction: () => void;
};

const ChevronButton = ({ side, onAction }: ChevronButtonProps) => {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      className={cn(
        "group absolute  top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-white/5 md:w-20",
        side === "left" && "left-0 md:left-5",
        side === "right" && "right-0 md:right-5",
      )}
      onClick={onAction}
    >
      <Icon className="h-6 w-6 bg-clip-content text-primary-foreground transition duration-200 md:h-10 md:w-10 md:group-hover:scale-105" />
    </button>
  );
};
