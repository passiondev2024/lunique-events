import React from "react";
import { ClockIcon, MailsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
export const EventFeedback = () => {
  return (
    <div className="flex w-full flex-col space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold capitalize">Event Feedback</h1>
        <p className="text-base text-primary/90">
          See how much your guests enjoyed the event.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 pb-20 text-center">
        <div>
          <MailsIcon size={150} className="text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold capitalize">
            No Post-Event Email Scheduled
          </h1>
          <p className="text-base text-primary/50">
            To collect feedback, schedule a post-event thank you email. We will
            take care of the rest!
          </p>
        </div>
        <div>
          <Button className="space-x-2" variant={"secondary"}>
            <ClockIcon className="" size={16} />
            <p>Schedule Feedback Email</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
