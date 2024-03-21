"use client";

import { fonts } from "@/lib/fonts";
import { type Theme, themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

import { type Config } from "./event-theme";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  config: Config;
  defaultTheme?: string;
}

const createCSSVariables = (
  theme: Theme,
  mode: "light" | "dark" | "system",
) => {
  const variables: Record<string, string> = {};

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries(theme.cssVars[mode]).forEach(([key, value]) => {
    const name = `--${key}`;

    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    variables[name] = `hsl(${value})`;
  });

  variables["--radius"] = "0.5rem";

  return variables;
};

export function ThemeWrapper({
  children,
  config,
  className,
}: ThemeWrapperProps) {
  const theme = themes.find((item) => item.name === config.theme) ?? themes[0];

  const font =
    fonts.find(
      (item) => item.name.toLowerCase() === config.font.toLowerCase(),
    ) ?? fonts[0];

  return (
    <div
      style={createCSSVariables(theme, config.mode) as React.CSSProperties}
      className={cn(className, font?.className)}
    >
      {children}
    </div>
  );
}
