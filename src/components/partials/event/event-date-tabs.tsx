import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";

export type EventDate = "upcoming" | "past";

interface EventDateTabsProps {
  value: EventDate;
  onValueChange: (value: EventDate) => void;
}

export const EventTimeframeTabs = ({
  value,
  onValueChange,
}: EventDateTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange(value as EventDate)}
    >
      <TabsList>
        <TabsTrigger value="upcoming" className="w-24">
          Upcoming
        </TabsTrigger>

        <TabsTrigger value="past" className="w-24">
          Past
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
