"use client";

import { RenderTimeframe } from "./render-events";
import { useSearchParams } from "next/navigation";

export type Timeframe = "upcoming" | "past";

export const Events = () => {
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("tab") ?? "";

  return <RenderTimeframe timeframe={timeframe as Timeframe} />;
};
