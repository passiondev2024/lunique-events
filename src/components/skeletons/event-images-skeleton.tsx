import { AspectRatio } from "../ui/aspect-ratio";

export const EventImagesSkeleton = () => (
  <div className="animate-pulse space-y-5 pb-20 md:space-y-8">
    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
      <header className="space-y-3">
        <h1 className="h-7 w-72 rounded-lg bg-muted/80 md:h-8" />
        <div className="flex flex-col gap-1.5 md:flex-row md:gap-3">
          <p className="h-6 w-32 rounded-lg bg-muted/60" />
          <p className="h-6 w-28 rounded-lg bg-muted/60" />
        </div>
      </header>
      <div className="flex gap-3">
        <div className="h-8 w-24 rounded-lg bg-muted" />
        <div className="h-8 w-24 rounded-lg bg-muted" />
      </div>
    </div>

    <div className="space-y-3">
      <div className="h-7 w-full rounded-lg bg-muted/60" />
      <div className="grid grid-cols-3 grid-rows-6 gap-1.5 md:grid-cols-5">
        {Array(15)
          .fill(0)
          .map((_, index) => index + 1)
          .map((i) => (
            <AspectRatio ratio={1 / 1} key={i}>
              <div className="h-full w-full rounded-lg bg-muted/50" />
            </AspectRatio>
          ))}
      </div>
    </div>
  </div>
);
