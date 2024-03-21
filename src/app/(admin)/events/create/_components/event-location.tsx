"use client";

import React, { type HTMLAttributes, useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-dialog";
import { type Libraries, useLoadScript } from "@react-google-maps/api";
import { MapPinIcon, SearchIcon, VideoIcon, XIcon } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { type Place } from "@/types";

import { LocationMap } from "./location-map";

const libraries: Libraries = ["places"];

interface EventLocationProps {
  value: Place | null | undefined;
  onChange: (place: Place | null) => void;
}

export const EventLocation = ({ value, onChange }: EventLocationProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger
            type="button"
            className="w-full rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30"
          >
            <span className="flex flex-col items-start">
              <span className="flex items-center gap-3 md:gap-5">
                <MapPinIcon className="size-4 text-muted-foreground md:size-5" />
                <span className="text-lg font-medium">
                  {value ? value.mainText : "Add Event Location"}
                </span>
              </span>
              <span className="pl-7 text-sm text-muted-foreground md:pl-9">
                {value
                  ? value.secondaryText
                  : "Offline location or virtual link"}
              </span>
            </span>
          </Popover.Trigger>

          <Popover.Overlay className="fixed inset-0 -top-3 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />

          <Popover.Content className="fixed left-1/2  top-0 z-50 w-full max-w-lg -translate-x-1/2 p-3 duration-200  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-left-1/2 sm:rounded-lg md:absolute md:left-0 md:top-16  md:w-full md:max-w-full md:translate-x-0 md:p-0 md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=closed]:slide-out-to-left-0 md:data-[state=open]:slide-in-from-bottom-0 md:data-[state=open]:slide-in-from-left-0">
            {isLoaded && (
              <PlacesAutocomplete setOpen={setOpen} onChange={onChange} />
            )}
          </Popover.Content>
        </Popover.Root>

        {value && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => onChange(null)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted-foreground/30"
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      {value && <LocationMap position={value.position} />}
    </div>
  );
};

const PlacesAutocomplete = (props: {
  onChange: (place: Place) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { onChange, setOpen } = props;

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  const onSelect = useCallback(
    async (value: string) => {
      const place = data.find((item) => item.place_id === value);
      if (!place) return;

      const results = await getGeocode({ placeId: value });

      if (!results[0]) return;

      const position = getLatLng(results[0]);

      onChange({
        placeId: place.place_id,
        descripton: place.description,
        mainText: place.structured_formatting.main_text,
        secondaryText: place.structured_formatting.secondary_text,
        position,
      });
      setOpen(false);
    },
    [onChange, data, setOpen],
  );

  const isResultOpen = !!status;

  return (
    <div>
      <AutocompleteInput
        value={value}
        onValueChange={setValue}
        disabled={!ready}
        placeholder="Enter location..."
      />

      <AutocompleteResult>
        {isResultOpen && status === "OK" && (
          <AutocompleteResultGroup heading="Locations">
            {data.map(({ place_id, description }) => (
              <AutocompleteResultItem
                key={place_id}
                value={place_id}
                onSelect={onSelect}
              >
                <MapPinIcon className="mr-1.5 size-4 min-w-fit" />
                {description}
              </AutocompleteResultItem>
            ))}
          </AutocompleteResultGroup>
        )}
        {isResultOpen && status === "ZERO_RESULTS" && (
          <AutocompleteResultEmpty />
        )}
        {!isResultOpen && (
          <>
            <AutocompleteResultGroup heading="Recent Locations">
              <p className="px-3 text-sm text-muted-foreground">
                No recently used locations.
              </p>
            </AutocompleteResultGroup>
            <AutocompleteResultGroup heading="Virtual Options">
              <AutocompleteResultItem
                value=""
                onSelect={() => alert("Create Zoom meeting")}
              >
                <VideoIcon className="mr-1.5 size-4" />
                Create Zoom meeting
              </AutocompleteResultItem>
              <AutocompleteResultItem
                value=""
                onSelect={() => alert("Create Zoom meeting")}
              >
                <VideoIcon className="mr-1.5 size-4" />
                Select existing Zoom
              </AutocompleteResultItem>
            </AutocompleteResultGroup>
          </>
        )}
      </AutocompleteResult>
    </div>
  );
};

interface AutocompleteInputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const AutocompleteInput = ({
  value,
  onValueChange,
  className,
  disabled,
  placeholder,
  ...props
}: AutocompleteInputProps) => {
  return (
    <span className="relative">
      <Input
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-10 rounded-b-none bg-background pl-10 focus-visible:ring-0",
          className,
        )}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      />
      <div className="absolute left-0 top-0 flex size-10 items-center justify-center">
        <SearchIcon className="size-4" />
      </div>
    </span>
  );
};

const AutocompleteResultEmpty = () => (
  <div className="px-3 py-2 text-sm text-muted-foreground">
    Looks like there is no results. Try again with different terms.
  </div>
);

interface AutocompleteResultProps {
  children: React.ReactNode;
}

const AutocompleteResult = (props: AutocompleteResultProps) => (
  <div className="space-y-1.5 rounded-b-md border border-t-0 bg-background p-1.5">
    {props.children}
  </div>
);

interface AutocompleteResultGroupProps {
  heading?: string;
  children?: React.ReactNode;
}

const AutocompleteResultGroup = (props: AutocompleteResultGroupProps) => (
  <div>
    {props.heading && (
      <p className="px-3 py-2 text-sm font-semibold text-muted-foreground">
        {props.heading}
      </p>
    )}
    <div>{props.children}</div>
  </div>
);

interface AutocompleteResultItemProps {
  value: string;
  onSelect: (value: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const AutocompleteResultItem = (props: AutocompleteResultItemProps) => {
  const { value, onSelect, disabled } = props;

  return (
    <Button
      type="button"
      disabled={disabled}
      variant="ghost"
      onClick={() => onSelect(value)}
      className="flex w-full items-center justify-start px-3 hover:bg-accent/50"
    >
      {props.children}
    </Button>
  );
};
