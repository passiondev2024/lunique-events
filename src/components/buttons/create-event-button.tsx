"use client";

import { PlusCircleIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { Button, type ButtonProps } from "../ui/button";

export const CreateEventButton = (props: ButtonProps) => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("create-event")} {...props}>
      <PlusCircleIcon className="mr-1.5 size-5" /> Create
    </Button>
  );
};
