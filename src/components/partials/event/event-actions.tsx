"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EventTimeframeTabs } from "./event-date-tabs";
import { type Timeframe } from "./events";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PlusCircleIcon } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

const timeframes: Timeframe[] = ["upcoming", "past"];

export const EventActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("tab");

  const { onOpen } = useModal();

  useEffect(() => {
    if (timeframe && timeframes.includes(timeframe as Timeframe)) return;

    const query = new URLSearchParams();
    query.set("tab", "upcoming");
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  }, [timeframe, pathname, router]);

  const onValueChange = (value: Timeframe) => {
    const query = new URLSearchParams();
    query.set("tab", value);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <h1 className="text-xl font-semibold md:text-4xl">Events</h1>

      <div className="flex flex-row-reverse justify-between gap-3 md:flex-row">
        <Button variant="ghost" onClick={() => onOpen("create-event")}>
          Create Event <PlusCircleIcon className="ml-1.5 h-4 w-4" />
        </Button>
        <EventTimeframeTabs
          value={timeframe as Timeframe}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
};
