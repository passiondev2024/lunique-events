import { EditEventForm } from "@/components/forms/edit-event-form";
import { EventSettingsForm } from "@/components/forms/event-settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type EventSettings, type Event } from "@prisma/client";
import { DeleteEventControl } from "./delete-event-control";

interface EditEventInfo {
  event: Event;
}

export const EditEventInfo = ({ event }: EditEventInfo) => (
  <Card>
    <CardHeader className="border-b">
      <CardTitle>Event Info</CardTitle>
      <CardDescription>This is the details of your event.</CardDescription>
    </CardHeader>
    <CardContent className="max-w-lg py-5">
      <EditEventForm event={event} />
    </CardContent>
  </Card>
);

interface EventGalleryConfig {
  settings: EventSettings;
}

// TODO: create gallery config form

// eslint-disable-next-line
export const EventGalleryConfig = ({ settings }: EventGalleryConfig) => (
  <Card>
    <CardHeader className="border-b">
      <CardTitle>Configuration</CardTitle>
      <CardDescription>
        This is the configuration for your gallery.
      </CardDescription>
    </CardHeader>
    <CardContent className="py-5">
      <EventSettingsForm settings={settings} />
    </CardContent>
  </Card>
);

interface DeleteEventProps {
  eventId: string;
}
export const DeleteEvent = ({ eventId }: DeleteEventProps) => {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription className="text-destructive/80">
          Deleting this event will remove all data associated with it. This
          action cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-lg">
        <DeleteEventControl eventId={eventId} />
      </CardContent>
    </Card>
  );
};
