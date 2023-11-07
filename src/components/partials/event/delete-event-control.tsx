"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Trash2Icon } from "lucide-react";

export const DeleteEventControl = ({ eventId }: { eventId: string }) => {
  const { onOpen } = useModal();

  return (
    <Button
      variant="destructive"
      onClick={() => onOpen("delete-event", { eventId })}
    >
      <Trash2Icon className="mr-1.5 h-4 w-4" />
      Delete
    </Button>
  );
};
