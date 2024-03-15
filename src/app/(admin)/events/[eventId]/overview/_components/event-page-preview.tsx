import { AspectRatio } from "@/components/ui/aspect-ratio";

export const EventPagePreview = () => {
  return (
    <AspectRatio ratio={1 / 1}>
      <div className="flex size-full items-center justify-center rounded-md bg-muted-foreground/30 text-muted-foreground">
        Event page preview
      </div>
    </AspectRatio>
  );
};
