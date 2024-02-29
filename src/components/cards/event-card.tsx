import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { CalendarIcon, GalleryThumbnailsIcon, MapPinIcon } from "lucide-react";
import { type RouterOutputs } from "@/trpc/shared";

interface EventCardProps {
  event: RouterOutputs["event"]["list"][number];
}

export const EventCard = ({ event }: EventCardProps) => {
  const { images, name, date, location } = event;

  return (
    <Card className="border-t-[0px]">
      <AspectRatio ratio={16 / 9}>
        {images[0] && (
          // eslint-disable-next-line
          <img
            src={images[0].url ?? ""}
            alt={name}
            className="h-full w-full rounded-t-lg object-cover"
          />
        )}
        {!images[0] && (
          <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted-foreground">
            <GalleryThumbnailsIcon className="h-24 w-24 text-muted" />
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
