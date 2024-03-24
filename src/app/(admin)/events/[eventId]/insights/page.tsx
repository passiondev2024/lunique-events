import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { EventFeedback } from "./_components/event-feedback";
import { SelectPeriod } from "./_components/select-period";
import { ViewsDetails } from "./_components/views-details";
import ViewsGraph from "./_components/views-graph";

export default function EventInsightsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold capitalize">Page Views</h1>
          <p className="text-base text-primary/50">
            See recent page views of the event page.
          </p>
        </div>
        <SelectPeriod />
      </div>
      <Card className="overflow-hidden pt-4">
        <ViewsGraph />
        <Separator />
        <CardFooter className="flex bg-muted/50 p-4">
          <ViewsDetails />
        </CardFooter>
      </Card>
      <Separator />
      <EventFeedback />
    </div>
  );
}
