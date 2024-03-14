import { format } from "date-fns";

export const CalendarIcon = ({ date }: { date: Date }) => (
  <div className="h-11 w-11 rounded-md border border-primary/20">
    <div className="flex h-2/5 items-center justify-center rounded-t-md bg-primary-foreground text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
      {format(date, "MMM")}
    </div>
    <div className="flex h-3/5 items-center justify-center text-sm font-medium">
      {date.getDate()}
    </div>
  </div>
);
