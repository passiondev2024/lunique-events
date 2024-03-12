"use client";

import { useState } from "react";
import { EventTimeframeTabs } from "./event-date-tabs";
import { RenderTimeframe } from "./render-events";

export type Timeframe = "upcoming" | "past";

export const Events = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("upcoming");

  return (
    <div className="space-y-3 md:space-y-5">
      <EventTimeframeTabs value={timeframe} onValueChange={setTimeframe} />
      <RenderTimeframe timeframe={timeframe} />
    </div>
  );

  return null;
};
