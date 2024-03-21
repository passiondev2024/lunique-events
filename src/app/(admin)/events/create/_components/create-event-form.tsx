"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { EventApproval } from "./event-approval";
import { CalendarSelect } from "./event-calendar-select";
import { EventCapacity } from "./event-capacity";
import { EventDateTime } from "./event-date-time";
import { EventDescription } from "./event-description";
import { EventLocation } from "./event-location";
import { EventTheme } from "./event-theme";
import { EventTickets } from "./event-tickets";
import { EventTimezone } from "./event-timezone";
import { VisibilitySelect } from "./event-visibility-select";
import { ImageUpload } from "./image-upload";
import { defaultValues, type EventSchema, eventSchema } from "./validation";

export const CreateEventForm = () => {
  const methods = useForm<EventSchema>({
    defaultValues,
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventSchema) => {
    console.log({ data });
  };
  const onErrors = (errors: unknown) => {
    alert(JSON.stringify(errors));
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit, onErrors)}
      className="w-full space-y-5 md:flex md:flex-1 md:gap-5"
    >
      <div className="space-y-3 md:col-span-1 md:flex-1">
        <Controller
          control={methods.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={methods.control}
          name="theme"
          render={({ field }) => (
            <EventTheme value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="space-y-3 md:w-3/5">
        <div className="flex justify-between">
          <CalendarSelect />

          <Controller
            control={methods.control}
            name="public"
            render={({ field }) => (
              <VisibilitySelect value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <Input
          className="h-12 border-none text-4xl font-medium focus-visible:ring-0"
          placeholder="Event name"
          {...methods.register("name")}
        />

        <div className="flex gap-2">
          <div className="flex-1 rounded-md bg-muted p-1">
            <div className="flex h-full flex-col gap-1">
              <div className="flex items-center">
                <Label className="w-24 px-5 md:w-32">Start</Label>
                <Controller
                  control={methods.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <EventDateTime
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center">
                <Label className="w-24 px-5 md:w-32">End</Label>
                <Controller
                  control={methods.control}
                  name="endDateTime"
                  render={({ field }) => (
                    <EventDateTime
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <Controller
            control={methods.control}
            name="timezone"
            render={({ field }) => (
              <EventTimezone value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <Controller
          control={methods.control}
          name="location"
          render={({ field }) => (
            <EventLocation value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={methods.control}
          name="description"
          render={({ field }) => (
            <EventDescription value={field.value} onChange={field.onChange} />
          )}
        />

        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-muted-foreground">
            Event Options
          </p>
          <div className="rounded-md bg-muted ">
            <Controller
              control={methods.control}
              name="tickets"
              render={({ field }) => (
                <EventTickets value={field.value} onChange={field.onChange} />
              )}
            />
            <div className="h-0.5 w-full bg-background" />
            <Controller
              control={methods.control}
              name="requireApproval"
              render={({ field }) => (
                <EventApproval value={field.value} onChange={field.onChange} />
              )}
            />
            <div className="h-0.5 w-full bg-background" />
            <Controller
              control={methods.control}
              name="capacity"
              render={({ field }) => (
                <EventCapacity value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </div>
    </form>
  );
};
