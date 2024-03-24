"use client";

import { useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-dialog";
import { GlobeIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
    <div className="relative">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="flex h-full w-24 flex-col justify-between gap-1.5 rounded-md border bg-muted px-3 py-1.5 transition duration-200 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 data-[state=open]:bg-muted-foreground/30">
          <GlobeIcon className="size-5 text-muted-foreground" />
          <span className="flex flex-col items-start">
            <span className="text-xs ">{value.value}</span>
            <span className="max-w-20 truncate text-xs text-muted-foreground">
              {value.city}
            </span>
          </span>
        </Popover.Trigger>

        <Popover.Overlay className="fixed inset-0 -top-3 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />

        <Popover.Content className="fixed left-1/2 top-0  z-50 w-full max-w-lg -translate-x-1/2 p-3 shadow-lg duration-200  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-left-1/2 sm:rounded-lg md:absolute md:left-[-354px] md:right-0 md:top-[90px] md:w-[450px]  md:translate-x-0  md:p-0 md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=closed]:slide-out-to-left-0 md:data-[state=open]:slide-in-from-bottom-0 md:data-[state=open]:slide-in-from-left-0">
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
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
