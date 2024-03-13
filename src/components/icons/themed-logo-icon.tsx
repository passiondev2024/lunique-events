"use client";

import lightLogo from "@/public/images/logo-light.webp";
import darkLogo from "@/public/images/logo-dark.webp";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ThemedLogoIcon = () => {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState(lightLogo.src);

  useEffect(() => {
    const logoSrc = resolvedTheme === "light" ? darkLogo.src : lightLogo.src;
    setSrc(logoSrc);
  }, [resolvedTheme]);

  return (
    <Image
      alt="Lunique Events Logo"
      src={src}
      width={120}
      height={30}
      className="w-24 object-contain"
    />
  );
};
