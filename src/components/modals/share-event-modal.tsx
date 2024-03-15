"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CopyCheckIcon, CopyIcon } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export const ShareEventModal = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { isOpen, type, onClose, data } = useModal();
  const { eventId } = data;

  const isModalOpen = isOpen && type === "share-event";

  const galleryUrl = `${origin}/gallery/${eventId}`;

  const { mutate: copy, isLoading } = useMutation({
    mutationFn: () => navigator.clipboard.writeText(galleryUrl),
    onSuccess: () => {
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Anyone with link can view this gallery.",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    },
    onError: () =>
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
      }),
  });

  if (!eventId) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this gallery</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this gallery.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Input defaultValue={galleryUrl} className="flex-1" />
          <Button
            disabled={isLoading || copied}
            onClick={() => copy()}
            size="icon"
            variant="secondary"
          >
            {!copied && <CopyIcon className="size-5" />}
            {copied && !isLoading && <CopyCheckIcon className="size-5" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
