import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import placeholderImage from "@/public/images/you-are-invited.jpeg";

export const EventThumbnail = () => {
  return (
    <AspectRatio ratio={1 / 1} className="rounded-md">
      <Image
        fill
        src={placeholderImage.src}
        alt="event placeholder image"
        className="size-full rounded-md"
      />
    </AspectRatio>
  );
};
