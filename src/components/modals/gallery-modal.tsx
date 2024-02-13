"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { variants } from "@/lib/animationVariants";
import { motion } from "framer-motion";
// eslint-disable-next-line
// @ts-ignore
import useKeypress from "react-use-keypress";
import { Button } from "../ui/button";
import {
  ArrowUpRightFromCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";
import { range } from "@/lib/range";
import { cn } from "@/lib/utils";
import { type Image as ImageType } from "@prisma/client";

const swipeConfidenceThreshold = 10000;

export const GalleryModal = () => {
  const [direction, setDirection] = useState(1);
  const [index, setIndex] = useState<number>(0);
  const [filteredImages, setFilteredImages] = useState<
    { image: ImageType; idx: number }[]
  >([]);

  const {
    isOpen,
    type,
    onClose,
    data: { galleryImages, currentImage },
  } = useModal();

  const isModalOpen = isOpen && type === "event-gallery";

  useEffect(() => {
    if (galleryImages && index !== null) {
      const imagesWithIndex = galleryImages.map((image, idx) => ({
        image,
        idx,
      }));
      const filtered = imagesWithIndex?.filter((image) =>
        range(index - 15, index + 15).includes(image.idx),
      );

      setFilteredImages(filtered);
    }
  }, [galleryImages, index]);

  useEffect(() => {
    if (!currentImage) return;
    setIndex(currentImage);
  }, [currentImage]);

  // eslint-disable-next-line
  useKeypress("ArrowRight", () => handleRight());
  // eslint-disable-next-line
  useKeypress("ArrowLeft", () => handleLeft());

  const handleClose = () => {
    const imageEl = document.getElementById(`gallery-image-${index}`);
    imageEl?.scrollIntoView({ behavior: "instant", block: "center" });

    onClose();
  };

  const handleLeft = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setDirection(-1);
    }
  };

  const handleRight = () => {
    if (galleryImages && index !== galleryImages?.length - 1) {
      setIndex((prev) => prev + 1);
      setDirection(1);
    }
  };

  const changePhotoId = (newVal: number) => {
    if (index === null) return;

    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }

    setIndex(newVal);
  };

  if (!galleryImages) return;

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleClose} modal>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-30 overflow-hidden">
          <button className="fixed inset-0 bg-black" onClick={handleClose}>
            <span className="relative">
              <Image
                src={galleryImages[index]?.url ?? ""}
                width={200}
                height={200}
                alt="blur"
                className="h-full w-full "
              />
            </span>
            <span className="fixed inset-0 bg-black/60 backdrop-blur-2xl" />
          </button>
          <div className="fixed left-[50%] top-[50%] flex h-fit w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] items-center outline-none">
            <AspectRatio ratio={3 / 2} className="relative overflow-hidden">
              <MotionConfig
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset }) => {
                      const swipe = offset.x * 120;

                      if (swipe < -swipeConfidenceThreshold) {
                        handleRight();
                      }
                      if (swipe > swipeConfidenceThreshold) {
                        handleLeft();
                      }
                    }}
                  >
                    <Image
                      src={galleryImages[index]?.url ?? ""}
                      width={1280}
                      height={853}
                      priority
                      alt="Gallery Image"
                    />
                  </motion.div>
                </AnimatePresence>
              </MotionConfig>

              {index && (
                <div className="absolute left-1.5 top-[calc(50%-20px)] md:left-3 md:top-[calc(50%-32px)]">
                  <Button
                    onClick={handleLeft}
                    className="h-10 w-10 rounded-full bg-accent-foreground/80 p-0 md:h-14 md:w-14"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-accent/90 md:h-8 md:w-8" />
                  </Button>
                </div>
              )}
              {index < galleryImages.length - 1 && (
                <div className="absolute right-1.5 top-[calc(50%-20px)] md:right-3 md:top-[calc(50%-32px)]">
                  <Button
                    onClick={handleRight}
                    className="h-10 w-10 rounded-full bg-accent-foreground/80 p-0 md:h-14 md:w-14"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-accent/90 md:h-8 md:w-8" />
                  </Button>
                </div>
              )}

              <div className="absolute right-1 top-1 space-x-3 xl:top-10 2xl:top-3">
                <Button className="h-8 w-8 rounded-full bg-accent-foreground/80 p-0 md:h-10 md:w-10">
                  <ArrowUpRightFromCircleIcon className="h-3.5 w-3.5 text-accent/90 md:h-4 md:w-4" />
                </Button>
                <Button className="h-8 w-8 rounded-full bg-accent-foreground/80 p-0 md:h-10 md:w-10">
                  <DownloadIcon className="h-3.5 w-3.5 text-accent/90 md:h-4 md:w-4" />
                </Button>
              </div>

              <div className="absolute left-1 top-1 md:left-3 md:top-10">
                <Button
                  className="h-8 w-8 rounded-full bg-accent-foreground/80 p-0 md:h-10 md:w-10"
                  onClick={handleClose}
                >
                  <XIcon className="h-3.5 w-3.5 text-accent/90 md:h-4 md:w-4" />
                </Button>
              </div>
            </AspectRatio>
          </div>

          {index !== null && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {filteredImages.map(({ image: { url }, idx }) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: idx === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => changePhotoId(idx)}
                      key={idx}
                      className={cn(
                        "relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none",
                        idx === index
                          ? "z-20 rounded-md shadow shadow-black/50"
                          : "z-10",
                        idx === 0 ? "rounded-l-md" : "",
                        idx === galleryImages.length - 1 ? "rounded-r-md" : "",
                      )}
                    >
                      <Image
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={cn(
                          "h-full transform object-cover transition",
                          idx === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75",
                        )}
                        src={url}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
