"use client";

import { DownloadIcon, ExternalLinkIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GuestListActions = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Guest List</h1>
        <div className="flex space-x-2 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => alert("download")}
                className="flex size-7 h-7 place-content-center items-center rounded   bg-secondary p-0 text-primary hover:bg-muted/50"
              >
                <DownloadIcon className="size-4 text-primary/60" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => alert("open full table")}
                className="flex size-7 h-7  place-content-center   items-center rounded bg-secondary p-0 text-primary hover:bg-muted/50"
              >
                <ExternalLinkIcon className="size-4 text-primary/60" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Full Table</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
