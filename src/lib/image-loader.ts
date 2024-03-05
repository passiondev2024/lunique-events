import { type ImageLoader } from "next/image";

export const awsImageLoader: ImageLoader = ({ src, width, quality }) => {
  if (quality) {
    return `${src}?format=auto&quality=${quality}&width=${width}`;
  } else return `${src}?format=auto&width=${width}`;
};
