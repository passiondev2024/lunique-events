"use client";

import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { times } from "@/lib/times";

import { type EventSchema } from "./validation";

type DateTime = EventSchema["startDateTime"];

interface EventDateProps {
  value: DateTime;
  onChange: (value: DateTime) => void;
}

export const EventDateTime = ({ value, onChange }: EventDateProps) => {
  const onDateChange = (date: Date) => {
    onChange({
      time: value.time,
      date: date,
    });
  };

  const onTimeChange = (time: string) => {
    onChange({
      time: time,
      date: value.date,
    });
  };

  return (
    <div className="flex size-full items-center justify-between rounded-md bg-muted-foreground/20 font-light">
      <span className="flex h-full flex-1 justify-center">
        <DatePicker value={value.date} onChange={onDateChange} />
      </span>
      <span className="h-full w-14 border-l-2 border-muted text-center md:w-20 ">
        <TimePicker value={value.time} onChange={onTimeChange} />
      </span>
    </div>
  );
};

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const onSelect = (date: Date | undefined) => {
    if (!date) return;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = zonedTimeToUtc(date, timezone);

    onChange(utcDate);
  };

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="size-full rounded-l-md text-sm focus-visible:ring-0 data-[state=open]:bg-muted-foreground/30 md:text-base"
        >
          {value ? format(value, "iii do, yyyy") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="my-1.5 w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        icon={false}
        className="flex size-full items-center justify-center rounded-l-none border-none bg-transparent p-0 text-sm shadow-none focus:ring-0 data-[state=open]:bg-muted-foreground/30 md:text-base"
      >
        {value}
      </SelectTrigger>

      <SelectContent
        className="max-h-52 min-w-fit"
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        {times.map((time, idx) => (
          <SelectItem
            key={idx}
            icon={false}
            value={time}
            className="flex w-full justify-center"
          >
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
