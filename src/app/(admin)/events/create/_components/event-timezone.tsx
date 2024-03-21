"use client";

import { useCallback, useState } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { GlobeIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { timezones } from "@/lib/timezones";

import { type Timezone } from "./validation";

interface EventTimezoneProps {
  value: Timezone;
  onChange: (value: Timezone) => void;
}

export const EventTimezone = ({ value, onChange }: EventTimezoneProps) => {
  const [open, setOpen] = useState(false);

  const onSelect = useCallback(
    (value: string) => {
      const timezone = timezones.find(
        (timezone) => String(timezone.id) === value,
      );
      if (!timezone) return;

      onChange(timezone);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-24 flex-col justify-between gap-1.5 rounded-md bg-muted px-3 py-1.5 data-[state=open]:bg-muted-foreground/30"
        >
          <GlobeIcon className="size-5 text-muted-foreground" />
          <span className="flex flex-col items-start">
            <span className="text-xs ">{value.value}</span>
            <span className="max-w-20 truncate text-xs text-muted-foreground">
              {value.city}
            </span>
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[calc(100vw-24px)] p-0 md:w-full"
        align="end"
      >
        <Command>
          <CommandInput placeholder="Search timezone..." className="h-9" />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>

            <CommandGroup>
              {timezones.map((timezone) => (
                <CommandItem
                  key={timezone.id}
                  value={String(timezone.id)}
                  keywords={[timezone.label, timezone.value, timezone.city]}
                  onSelect={onSelect}
                  className="flex items-center justify-between"
                >
                  <p className="truncate text-sm">{timezone.label}</p>
                  <p className="w-28 text-right text-xs text-muted-foreground md:text-sm">
                    {timezone.value}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
