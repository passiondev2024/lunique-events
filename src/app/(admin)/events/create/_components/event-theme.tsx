"use client";

import { useEffect, useState } from "react";
import { AppWindowIcon, PenIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { type Theme } from "@/lib/themes";

import { Customizer } from "./theme-customizer";
import { type EventSchema } from "./validation";

type Mode = "light" | "dark" | "system";

export type Config = {
  theme: Theme["name"];
  font: string;
  mode: Mode;
};

interface EventThemeProps {
  value: EventSchema["theme"];
  onChange: (value: EventSchema["theme"]) => void;
}

export const EventTheme = ({ onChange }: EventThemeProps) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<Config>({
    font: "roboto",
    theme: "slate",
    mode: "dark",
  });

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setConfig((prev) => ({ ...prev, mode: resolvedTheme as Mode }));
  }, [resolvedTheme]);

  const handleSaveTheme = () => {
    onChange(config);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-muted">
        <span className="flex items-center gap-3">
          <AppWindowIcon className="size-12 text-muted-foreground" />
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-xs text-muted-foreground">Theme</span>
            <span className="font-medium capitalize">
              {config.theme}, {config.font}, {config.mode}
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

        <Customizer value={config} onChange={setConfig} />

        <DrawerFooter className="px-0">
          <Button size="lg" onClick={handleSaveTheme} className="w-full">
            Save Theme
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
