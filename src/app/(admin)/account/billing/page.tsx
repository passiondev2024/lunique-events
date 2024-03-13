import { BillingPlanCard } from "@/components/cards/billing-plan-card";
import { LicenseCodeCard } from "@/components/cards/license-code-card";
import { api } from "@/trpc/server";

export default async function UsagePage() {
  const subscription = await api.billing.getSubscription.query();
  const professionalPlan = await api.billing.getPlan.query({
    type: "professional",
  });

  return (
    <div className="space-y-3 md:space-y-5">
      <BillingPlanCard
        subscription={subscription}
        professionalPlan={professionalPlan}
      />
      <LicenseCodeCard />
    </div>
  );
}
