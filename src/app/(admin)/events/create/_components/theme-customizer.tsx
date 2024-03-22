import React, { Attributes, type HTMLAttributes } from "react";
import { Label } from "@radix-ui/react-label";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { fonts } from "@/lib/fonts";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

import { type Config } from "./event-theme";
import { ThemeWrapper } from "./theme-wrapper";

interface CustomizerProps {
  value: Config;
  onChange: (value: Config) => void;
}

export const Customizer = ({ value, onChange }: CustomizerProps) => {
  const { resolvedTheme: mode } = useTheme();

  return (
    <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
      <div className="space-y-1.5">
        <Label className="text-xs">Color</Label>
        <div className="grid grid-cols-6 place-items-center">
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
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Font</Label>
        <div className="grid grid-cols-6 gap-2 ">
          {fonts.map((font) => {
            const isActive = font.name.toLocaleLowerCase() === value.font;

            return (
              <Button
                variant="outline"
                key={font.name}
                onClick={() =>
                  onChange({
                    ...value,
                    font: font.name.toLocaleLowerCase(),
                  })
                }
                className={cn(
                  isActive && "border-muted-foreground/60",
                  font.className,
                )}
              >
                Ag
              </Button>
            );
          })}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Mode</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => onChange({ ...value, mode: "light" })}
            className={cn(
              value.mode === "light" && "border-muted-foreground/60",
            )}
          >
            <SunIcon className="mr-1.5 -translate-x-1" />
            Light
          </Button>
          <Button
            variant="outline"
            onClick={() => onChange({ ...value, mode: "dark" })}
            className={cn(
              value.mode === "dark" && "border-muted-foreground/60",
            )}
          >
            <MoonIcon className="mr-1.5 -translate-x-1" />
            Dark
          </Button>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Preview</Label>
        <ThemeVizualizer config={value} />
      </div>
    </div>
  );
};

interface StyledButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  classNames?: string;
  style?: React.CSSProperties;
}

const StyledButton = ({
  onClick,
  isActive,
  children,
  classNames,
  style,
}: StyledButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "trasition h-full border bg-[--card] py-1.5 text-[--card-foreground] duration-200 hover:bg-[--card] hover:opacity-90",
        isActive && "border-[--primary]",
        !isActive && "border-[--border]",

        classNames,
      )}
      style={style}
    >
      {children}
    </Button>
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
        "trasition h-fit w-fit rounded-full py-1.5 text-[--card-foreground] duration-200 hover:bg-[--card] hover:opacity-90",
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
          "mr-1 flex size-7 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary] transition duration-200",
          isActive && "scale-110",
        )}
      >
        {isActive && <CheckIcon className="size-4 text-white" />}
      </span>
    </button>
  );
};

const ThemeVizualizer = ({ config }: { config: Config }) => {
  return (
    <ThemeWrapper
      config={config}
      className="flex h-32 w-full gap-3 rounded-md  border border-[--border] bg-[--background] px-3 py-5 text-[--card-foreground]"
    >
      <div className="flex h-full w-2/5 flex-col justify-center gap-0.5 rounded-md border border-[--border] bg-[--card] px-3">
        <div className="h-3 w-20 rounded-sm bg-[--muted]" />
        <div className="h-3 w-16 rounded-sm bg-[--muted]" />
        <div className="h-3 w-24 rounded-sm bg-[--muted]" />
        <div className="h-3 w-14 rounded-sm bg-[--muted]" />
        <div className="h-3 w-20 rounded-sm bg-[--muted]" />
      </div>
      <div className="flex w-3/5 flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold leading-5 text-[--accent-foreground]">
            Title
          </h1>
          <p className="text-sm leading-4 text-[--muted-foreground]">
            Description
          </p>
        </div>
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
