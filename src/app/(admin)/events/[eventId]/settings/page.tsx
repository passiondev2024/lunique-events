import { EditEventForm } from "@/components/forms/edit-event-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { events } from "@/lib/data";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

export default function EventSettingsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const eventId = Number(params.eventId);
  const event = events[eventId - 1];

  return (
    <div className="space-y-5 pb-20 md:space-y-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-0">
        <header>
          <h1 className="text-2xl font-bold md:text-4xl">{event?.name}</h1>
          <div className="flex flex-col md:flex-row md:gap-3">
            {event?.date && (
              <p className="text-zinc-500 md:text-xl">
                {format(event.date, "do MMMM, yyy")}
              </p>
            )}
            {event?.location && (
              <p className="text-zinc-500 md:text-xl">@{event.location}</p>
            )}
          </div>
        </header>
      </div>
      <div className="space-y-5">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Event Info</CardTitle>
            <CardDescription>
              This is the details of your event.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-lg py-5">
            <EditEventForm id={eventId} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              This is the configuration for your gallery.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 py-5">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-lg font-medium">Make the gallery public</p>
                <p className="text-sm text-zinc-500">
                  Allow anyone to view your gallery. Turing this off will make
                  your gallery not accessible to anyone.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-lg font-medium">
                  Hide Better Event branding{" "}
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <p className="text-sm text-zinc-500">
                  Hide &quot;Made with Better Event&quot; badge in your gallery.
                </p>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription className="text-destructive/80">
              Deleting this event will remove all data associated with it. This
              action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-lg">
            <Button variant="destructive">
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
