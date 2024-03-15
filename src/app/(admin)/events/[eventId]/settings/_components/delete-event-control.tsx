"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteEventControl = ({ eventId }: { eventId: string }) => {
  const { onOpen } = useModal();

  return (
    <Button
      variant="destructive"
      onClick={() => onOpen("delete-event", { eventId })}
    >
      <Trash2Icon className="mr-1.5 size-4" />
      Delete
    </Button>
  );
};
