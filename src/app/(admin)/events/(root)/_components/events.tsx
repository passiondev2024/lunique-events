"use client";

import { useSearchParams } from "next/navigation";

import { RenderTimeframe } from "./render-events";

export type Timeframe = "upcoming" | "past";

export const Events = () => {
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("tab") ?? "";

  return <RenderTimeframe timeframe={timeframe as Timeframe} />;
};
