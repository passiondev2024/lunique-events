"use client";

import {
  type LucideIcon,
  MailOpenIcon,
  MessageSquareIcon,
  ShareIcon,
} from "lucide-react";

export const ActionButtons = () => {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
      <ActionButton
        title="Invite Guests"
        Icon={MailOpenIcon}
        onClick={() => alert("Invite Guests")}
      />
      <ActionButton
        title="Send a Post"
        Icon={MessageSquareIcon}
        onClick={() => alert("Send a Post")}
      />
      <ActionButton
        title="Share Event"
        Icon={ShareIcon}
        onClick={() => alert("Share Event")}
      />
    </div>
  );
};

const ActionButton = (props: {
  title: string;
  Icon: LucideIcon;
  onClick: () => void;
}) => {
  const { title, Icon, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="flex min-w-fit items-center gap-3 rounded-md bg-muted p-1.5 pr-16 text-sm font-medium"
    >
      <div className="h-full rounded-md bg-muted-foreground/10 p-1.5">
        <Icon className="h-6 w-6" />
      </div>
      {title}
    </button>
  );
};
