"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { type EmblaCarouselType } from "embla-carousel";
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
import Image from "next/image";
import { awsImageLoader } from "@/lib/image-loader";

const PLACEHOLDER_URL = "/images/placeholder.jpg" as const;

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
  onShare,
  onImageSelect,
}: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [mainSlidesInView, setMainSlidesInView] = useState<number[]>([]);
  const [thumbSlidesInView, setThumbSlidesInView] = useState<number[]>([]);

  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const updateMainSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setMainSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateMainSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  const updateThumbSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setThumbSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateThumbSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!mainCarouselApi) return;

    updateMainSlidesInView(mainCarouselApi);
    mainCarouselApi.on("slidesInView", updateMainSlidesInView);
    mainCarouselApi.on("reInit", updateMainSlidesInView);
  }, [mainCarouselApi, updateMainSlidesInView]);

  useEffect(() => {
    if (!thumbCarouselApi) return;

    updateThumbSlidesInView(thumbCarouselApi);
    thumbCarouselApi.on("slidesInView", updateThumbSlidesInView);
    thumbCarouselApi.on("reInit", updateThumbSlidesInView);
  }, [thumbCarouselApi, updateThumbSlidesInView]);

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

  const handleDownload = useCallback(async (href: string) => {
    const res = await fetch(href, { method: "GET", headers: {} });
    const buffer = await res.arrayBuffer();

    const parts = href.split("/");

    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", parts[parts.length - 1] ?? "");
    document.body.appendChild(link);
    link.click();
  }, []);

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
    <div className="relative bg-primary-foreground">
      <div className="absolute right-3 top-3 z-10 flex gap-2.5 md:right-5 md:top-5 md:gap-3.5">
        {select && (
          <SelectButton
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            onSelectChange={() => handleImageSelect(selectedIndex)}
          />
        )}
        {download && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10  transition duration-200 hover:bg-primary/20 md:hover:scale-105"
            onClick={() => handleDownload(images[selectedIndex]?.url ?? "")}
          >
            <Download className="h-4 w-4 text-primary" />
          </button>
        )}
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
            <CarouselSlide
              key={img.id}
              idx={idx}
              url={img.url}
              isInView={mainSlidesInView.includes(idx)}
            />
          ))}
        </div>
      </div>

      {thumbs && (
        <div className="absolute bottom-3 z-10 flex w-full items-center justify-center px-3 2xl:bottom-8">
          <Thumbs
            images={images}
            inView={thumbSlidesInView}
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
  isInView: boolean;
};

const CarouselSlide = ({ idx, url, isInView }: CarouselSlideProps) => (
  <div
    style={{
      flex: "0 0 100%",
    }}
    className="h-fill relative"
    key={idx}
  >
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[500px] w-full lg:h-[800px] 2xl:h-[700px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isInView ? url : PLACEHOLDER_URL}
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);

type ThumbsProps = {
  images: ImageType[];
  inView: number[];
  onThumbClick: (index: number) => void;
  carouselRef: UseEmblaCarouselType["0"];
  selectedIndex: number;
};

const Thumbs = ({
  images,
  inView,
  carouselRef,
  onThumbClick,
  selectedIndex,
}: ThumbsProps) => {
  return (
    <div className="w-full overflow-hidden" ref={carouselRef}>
      <div className="flex gap-0.5 md:gap-0">
        {images.map((img, idx) => (
          <ThumbButton
            key={idx}
            index={idx}
            isInView={inView.includes(idx)}
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
  isInView: boolean;
  index: number;
  src: string;
};

const ThumbButton = ({
  index,
  selected,
  src,
  isInView,
  onClick,
}: ThumbButtonProps) => (
  <button
    onClick={() => onClick(index)}
    className={cn(
      "h-16 w-1/5 flex-none flex-shrink-0 flex-grow-0 rounded-sm transition duration-200 md:h-16 md:w-[7%] 2xl:h-20 ",
      !selected && "scale-90 opacity-25 hover:opacity-50",
    )}
  >
    <Image
      loader={awsImageLoader}
      className="h-full w-full rounded-sm object-cover"
      src={isInView ? src : PLACEHOLDER_URL}
      width={172}
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
    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10  transition duration-200 hover:bg-primary/20 md:hover:scale-105"
    onClick={() => onAction()}
  >
    <Icon className="h-4 w-4 text-primary" />
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
    className="flex h-10 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-primary/10 px-4 transition duration-200 hover:bg-primary/20 md:hover:scale-105"
  >
    <span className="text-xs font-bold uppercase text-primary">
      {isSelected ? "selected" : "select"}
    </span>
    <Checkbox.Root
      checked={isSelected}
      onCheckedChange={(c: boolean) => setIsSelected(c)}
      className="peer h-4 w-4 rounded-full border border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"
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
        "group absolute top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-muted-foreground/10 md:w-20",
        side === "left" && "left-0 md:left-5",
        side === "right" && "right-0 md:right-5",
      )}
      onClick={onAction}
    >
      <Icon className="h-6 w-6 bg-clip-content text-primary transition duration-200 md:h-10 md:w-10 md:group-hover:scale-105" />
    </button>
  );
};
