"use client";

import { CheckCheck, Loader2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { type RouterOutputs } from "@/trpc/shared";
import { PLAN_MAP } from "@/config";
import { formatDate } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { useCallback } from "react";

export const BillingPlanCard = ({
  subscription,
  professionalPlan,
}: {
  subscription: RouterOutputs["billing"]["getSubscription"];
  professionalPlan: RouterOutputs["billing"]["getPlan"];
}) => {
  const { mutate: getCheckoutUrl, ...checkoutUrlMutation } =
    api.billing.getCheckoutUrl.useMutation();

  const router = useRouter();
  const { toast } = useToast();
  const { onOpen } = useModal();

  const createSubscription = useCallback(() => {
    if (!professionalPlan) {
      toast({
        variant: "destructive",
        title: "Internal server error",
        description: "Professional plan data missing",
      });
      return;
    }

    getCheckoutUrl(
      {
        variantId: professionalPlan.variantId,
        embed: false,
      },
      {
        onSuccess: (url) => router.push(url ?? "/"),
        onError: () =>
          toast({
            title: "Error creating a checkout.",
            description:
              "Please check the server console for more information.",
          }),
      },
    );
  }, [getCheckoutUrl, professionalPlan, router, toast]);

  const cancelSubscription = useCallback(() => {
    onOpen("cancel-subscription", { subscription });
  }, [onOpen, subscription]);

  const isProfessional = subscription?.status === "active";
  const isOnGracePeriod = !!subscription?.endsAt;
  const isPaymentFailed = subscription?.status === "past_due";
  const isUnpaid = subscription?.status === "unpaid";
  const features = isProfessional ? PLAN_MAP.professional : PLAN_MAP.personal;

  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle>Current Plan</CardTitle>
        <div className="flex items-center gap-1">
          <CardDescription>You are currently on the</CardDescription>
          <Badge className="mx-0.5 w-fit">
            {isProfessional ? "Professional" : "Personal"}
          </Badge>
          <CardDescription>plan</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-zinc-500">
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" />{" "}
            {features.images} Total photos
          </li>
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" />{" "}
            {features.images} Indexed images
          </li>
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
            Galleries
          </li>
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
            Gallery sharing
          </li>
          <li className="flex items-center">
            <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
            Unlimited face searches
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1.5 md:flex-row md:items-center md:gap-3">
        {!isProfessional && (
          <Button
            onClick={createSubscription}
            disabled={checkoutUrlMutation.isLoading}
            className="w-full md:w-fit"
          >
            {checkoutUrlMutation.isLoading && (
              <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
            )}
            {isOnGracePeriod ? "Renew subscription" : "Get Professional Plan"}
          </Button>
        )}
        {isProfessional && (
          <Button onClick={cancelSubscription} className="w-full md:w-fit">
            Cancel subscription
          </Button>
        )}
        {isOnGracePeriod && (
          <p className="text-xs text-muted-foreground">
            You&apos;ve canceled your subscription, but you still have a
            Professional plan until {formatDate(subscription.endsAt ?? "")}.
          </p>
        )}
        {isPaymentFailed && (
          <p className="text-xs text-destructive">
            We attempted to charge your subscription, but were unsuccessful.
            Please verify your payment method.
          </p>
        )}
        {isUnpaid && (
          <p className="text-xs text-destructive">
            Due to non-payment of your subscription, we had to cancel your
            Professional plan. If you wish to continue your subscription or
            change the payment method, please subscribe again.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

// const LoadingSkeleton = () => (
//   <Card>
//     <CardHeader className="space-y-0">
//       <CardTitle>Current Plan</CardTitle>
//       <div className="flex items-center gap-1">
//         <CardDescription>You are currently on the</CardDescription>
//         <Badge className="mx-0.5 w-fit">Free</Badge>
//         <CardDescription>plan</CardDescription>
//       </div>
//     </CardHeader>
//     <CardContent>
//       <ul className="text-zinc-500">
//         <li className="flex items-center">
//           <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> 500 Total
//           photos
//         </li>
//         <li className="flex items-center">
//           <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> 500 Indexed
//           images
//         </li>
//         <li className="flex items-center">
//           <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
//           Galleries
//         </li>
//         <li className="flex items-center">
//           <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
//           Gallery sharing
//         </li>
//         <li className="flex items-center">
//           <CheckCheck className="mr-1.5 h-5 w-5 text-primary" /> Unlimited
//           Unlimited face searches
//         </li>
//       </ul>
//     </CardContent>
//     <CardFooter>
//       <div className="h-9 w-48 rounded-md bg-muted" />
//     </CardFooter>
//   </Card>
// );
