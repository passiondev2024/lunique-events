import React from "react";
import { Label } from "@radix-ui/react-label";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { fonts } from "@/lib/fonts";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

import { type Config } from "./event-theme";

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
        <div className="grid grid-cols-3 gap-2">
          {themes.map((theme) => {
            const isActive = value.theme === theme.name;

            return (
              <StyledButton
                key={theme.name}
                onClick={() => {
                  onChange({
                    ...value,
                    theme: theme.name,
                  });
                }}
                isActive={isActive}
                classNames="text-sm"
                style={
                  {
                    "--theme-primary": `hsl(${
                      theme?.activeColor[mode === "dark" ? "dark" : "light"]
                    })`,
                  } as React.CSSProperties
                }
              >
                <span
                  className={cn(
                    "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
                  )}
                >
                  {isActive && <CheckIcon className="size-4 text-white" />}
                </span>
                {theme.label}
              </StyledButton>
            );
          })}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Font</Label>
        <div className="grid grid-cols-3 gap-2 ">
          {fonts.map((font) => {
            const isActive = font.name.toLocaleLowerCase() === value.font;

            return (
              <StyledButton
                key={font.name}
                onClick={() =>
                  onChange({
                    ...value,
                    font: font.name.toLocaleLowerCase(),
                  })
                }
                isActive={isActive}
                classNames={font.className}
              >
                {font.name}
              </StyledButton>
            );
          })}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Mode</Label>
        <div className="grid grid-cols-2 gap-2">
          <StyledButton
            onClick={() => onChange({ ...value, mode: "light" })}
            isActive={value.mode === "light"}
            classNames="text-sm"
          >
            <SunIcon className="mr-1.5 -translate-x-1" />
            Light
          </StyledButton>
          <StyledButton
            onClick={() => onChange({ ...value, mode: "dark" })}
            isActive={value.mode === "dark"}
            classNames="text-sm"
          >
            <MoonIcon className="mr-1.5 -translate-x-1" />
            Dark
          </StyledButton>
        </div>
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
        "trasition h-full border  bg-[--card] py-3 text-xl text-[--card-foreground] duration-200 hover:bg-[--card] hover:opacity-90",
        isActive &&
          "border-[--primary] text-[--primary] hover:text-[--primary]",
        !isActive && "border-[--border]",

        classNames,
      )}
      style={style}
    >
      {children}
    </Button>
  );
};
