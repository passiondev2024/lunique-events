"use client";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import { formatDate } from "@/lib/utils";
import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";

export const CancelSubscriptionModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "cancel-subscription";

  const mutation = api.billing.cancelSubscription.useMutation();

  const router = useRouter();

  const handleCancelSubscription = () => {
    if (!data.subscription) {
      toast({
        variant: "destructive",
        title: "Internal server error",
        description: "Failed to cancel subscription. Please try again.",
      });
      return;
    }

    mutation.mutate(
      { lemonSqueezyId: data.subscription.lemonSqueezyId },
      {
        onSuccess: () => {
          router.refresh();
          toast({
            title: "Subscription canceled",
            description: "You are now on personal plan.",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Internal server error",
            description: "Failed to cancel subscription. Please try again.",
          });
        },
        onSettled: () => onClose(),
      },
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to cancel your subscription?
          </DialogTitle>
          <DialogDescription>
            In case you cancel your subscription before the renewal date, you
            will have the Professional plan until{" "}
            {data.subscription?.renewsAt &&
              formatDate(data.subscription?.renewsAt ?? "")}
            .
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 space-y-3">
          <Button
            disabled={mutation.isLoading}
            variant="destructive"
            className="w-full"
            onClick={handleCancelSubscription}
          >
            {mutation.isLoading && (
              <Loader2Icon className="mr-1.5 size-4 animate-spin" />
            )}
            Cancel subscription
          </Button>
          <Button
            disabled={mutation.isLoading}
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Discard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
