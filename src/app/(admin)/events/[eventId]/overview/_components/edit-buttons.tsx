import { Button } from "@/components/ui/button";

export const EditButtons = () => {
  return (
    <div className="flex gap-3">
      <Button
        size="sm"
        className="flex-1 bg-muted-foreground/30 text-primary hover:bg-muted-foreground/40"
      >
        Edit Event
      </Button>
      <Button
        size="sm"
        className="flex-1 bg-muted-foreground/30 text-primary hover:bg-muted-foreground/40"
      >
        Change Photo
      </Button>
    </div>
  );
};
