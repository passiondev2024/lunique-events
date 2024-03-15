import { type Image as ImageType } from "@prisma/client";
import { type UseEmblaCarouselType } from "embla-carousel-react";

import { ThumbButton } from "./thumb-button";

type ThumbsProps = {
  images: ImageType[];
  inView: number[];
  onThumbClick: (index: number) => void;
  carouselRef: UseEmblaCarouselType["0"];
  selectedIndex: number;
};

export const Thumbs = ({
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
