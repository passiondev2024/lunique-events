import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";

interface EventBannerProps {
  name: string;
  date: Date;
  location: string;
  owner: string;
  url: string;
}

export const EventBanner = (props: EventBannerProps) => (
  <div className="flex h-full w-full flex-col items-center gap-3 text-primary">
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{props.name}</CardTitle>
        {props.owner && (
          <CardDescription className="w-full">
            Hosted by {props.owner}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-5 pb-10">
        <div className="flex items-center gap-3">
          <CalendarIcon date={props.date} />
          <div className="flex flex-col text-xl font-medium">
            <span>{format(props.date, "eeee, d MMMM")}</span>
            <span className="text-sm text-muted-foreground">
              {props.date.getFullYear()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md border">
            <MapPinIcon />
          </div>
          <div>
            <p className="text-xl font-medium">{props.location}</p>
            <span className="text-sm text-muted-foreground">
              {props.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

interface CalendarIconProps {
  date: Date;
}

const CalendarIcon = ({ date }: CalendarIconProps) => (
  <div className="h-11 w-11 rounded-md border">
    <div className="flex h-2/5 items-center justify-center bg-primary-foreground text-[10px] font-medium uppercase tracking-widest">
      {format(date, "MMM")}
    </div>
    <div className="flex h-3/5 items-center justify-center text-sm font-medium">
      {date.getDate()}
    </div>
  </div>
);
