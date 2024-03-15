import { AspectRatio } from "@/components/ui/aspect-ratio";

export const EventImagesSkeleton = () => (
  <div className="animate-pulse space-y-5 pb-20 md:space-y-8">
    <div className="space-y-3">
      <div className="h-7 w-full rounded-lg bg-muted/60" />
      <div className="grid grid-cols-3 grid-rows-6 gap-1.5 md:grid-cols-5">
        {Array(15)
          .fill(0)
          .map((_, index) => index + 1)
          .map((i) => (
            <AspectRatio ratio={1 / 1} key={i}>
              <div className="size-full rounded-lg bg-muted/50" />
            </AspectRatio>
          ))}
      </div>
    </div>
  </div>
);
