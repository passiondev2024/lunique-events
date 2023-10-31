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
import { Trash2Icon } from "lucide-react";

interface EditEventInfo {
  eventId: number;
}

export const EditEventInfo = ({ eventId }: EditEventInfo) => (
  <Card>
    <CardHeader className="border-b">
      <CardTitle>Event Info</CardTitle>
      <CardDescription>This is the details of your event.</CardDescription>
    </CardHeader>
    <CardContent className="max-w-lg py-5">
      <EditEventForm id={eventId} />
    </CardContent>
  </Card>
);

export const EventGalleryConfig = () => (
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
            Allow anyone to view your gallery. Turing this off will make your
            gallery not accessible to anyone.
          </p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-lg font-medium">
            Hide Better Event
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
);

export const DeleteEvent = () => (
  <Card className="border-destructive/50">
    <CardHeader>
      <CardTitle className="text-destructive">Danger Zone</CardTitle>
      <CardDescription className="text-destructive/80">
        Deleting this event will remove all data associated with it. This action
        cannot be undone.
      </CardDescription>
    </CardHeader>
    <CardContent className="max-w-lg">
      <Button variant="destructive">
        <Trash2Icon className="mr-1.5 h-4 w-4" />
        Delete
      </Button>
    </CardContent>
  </Card>
);
