"use client";

import React from "react";
import {
  AppWindowIcon,
  ArrowUpToLineIcon,
  CircleIcon,
  GlobeIcon,
  ImagePlusIcon,
  MapPinIcon,
  NewspaperIcon,
  Pencil,
  PenIcon,
  TicketIcon,
  UserCheckIcon,
} from "lucide-react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/hooks/use-modal-store";
import thumbImage from "@/public/images/placeholder.jpg";

import { CalendarSelect } from "./_components/event-calendar-select";
import { EventOptionButton } from "./_components/event-option-button";
import { VisibilitySelect } from "./_components/event-visibility-select";

export default function CreateEventPage() {
  const { onOpen } = useModal();

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-3 pb-10 md:flex  md:space-x-8 md:space-y-0 ">
      <div className="w-full space-y-5 md:flex-1">
        <div className="relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={thumbImage}
              fill
              alt=""
              className="w-full rounded-xl object-cover"
            />
          </AspectRatio>
          <Button
            variant="secondary"
            onClick={() => onOpen("choose-event-thumbnail")}
            className="absolute bottom-3 right-3 size-10 rounded-full p-0"
          >
            <ImagePlusIcon className="h-5" />
          </Button>
        </div>

        <button className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30">
          <span className="flex items-center gap-3">
            <AppWindowIcon className="size-12 text-muted-foreground" />
            <span className="flex flex-col items-start gap-0.5">
              <span className="text-xs text-muted-foreground">Theme</span>
              <span className="font-medium">Minimal</span>
            </span>
          </span>
          <PenIcon className="size-5" />
        </button>
      </div>

      <div className="space-y-5 md:w-3/5">
        <div className="flex justify-between">
          <CalendarSelect />
          <VisibilitySelect />
        </div>

        <Input
          className="h-12 border-none text-4xl font-medium focus-visible:ring-0"
          placeholder="Event name"
        />

        <div className="flex gap-2">
          <div className="flex-1 rounded-md bg-muted p-1">
            <div className="flex h-full justify-between ">
              <div className="flex">
                <div className="flex h-full flex-col items-center p-3 py-2.5">
                  <CircleIcon className="size-3 rounded-full bg-muted-foreground/80 text-muted-foreground/80" />
                  <div className="flex-1 border-r border-dashed border-muted-foreground/50" />
                  <CircleIcon className="size-3 text-muted-foreground/80" />
                </div>
                <div className="flex flex-col justify-between py-1.5 font-light">
                  <span className="text-sm md:text-base">Start</span>
                  <span className="text-sm md:text-base">End</span>
                </div>
              </div>
              <div className="flex h-full w-44 flex-col gap-1 md:w-60">
                <div className="flex h-full items-center justify-between rounded-md bg-muted-foreground/20 font-light">
                  <span className="px-2 py-1">Wed 6, Mar</span>
                  <span className="h-full w-16 border-l-2 border-muted py-1 text-center md:w-20 ">
                    11:30
                  </span>
                </div>
                <div className="flex h-full items-center justify-between rounded-md bg-muted-foreground/20 font-light">
                  <span className="px-2 py-1">Wed 20, Mar</span>
                  <span className="h-full w-16 border-l-2 border-muted py-1 text-center md:w-20 ">
                    12:30
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-24 flex-col justify-between gap-1.5 rounded-md bg-muted px-3 py-1.5">
            <GlobeIcon className="size-5 text-muted-foreground md:size-6" />
            <div className="flex flex-col">
              <span className="text-xs md:text-sm">GMT+01:00</span>
              <span className="text-xs text-muted-foreground md:text-sm">
                Belgrade
              </span>
            </div>
          </div>
        </div>

        <div>
          <button className="w-full rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30">
            <span className="flex flex-col items-start">
              <span className="flex items-center gap-3 md:gap-5">
                <MapPinIcon className="size-4 text-muted-foreground md:size-5" />
                <span className="text-lg font-medium">Add Event Location</span>
              </span>
              <span className="pl-7 text-sm text-muted-foreground md:pl-9">
                Offline location or virtual link
              </span>
            </span>
          </button>
        </div>

        <div>
          <button className="flex w-full items-center gap-3 rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 md:gap-5">
            <NewspaperIcon className="size-4 text-muted-foreground md:size-5" />
            <span className="text-lg font-medium">Add Description</span>
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Event Options
          </p>
          <div className="rounded-md bg-muted ">
            <EventOptionButton
              title="Tickets"
              activeColorClass="text-[#47C87F]"
              isActive={false}
              Icon={TicketIcon}
              onClick={() => alert("Tickets clicked")}
              slot={
                <span className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Free</span>
                  <Pencil className="size-4 text-muted-foreground" />
                </span>
              }
            />
            <div className="h-0.5 w-full bg-background" />
            <EventOptionButton
              title="Require approval"
              Icon={UserCheckIcon}
              isActive={true}
              activeColorClass="text-[#D77F48]"
              slot={
                <Switch className="focus-visible:ring-0 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-muted-foreground" />
              }
            />
            <div className="h-0.5 w-full bg-background" />
            <EventOptionButton
              title="Capacity"
              Icon={ArrowUpToLineIcon}
              isActive={true}
              activeColorClass="text-[#B596FF]"
              onClick={() => alert("Tickets clicked")}
              slot={
                <span className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">Unlimited</span>
                  <Pencil className="size-4 text-muted-foreground" />
                </span>
              }
            />
          </div>
        </div>

        <Button size="lg" className="w-full">
          Create Event
        </Button>
      </div>
    </div>
  );
}
