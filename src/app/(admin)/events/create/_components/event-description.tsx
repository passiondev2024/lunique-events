import { useState } from "react";
import { NewspaperIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface EventDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export const EventDescription = ({
  value,
  onChange,
}: EventDescriptionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        type="button"
        className="flex w-full items-center gap-3 rounded-md border border-border bg-muted px-3.5 py-1.5 transition duration-300 hover:border-muted-foreground/60 hover:bg-muted-foreground/30 md:gap-5"
      >
        <NewspaperIcon className="size-4 text-muted-foreground md:size-5" />
        <span className="text-lg font-medium">Add Description</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event Desription</DialogTitle>
        </DialogHeader>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Who should come? What's the event about?"
          rows={8}
        />
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
