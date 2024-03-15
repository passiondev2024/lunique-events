import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const EventOptionButton = (props: {
  Icon: LucideIcon;
  isActive: boolean;
  activeColorClass: string;
  title: string;
  slot: React.ReactNode;
  onClick?: () => void;
}) => {
  const { Icon } = props;
  const { title, slot, activeColorClass, isActive } = props;
  const { onClick } = props;

  return (
    <div
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 px-3.5 py-2"
    >
      <span className="flex items-center gap-3">
        <Icon
          className={cn(
            "h-4 w-4 text-muted-foreground",
            isActive && activeColorClass,
          )}
        />
        <span>{title}</span>
      </span>
      <span>{slot}</span>
    </div>
  );
};
