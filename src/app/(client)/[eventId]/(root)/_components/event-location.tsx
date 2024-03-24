import { EventSection } from "./event-section";
import { LocationMap } from "./location-map";

export const EventLocation = () => {
  return (
    <EventSection heading="Location">
      <div>
        <p className="font-medium">Obiliceva 51</p>
        <p className="text-sm text-muted-foreground">Pirot 18300, Serbia</p>
      </div>
      <LocationMap position={{ lat: 44.7971328, lng: 20.4537856 }} />
    </EventSection>
  );
};
