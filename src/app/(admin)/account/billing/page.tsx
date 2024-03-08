import { BillingPlanCard } from "@/components/cards/billing-plan-card";
import { LicenseCodeCard } from "@/components/cards/license-code-card";
import { api } from "@/trpc/server";

export default async function UsagePage() {
  const subscription = await api.billing.getSubscription.query();
  const professionalPlan = await api.billing.getPlan.query({
    type: "professional",
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-zinc-500">
          Manage billing and your subscription plan.
        </p>
      </header>

      <div className="space-y-3">
        <BillingPlanCard
          subscription={subscription}
          professionalPlan={professionalPlan}
        />
        <LicenseCodeCard />
      </div>
    </div>
  );
}
