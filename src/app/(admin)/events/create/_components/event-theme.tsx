"use client";

import { useState } from "react";
import { AppWindowIcon, PenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Theme } from "@/lib/themes";

import { Customizer } from "./theme-customizer";
import { ThemeWrapper } from "./theme-wrapper";
import { type EventSchema } from "./validation";

export type Config = {
  theme: Theme["name"];
  font: string;
  mode: "light" | "dark" | "system";
};

interface EventThemeProps {
  value: EventSchema["theme"];
  onChange: (value: EventSchema["theme"]) => void;
}

export const EventTheme = ({ onChange }: EventThemeProps) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<Config>({
    font: "roboto",
    theme: "zinc",
    mode: "dark",
  });

  const handleSaveTheme = () => {
    onChange(config);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-muted">
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
      </DialogTrigger>
      <DialogContent className="p-0">
        <ThemeWrapper
          config={config}
          className="space-y-3 rounded-md bg-[--background] p-5 text-[--accent-foreground]"
        >
          <DialogHeader>
            <DialogTitle>Customize</DialogTitle>
            <DialogDescription>
              Pick a style and color for your event page.
            </DialogDescription>
          </DialogHeader>

          <Customizer value={config} onChange={setConfig} />

          <DialogFooter>
            <Button
              size="lg"
              onClick={handleSaveTheme}
              className="w-full bg-[--primary] text-[--primary-foreground] hover:bg-[--primary] hover:opacity-90"
            >
              Save Theme
            </Button>
          </DialogFooter>
        </ThemeWrapper>
      </DialogContent>
    </Dialog>
  );
};
