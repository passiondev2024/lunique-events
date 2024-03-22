"use client";

import { MailOpenIcon, QrCodeIcon, UsersIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { ActionButton } from "../../overview/_components/action-buttons";

const GuestsActionButtons = () => {
  const modal = useModal();

  return (
    <div className="flex  gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
      <ActionButton
        title="Invite Guests"
        Icon={MailOpenIcon}
        onClick={() => modal.onOpen("invite-guests")}
        bgColor="#1F2A40"
        iconColor="#3687FE"
      />
      <ActionButton
        title="Check In Guests"
        Icon={QrCodeIcon}
        onClick={() => modal.onOpen("check-guests")}
        bgColor="#1C332A"
        iconColor="#47C87F"
      />
      <ActionButton
        title="Guest List"
        Icon={UsersIcon}
        onClick={() => modal.onOpen("show-guest-list")}
        bgColor="#363325"
        iconColor="#FAD95B"
        description="Shown to guests"
      />
    </div>
  );
};

export default GuestsActionButtons;
