import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";

export const ClientGallerySkeleton = () => (
  <ScrollArea className="relative col-span-2 h-screen">
    <div className="grid animate-pulse grid-cols-1 gap-1 p-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-1.5 2xl:grid-cols-4 2xl:gap-2">
      {Array(16)
        .fill(0)
        .map((_, index) => index + 1)
        .map((i) => (
          <AspectRatio ratio={4 / 3} key={i}>
            <div className="h-full w-full rounded-lg bg-muted/50" />
          </AspectRatio>
        ))}
    </div>
  </ScrollArea>
);
