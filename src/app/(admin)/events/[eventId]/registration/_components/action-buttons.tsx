import React from "react";
import { ArrowUpToLineIcon, Ticket, TicketIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { ActionButton } from "../../overview/_components/action-buttons";

const RegistrationActionButtons = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
      <ActionButton
        title="Registration"
        Icon={Ticket}
        onClick={() => onOpen("confirm-registration")}
        bgColor="#1C332A"
        iconColor="#47C87F"
        description="open"
      />
      <ActionButton
        title="Event Capacity"
        Icon={ArrowUpToLineIcon}
        onClick={() => onOpen("event-capacity")}
        bgColor="#382A22"
        iconColor="#F79743"
        description="unlimited"
      />
      <ActionButton
        title="Group Registration"
        Icon={TicketIcon}
        onClick={() => onOpen("group-registration")}
        bgColor="#322239"
        iconColor="#CC63D4"
        description="Off"
      />
    </div>
  );
};

export default RegistrationActionButtons;
