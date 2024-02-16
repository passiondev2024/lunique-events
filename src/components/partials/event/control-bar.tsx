import { CustomSwitch } from "@/components/buttons/custom-switch";
import { OpenModalButton } from "@/components/buttons/open-modal-button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Image } from "@prisma/client";
import { TrashIcon } from "lucide-react";

interface ControlBarProps {
  selectedImages: Image[];
  isSelectMode: boolean;
  setIsSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCount: number;
  max: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export const ControlBar = ({
  selectedCount,
  max,
  selectedImages,
  isSelectMode,
  setIsSelectMode,
  onSelectAll,
  onDeselectAll,
}: ControlBarProps) => {
  return (
    <div className="flex h-8 w-full items-center rounded-lg bg-primary">
      <div className="flex h-full w-full items-center">
        <div className="flex h-full items-center border-r-2 border-primary-foreground px-3">
          <Checkbox
            disabled={!isSelectMode}
            className=" border-primary-foreground data-[checked=true]:opacity-50"
            onCheckedChange={(checked) => {
              if (checked) onSelectAll();
              else onDeselectAll();
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3 pl-3">
          <p className="text-xs text-primary-foreground">
            {selectedCount} of {max} selected
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <p
                className={cn(
                  "text-xs font-bold",
                  isSelectMode
                    ? "text-primary-foreground/40"
                    : "text-primary-foreground",
                )}
              >
                PREVIEW
              </p>
              <CustomSwitch
                checked={isSelectMode}
                onCheckedChange={setIsSelectMode}
              />
              <p
                className={cn(
                  "text-xs font-bold",
                  isSelectMode
                    ? "text-primary-foreground"
                    : "text-primary-foreground/40",
                )}
              >
                SELECT
              </p>
              <OpenModalButton
                disabled={!isSelectMode || selectedCount === 0}
                className="h-8 px-3 text-white data-[disabled=true]:opacity-50"
                modalType="delete-event-images"
                modalData={{ galleryImages: selectedImages }}
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
