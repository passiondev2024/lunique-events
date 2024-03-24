import { EventSection } from "./event-section";

const GOING = 2 as const;

export const EventGuests = () => {
  return (
    <EventSection heading={`${GOING} Going`}>
      <div className="text-sm">Nikola Mladenovic and Luka Stojadinovic</div>
    </EventSection>
  );
};
