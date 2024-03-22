"use client";

import { useState } from "react";
import { AppWindowIcon, PenIcon } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Customizer } from "./theme-customizer";
import { type EventSchema } from "./validation";

interface EventThemeProps {
  value: EventSchema["theme"];
  onChange: (value: EventSchema["theme"]) => void;
}

export const EventTheme = ({ value, onChange }: EventThemeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-muted">
        <span className="flex items-center gap-3">
          <AppWindowIcon className="size-12 text-muted-foreground" />
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-xs text-muted-foreground">Theme</span>
            <span className="font-medium capitalize">
              {value.theme}, {value.font}, {value.mode}
            </span>
          </span>
        </span>
        <PenIcon className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="px-3">
        <DrawerHeader>
          <DrawerTitle>Customize</DrawerTitle>
          <DrawerDescription>
            Pick a style and color for your event page.
          </DrawerDescription>
        </DrawerHeader>

        <div className="pb-3">
          <Customizer value={value} onChange={onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
