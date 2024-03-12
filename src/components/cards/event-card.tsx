import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowRight,
  GalleryThumbnailsIcon,
  MapPinIcon,
  Users2Icon,
} from "lucide-react";
import { type RouterOutputs } from "@/trpc/shared";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import Image from "next/image";
import { awsImageLoader } from "@/lib/image-loader";

interface EventCardProps {
  event: RouterOutputs["event"]["list"][number];
}
type TargetClick = "eventPage" | "manageEventPage";

export const EventCard = ({ event }: EventCardProps) => {
  const { images, name, location, guests } = event;
  const router = useRouter();

  const handleClick = (dest: TargetClick) => {
    if (dest === "eventPage") {
      router.push(paths.events.event(event.id));
    }
    if (dest === "manageEventPage") {
      router.push(paths.events.settings(event.id));
    }
  };

  return (
    <Card className="flex flex-col rounded-lg border-t-[0px] md:flex-row">
      {images[0] && (
        <Image
          loader={awsImageLoader}
          width={500}
          height={281}
          src={images[0].url ?? ""}
          alt={name}
          className="rounded-t-lg object-cover md:h-[225px] md:w-[300px] md:rounded-l-lg md:rounded-tr-none"
        />
      )}
      {!images[0] && (
        <div className="flex h-full w-full items-center justify-center rounded-l-lg bg-muted-foreground md:rounded-l-lg md:rounded-t-none">
          <GalleryThumbnailsIcon className="h-24 w-24 text-muted" />
        </div>
      )}
      <CardHeader className="py-3">
        <CardTitle className="cursor-pointer text-lg font-semibold">
          {name}
        </CardTitle>
        <div className="space-y-2">
          {/* <p className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarIcon className="h-4 w-4" />
            {format(date, "do MMMM, yyy")}
          </p> */}
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <MapPinIcon className="h-4 w-4" />
            {location ? location : "Missing location "}
          </p>
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <Users2Icon className="h-4 w-4" />
            {guests.length !== 0 ? `${guests.length} guests` : "No guests yet"}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleClick("manageEventPage")}
          className="hover:bg-secondary/60"
        >
          <p>Manage Event</p>
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </CardHeader>
    </Card>
  );
};
