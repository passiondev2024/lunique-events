"use client";

import { useState } from "react";
import { AppWindowIcon, PenIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { themes } from "@/lib/themes";

import { Customizer } from "./theme-customizer";
import { type EventSchema } from "./validation";

interface EventThemeProps {
  value: EventSchema["theme"];
  onChange: (value: EventSchema["theme"]) => void;
}

export const EventTheme = ({ value, onChange }: EventThemeProps) => {
  const [open, setOpen] = useState(false);

  const { resolvedTheme: mode } = useTheme();
  const theme = themes.find((item) => item.name === value.theme) ?? themes[0];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-muted">
        <span className="flex items-center gap-3">
          <AppWindowIcon
            className="size-12"
            style={{
              color: `hsl(${theme.activeColor[mode === "dark" ? "dark" : "light"]})`,
            }}
          />
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-xs">Theme</span>
            <span className="font-medium capitalize">
              {value.theme}, {value.font}, {value.mode}
            </span>
          </span>
        </span>
        <PenIcon className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="px-3">
        <DrawerHeader>
          <DrawerTitle className="text-center">Customize</DrawerTitle>
          <DrawerDescription className="text-center">
            Pick a style and color for your event page.
          </DrawerDescription>
        </DrawerHeader>

        <div className=" py-3 md:py-5">
          <Customizer value={value} onChange={onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
