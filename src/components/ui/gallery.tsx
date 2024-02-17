"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Image from "next/image";
import { type Image as ImageType } from "@prisma/client";
import { ChevronLeft, ChevronRight, Download, Share, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryOptions = {
  thumbs?: boolean;
  close?: boolean;
  chevrons?: boolean;
  share?: boolean;
  download?: boolean;
};
export type GalleryHandlers = {
  onClose?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
};

type GalleryProps = {
  images: ImageType[];
  currentImage: number;
} & GalleryOptions &
  GalleryHandlers;

export const Gallery = ({
  images,
  currentImage = 0,
  thumbs,
  chevrons = true,
  close,
  download,
  share,
  onClose,
  onDownload,
  onShare,
}: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    thumbCarouselApi.scrollTo(currentImage);
  }, [currentImage, mainCarouselApi, thumbCarouselApi]);

  useEffect(() => {
    if (!mainCarouselApi) return;

    onSelect();

    mainCarouselApi.on("select", onSelect);
    mainCarouselApi.on("reInit", onSelect);
  }, [mainCarouselApi, onSelect]);

  const handleClose = () => {
    if (onClose) onClose();
  };
  const handleDownload = () => {
    if (onDownload) onDownload();
  };
  const handleShare = () => {
    if (onShare) onShare();
  };

  const handleLeft = () => {
    mainCarouselApi?.scrollPrev();
  };
  const handleRight = () => {
    mainCarouselApi?.scrollNext();
  };

  return (
    <div className="relative bg-primary">
      <div className="absolute right-3 top-3 z-10 flex gap-3 md:right-5 md:top-5 md:gap-5">
        {download && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 text-primary-foreground" />
          </button>
        )}

        {share && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 text-primary-foreground" />
          </button>
        )}
        {close && (
          <button
            className="rounded-full bg-white/20 p-2 transition duration-200 hover:scale-110 hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-4 w-4 text-primary-foreground" />
          </button>
        )}
      </div>

      {chevrons && (
        <>
          {mainCarouselApi?.canScrollPrev() && (
            <button
              className="group absolute left-0 top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-white/5 md:left-5 md:w-20"
              onClick={handleLeft}
            >
              <ChevronLeft className="h-6 w-6 bg-clip-content text-primary-foreground transition duration-200 group-hover:scale-110 md:h-10 md:w-10" />
            </button>
          )}
          {mainCarouselApi?.canScrollNext() && (
            <button
              className="group absolute right-0 top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-white/5 md:right-5 md:w-20"
              onClick={handleRight}
            >
              <ChevronRight className="h-6 w-6 bg-clip-content text-primary-foreground transition duration-200 group-hover:scale-110 md:h-10 md:w-10" />
            </button>
          )}
        </>
      )}

      <div className="overflow-hidden" ref={mainCarouselRef}>
        <div className="flex touch-pan-y gap-1.5">
          {images.map((img, idx) => (
            <div
              style={{
                flex: "0 0 100%",
              }}
              className="relative h-screen"
              key={idx}
            >
              <Image
                src={img.url}
                fill
                className="absolute object-cover blur-2xl brightness-75"
                alt=""
              />
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative h-[500px] w-full lg:h-[800px]">
                  <Image src={img.url} fill alt="" className="object-contain" />
                </div>
                I
              </div>
            </div>
          ))}
        </div>
      </div>

      {thumbs && (
        <div className="absolute bottom-3 z-10 flex w-full items-center justify-center">
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
      "h-12 w-1/5 flex-none flex-shrink-0 flex-grow-0 rounded-sm transition duration-200 md:h-16 md:w-[8%]",
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
