"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CreateEventButton = (props: ButtonProps) => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("create-event")} {...props}>
      <PlusCircleIcon className="mr-1.5 h-5 w-5" /> Create
    </Button>
  );
};
