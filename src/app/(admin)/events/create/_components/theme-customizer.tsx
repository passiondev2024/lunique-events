import React, { type HTMLAttributes } from "react";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fonts } from "@/lib/fonts";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

import { ThemeWrapper } from "./theme-wrapper";
import { type EventSchema } from "./validation";

interface CustomizerProps {
  value: EventSchema["theme"];
  onChange: (value: EventSchema["theme"]) => void;
}

export const Customizer = ({ value, onChange }: CustomizerProps) => {
  const { resolvedTheme: mode } = useTheme();

  const theme = themes.find((item) => item.name === value.theme) ?? themes[0];
  const font = fonts.find((item) => item.name === value.font) ?? fonts[0];

  return (
    <div className="space-y-10 md:grid md:grid-cols-4 md:place-items-start md:space-y-6">
      <ThemeVizualizer config={value} />
      <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
        <Popover>
          <PopoverTrigger className="flex w-full items-center justify-between rounded-md border border-border bg-muted/60 px-2 py-1  data-[state=open]:bg-muted">
            <span className="flex items-center gap-3">
              <span
                className="block size-6 rounded-full bg-white"
                style={{
                  backgroundColor: `hsl(${theme.activeColor[mode === "dark" ? "dark" : "light"]})`,
                }}
              />
              <span className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Theme</span>
                <span className="capitalize">{theme.name}</span>
              </span>
            </span>
            <ChevronsUpDownIcon className="size-5" />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="grid grid-cols-6 grid-rows-2 place-items-center bg-muted p-1.5"
          >
            {themes.map((theme) => {
              const isActive = value.theme === theme.name;

              return (
                <ColorButton
                  key={theme.name}
                  onClick={() => {
                    onChange({
                      ...value,
                      theme: theme.name,
                    });
                  }}
                  colorHslValue={
                    theme?.activeColor[mode === "dark" ? "dark" : "light"]
                  }
                  isActive={isActive}
                />
              );
            })}
          </PopoverContent>
        </Popover>
        {/* TODO: theme style */}
        <button
          disabled
          className="flex w-full items-center justify-between rounded-md border border-border bg-muted/60 px-2 py-1  disabled:opacity-50"
        >
          <span className="flex items-center gap-3">
            <span className="block size-6 rounded-full bg-muted " />
            <span className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Style</span>
              <span>-</span>
            </span>
          </span>
          <ChevronsUpDownIcon className="size-5" />
        </button>
        <Popover>
          <PopoverTrigger className="flex w-full items-center justify-between rounded-md border border-border bg-muted/60 px-2  py-1">
            <span className="flex items-center gap-3">
              <span className={cn("block text-xl font-bold", font?.className)}>
                Ag
              </span>
              <span className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Font</span>
                <span>{font?.name}</span>
              </span>
            </span>
            <ChevronsUpDownIcon className="size-5" />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="grid grid-cols-3 grid-rows-2 gap-1.5 bg-muted p-1.5"
          >
            {fonts.map((font) => {
              const isActive = font.name === value.font;

              return (
                <Button
                  variant="outline"
                  key={font.name}
                  onClick={() =>
                    onChange({
                      ...value,
                      font: font.name,
                    })
                  }
                  className={cn(
                    "h-full w-full py-4 text-xl",
                    isActive &&
                      "border-muted-foreground/60 bg-muted-foreground/20",
                    font.className,
                  )}
                >
                  Ag
                </Button>
              );
            })}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="flex w-full items-center justify-between rounded-md border border-border bg-muted/60 px-2  py-1">
            <span className="flex items-center gap-3">
              {value.mode === "light" && <SunIcon className="mx-0.5 size-5" />}
              {value.mode === "dark" && <MoonIcon className="mx-0.5 size-5 " />}
              {value.mode === "system" && (
                <SunMoonIcon className="mx-0.5 size-5 " />
              )}
              <span className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Mode</span>
                <span>System</span>
              </span>
            </span>
            <ChevronsUpDownIcon className="size-5" />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="grid w-fit grid-cols-3 grid-rows-1 gap-1.5 bg-muted p-3"
          >
            <Button
              variant="outline"
              onClick={() => onChange({ ...value, mode: "light" })}
              className={cn(
                "min-w-fit border-muted-foreground/20",
                value.mode === "light" && "border-muted-foreground/60",
              )}
            >
              <SunIcon className="mr-1.5 size-4" />
              Light
            </Button>
            <Button
              variant="outline"
              onClick={() => onChange({ ...value, mode: "dark" })}
              className={cn(
                "min-w-fit border-muted-foreground/20",
                value.mode === "dark" && "border-muted-foreground/60",
              )}
            >
              <MoonIcon className="mr-1.5 size-4" />
              Dark
            </Button>
            <Button
              variant="outline"
              onClick={() => onChange({ ...value, mode: "system" })}
              className={cn(
                "min-w-fit border-muted-foreground/20",
                value.mode === "system" && "border-muted-foreground/60",
              )}
            >
              <SunMoonIcon className="mr-1.5 size-4" />
              System
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

interface ColorButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  colorHslValue: string;
}

const ColorButton = ({
  onClick,
  isActive,
  className,
  colorHslValue,
}: ColorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "trasition flex h-full w-full items-center justify-center rounded-full py-1.5 text-[--card-foreground] duration-200 hover:bg-[--card] hover:opacity-90",
        className,
      )}
      style={
        {
          "--theme-primary": `hsl(${colorHslValue})`,
        } as React.CSSProperties
      }
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full bg-[--theme-primary] transition duration-200",
          isActive && "scale-110",
        )}
      >
        {isActive && <CheckIcon className="size-4 text-white" />}
      </span>
    </button>
  );
};

const ThemeVizualizer = ({ config }: { config: EventSchema["theme"] }) => {
  return (
    <ThemeWrapper
      config={config}
      className="w-full space-y-3 rounded-md  border border-[--border] bg-[--background] px-3 py-5 text-[--card-foreground]"
    >
      <div>
        <h1 className="text-xl font-semibold leading-5 text-[--accent-foreground]">
          Title
        </h1>
        <p className="text-sm leading-4 text-[--muted-foreground]">
          Description
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex h-full flex-col justify-center gap-1.5 rounded-md border border-[--border] bg-[--card] px-3 py-5">
          <div className="h-3 w-44 rounded-sm bg-[--primary] opacity-70" />
          <div className="h-3 w-32 rounded-sm bg-[--primary] opacity-65" />
          <div className="h-3 w-36 rounded-sm bg-[--primary] opacity-75" />
          <div className="h-3 w-28 rounded-sm bg-[--primary] opacity-60" />
          <div className="h-3 w-48 rounded-sm bg-[--primary] opacity-80" />
        </div>
        <p className="text-sm text-[--foreground]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At ratione
          voluptates consequatur neque cupiditate nesciunt ut qui aliquam enim
          ab perspiciatis ex, vero, similique facilis fugiat voluptate excepturi
          illo molestiae?
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex w-full gap-1.5">
          <Button
            size="sm"
            className="w-full bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]"
          >
            Primary
          </Button>
          <Button
            size="sm"
            className="w-full  bg-[--secondary] text-[--secondary-foreground] hover:bg-[--secondary]"
          >
            Secondary
          </Button>
        </div>
      </div>
    </ThemeWrapper>
  );
};
