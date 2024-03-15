import Image from "next/image";

import { awsImageLoader } from "@/lib/image-loader";
import { cn } from "@/lib/utils";

import { PLACEHOLDER_URL } from "./config";

type ThumbButtonProps = {
  onClick: (index: number) => void;
  selected: boolean;
  isInView: boolean;
  index: number;
  src: string;
};

export const ThumbButton = ({
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
      className="size-full rounded-sm object-cover"
      src={isInView ? src : PLACEHOLDER_URL}
      width={172}
      height={60}
      alt=""
    />
  </button>
);
