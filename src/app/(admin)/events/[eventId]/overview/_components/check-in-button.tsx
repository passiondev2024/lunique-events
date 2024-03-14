import { Button } from "@/components/ui/button";
import { ScanLineIcon } from "lucide-react";

export const CheckInButton = () => {
  return (
    <Button
      size="sm"
      className="w-full bg-muted-foreground/30 text-primary hover:bg-muted-foreground/40"
    >
      <ScanLineIcon className="mr-1.5 h-4 w-4" />
      Check In Guests
    </Button>
  );
};
