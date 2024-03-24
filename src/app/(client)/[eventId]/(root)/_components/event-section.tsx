import React from "react";

import { Separator } from "@/components/ui/separator";

interface EventSectionProps {
  heading: string;
  children: React.ReactNode;
}

export const EventSection = ({ heading, children }: EventSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <h2 className="font-semibold text-muted-foreground">{heading}</h2>
        <Separator />
      </div>
      {children}
    </div>
  );
};
