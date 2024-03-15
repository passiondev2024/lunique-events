"use client";

import React, { useCallback, useEffect, useState } from "react";
import { type Image as ImageType } from "@prisma/client";
import { type EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Download, Share, X } from "lucide-react";

import { useActionKeys } from "@/hooks/use-action-keys";

import { ActionButton, ChevronButton, SelectButton } from "./buttons";
import { CarouselSlide } from "./slide";
import { Thumbs } from "./thumbs";

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

  const handleSelectKey = () => {
    handleImageSelect(selectedIndex);
  };

  useActionKeys({
    onArrowLeft: handleLeft,
    onArrowRight: handleRight,
    onImageSelect: handleSelectKey,
  });

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
            className="flex size-10 items-center justify-center rounded-full bg-primary/10 transition  duration-200 hover:bg-primary/20 md:hover:scale-105"
            onClick={() => handleDownload(images[selectedIndex]?.url ?? "")}
          >
            <Download className="size-4 text-primary" />
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
