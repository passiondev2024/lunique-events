"use client";

import image1 from "@/public/images/gallery/1.jpeg";
import image2 from "@/public/images/gallery/2.jpeg";
import image3 from "@/public/images/gallery/3.jpeg";
import image4 from "@/public/images/gallery/4.jpeg";
import image5 from "@/public/images/gallery/5.jpeg";
import image6 from "@/public/images/gallery/6.jpeg";
import image7 from "@/public/images/gallery/7.jpeg";
import image8 from "@/public/images/gallery/8.jpeg";
import image9 from "@/public/images/gallery/9.jpeg";
import image10 from "@/public/images/gallery/10.jpeg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventSection } from "./event-section";

export const EventGallery = () => {
  return (
    <EventSection heading="Gallery">
      <div className="font-medium">15 Photos</div>
      <div className="grid grid-cols-6 grid-rows-1 gap-1">
        {images.slice(0, 6).map((image, idx) => (
          <AspectRatio key={idx} ratio={1 / 1} className="rounded-md">
            <Image
              fill
              src={image}
              alt=""
              className="rounded-md object-cover"
            />
          </AspectRatio>
        ))}
      </div>
      <div>
        <Link
          href={paths.gallery.root}
          className={buttonVariants({ variant: "ghost", className: "w-full" })}
        >
          View Full Gallery <ChevronRight className="ml-1.5 size-4" />
        </Link>
      </div>
    </EventSection>
  );
};
