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

export const ActionButton = (props: {
  title: string;
  Icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  description?: string;
  onClick: () => void;
}) => {
  const { title, Icon, bgColor, iconColor, description, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="flex min-w-fit items-center gap-3 rounded-md bg-muted/50 p-1.5 pr-16 text-sm font-medium transition-all hover:bg-muted/30"
    >
      <div
        className="size-fit rounded-md bg-muted-foreground/10 p-1.5"
        style={{
          backgroundColor: bgColor && bgColor,
          color: iconColor && iconColor,
        }}
      >
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-base">{title}</p>
        {description && (
          <p className="text-xs font-medium text-foreground/50">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};
