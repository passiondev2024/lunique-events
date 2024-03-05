import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { type Image } from "@prisma/client";
import { TrashIcon } from "lucide-react";

interface ControlBarProps {
  selected: Image[];
  isSelectMode: boolean;
  max: number;
  setIsSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const ControlBar = ({
  max,
  isSelectMode,
  selected,
  setIsSelectMode,
  onSelectAll,
  onDeselectAll,
}: ControlBarProps) => {
  return (
    <div className="bg-transaprent flex h-8 w-full items-center rounded-lg border">
      <div className="flex h-full w-full items-center">
        <div className="flex h-full items-center border-r-2 border-primary-foreground px-3">
          <Checkbox
            disabled={!isSelectMode}
            className="border-primary data-[checked=true]:opacity-50"
            onCheckedChange={(checked) => {
              if (checked) onSelectAll();
              else onDeselectAll();
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3 pl-3">
          <p className="text-[10px] text-primary md:text-xs">
            {selected.length} of {max} selected
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <p
                className={cn(
                  "text-xs font-medium md:font-semibold",
                  isSelectMode ? "text-primary/60" : "text-primary",
                )}
              >
                PREVIEW
              </p>
              <Switch
                checked={isSelectMode}
                onCheckedChange={setIsSelectMode}
              />
              <p
                className={cn(
                  "text-xs font-medium md:font-semibold",
                  isSelectMode ? "text-primary" : "text-primary/60",
                )}
              >
                SELECT
              </p>
              <OpenModalButton
                disabled={selected.length === 0}
                className="h-8 bg-transparent text-primary shadow-none hover:bg-primary/10 data-[disabled=true]:opacity-50"
                modalType="delete-event-images"
                modalData={{ galleryImages: selected }}
              >
                <TrashIcon className="h-5 w-5 " />
              </OpenModalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
