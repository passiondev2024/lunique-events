import {
  FacebookIcon,
  LinkedinIcon,
  MessageCircleIcon,
  TwitterIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const SocialButtons = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">Share Event</p>
      <div className="-mr-2 space-x-0.5">
        <Button variant="ghost" size="icon">
          <FacebookIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <TwitterIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <LinkedinIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
