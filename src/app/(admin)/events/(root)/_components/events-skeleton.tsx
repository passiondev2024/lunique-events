import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";

export const EventsSleketon = () => (
  <div className="animate-pulse  space-y-5 md:space-y-8">
    <div className="flex items-center justify-between">
      <div className="space-y-1.5">
        <h1 className="h-5 w-32 rounded-lg bg-muted/60" />
        <p className="h-5 w-48 rounded-lg bg-muted/60" />
      </div>
      <div className="h-9 w-28 rounded-lg bg-muted/80" />
    </div>
    <div className="grid gap-3 md:grid-cols-4">
      {Array(16)
        .fill(0)
        .map((_, index) => index + 1)
        .map((i) => (
          <Card key={i} className="border-muted/50">
            <AspectRatio ratio={16 / 9}>
              <div className="size-full rounded-lg bg-muted/60" />
            </AspectRatio>
            <CardFooter className="relative flex flex-col items-baseline gap-1 py-3">
              <p className="h-5 w-56 rounded-lg bg-muted/60" />
              <div className="space-y-0.5">
                <p className="h-3.5 w-32 rounded-lg bg-muted/50" />
                <p className="h-3.5 w-36 rounded-lg bg-muted/40" />
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  </div>
);
