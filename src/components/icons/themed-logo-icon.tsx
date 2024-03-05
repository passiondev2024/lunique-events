"use client";
import lightLogo from "@/public/images/Events-lightLogo.png";
import darkLogo from "@/public/images/Events-darkLogo.png";
import { useTheme } from "next-themes";
export const ThemedLogoIcon = () => {
  const { theme } = useTheme();
  return (
    // eslint-disable-next-line
    <img
      src={
        theme === "light"
          ? darkLogo.src
          : theme === "dark"
          ? lightLogo.src
          : lightLogo.src
      }
      width={150}
    />
  );
};
