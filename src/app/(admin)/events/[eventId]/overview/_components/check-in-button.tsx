import { ScanLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CheckInButton = () => {
  return (
    <Button
      size="sm"
      className="w-full bg-muted-foreground/30 text-primary hover:bg-muted-foreground/40"
    >
      <ScanLineIcon className="mr-1.5 size-4" />
      Check In Guests
    </Button>
  );
};
