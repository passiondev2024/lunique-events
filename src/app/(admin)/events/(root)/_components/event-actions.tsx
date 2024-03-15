"use client";

import { useEffect } from "react";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { paths } from "@/routes/paths";

import { EventTimeframeTabs } from "./event-date-tabs";
import { type Timeframe } from "./events";

const timeframes: Timeframe[] = ["upcoming", "past"];

export const EventActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("tab");

  useEffect(() => {
    if (timeframe && timeframes.includes(timeframe as Timeframe)) return;

    const query = new URLSearchParams();
    query.set("tab", "upcoming");
    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [timeframe, pathname, router]);

  const onValueChange = (value: Timeframe) => {
    const query = new URLSearchParams();
    query.set("tab", value);
    router.push(`${pathname}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
      <h1 className="hidden px-1.5 text-lg font-semibold md:block md:text-2xl">
        Events
      </h1>

      <div className="flex flex-row-reverse justify-between gap-3 md:flex-row">
        <Link
          href={paths.events.create}
          className={buttonVariants({ variant: "ghost" })}
        >
          Create Event <PlusCircleIcon className="ml-1.5 size-4" />
        </Link>
        <EventTimeframeTabs
          value={timeframe as Timeframe}
          onValueChange={onValueChange}
        />
      </div>
    </div>
  );
};
