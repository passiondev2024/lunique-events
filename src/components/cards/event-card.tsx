import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { CalendarIcon, GalleryThumbnailsIcon, MapPinIcon } from "lucide-react";

interface EventCardProps {
  name: string;
  date: Date;
  location?: string;
  image?: string;
}

export const EventCard = ({ name, date, location, image }: EventCardProps) => {
  return (
    <Card>
      <AspectRatio ratio={16 / 9}>
        {image && (
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="h-full w-full rounded-t-lg object-cover"
          />
        )}
        {!image && (
          <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-primary/20">
            <GalleryThumbnailsIcon className="h-24 w-24 text-primary-foreground" />
          </div>
        )}
      </AspectRatio>
      <CardFooter className="relative flex flex-col items-baseline gap-1 py-3">
        <p className="text-lg font-semibold">{name}</p>
        <div className="space-y-0.5">
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarIcon className="h-4 w-4" />
            {format(date, "do MMMM, yyy")}
          </p>
          {location && (
            <p className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPinIcon className="h-4 w-4" />
              {location}
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
