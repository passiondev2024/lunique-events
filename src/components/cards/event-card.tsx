import { AspectRatio } from "../ui/aspect-ratio";
import { Card, CardFooter } from "../ui/card";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarIcon,
  GalleryThumbnailsIcon,
  MapPinIcon,
  Users2Icon,
} from "lucide-react";
import { type RouterOutputs } from "@/trpc/shared";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";

interface EventCardProps {
  event: RouterOutputs["event"]["list"][number];
}
type TargetClick = "eventPage" | "manageEventPage";

export const EventCard = ({ event }: EventCardProps) => {
  const { images, name, date, location, guests } = event;
  const router = useRouter();

  const handleClick = (dest: TargetClick) => {
    console.log(dest);
    if (dest === "eventPage") {
      router.push(paths.events.event(String(event.id)));
      return;
    }
    if (dest === "manageEventPage") {
      router.push(paths.events.settings(String(event.id)));
      return;
    }
  };

  return (
    <Card className="border-t-[0px] transition duration-200 lg:hover:brightness-125">
      <AspectRatio ratio={16 / 9} onClick={() => handleClick("eventPage")}>
        {images[0] && (
          // eslint-disable-next-line
          <img
            src={images[0].url ?? ""}
            alt={name}
            className="h-full w-full cursor-pointer rounded-t-lg object-cover"
          />
        )}
        {!images[0] && (
          <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted-foreground">
            <GalleryThumbnailsIcon className="h-24 w-24 text-muted" />
          </div>
        )}
      </AspectRatio>
      <CardFooter className="relative flex  flex-col items-baseline gap-1 py-3">
        <p
          className="cursor-pointer text-lg font-semibold"
          onClick={() => handleClick("eventPage")}
        >
          {name}
        </p>
        <div className="space-y-2">
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
          {guests && (
            <p className="flex items-center gap-2 text-sm text-zinc-500">
              <Users2Icon className="h-4 w-4" />
              {guests.length}
            </p>
          )}
        </div>
        <Button
          className="h-8 gap-x-2 bg-slate-500 "
          onClick={() => handleClick("manageEventPage")}
        >
          <p>Manage Event</p>
          <ArrowRight className="h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
