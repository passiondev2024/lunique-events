import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type SelectButtonProps = {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectChange: (idx?: number) => void;
};

export const SelectButton = ({
  isSelected,
  setIsSelected,
  onSelectChange,
}: SelectButtonProps) => (
  <div
    onClick={() => onSelectChange()}
    className="flex h-10 cursor-pointer select-none items-center justify-center gap-1.5 rounded-full bg-primary/10 px-4 transition duration-200 hover:bg-primary/20 md:hover:scale-105"
  >
    <span className="text-xs font-bold uppercase text-primary">
      {isSelected ? "selected" : "select"}
    </span>
    <Checkbox.Root
      checked={isSelected}
      onCheckedChange={(c: boolean) => setIsSelected(c)}
      className="peer size-4 rounded-full border border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"
    >
      <Checkbox.Indicator className="flex items-center justify-center text-current">
        <CheckIcon className="size-3" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  </div>
);

type ChevronButtonProps = {
  side: "left" | "right";
  onAction: () => void;
};

export const ChevronButton = ({ side, onAction }: ChevronButtonProps) => {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      className={cn(
        "group absolute top-[calc(50%-256px)] z-20 flex h-64 w-12 translate-y-[50%] items-center justify-center transition duration-200 hover:bg-muted-foreground/10 md:w-20",
        side === "left" && "left-0 md:left-5",
        side === "right" && "right-0 md:right-5",
      )}
      onClick={onAction}
    >
      <Icon className="size-6 bg-clip-content text-primary transition duration-200 md:size-10 md:group-hover:scale-105" />
    </button>
  );
};

type ActionButtonProps = {
  Icon: LucideIcon;
  onAction: (idx?: number) => void;
};

export const ActionButton = ({ Icon, onAction }: ActionButtonProps) => (
  <button
    className="flex size-10 items-center justify-center rounded-full bg-primary/10 transition  duration-200 hover:bg-primary/20 md:hover:scale-105"
    onClick={() => onAction()}
  >
    <Icon className="size-4 text-primary" />
  </button>
);
