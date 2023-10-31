import { BillingPlanCard } from "@/components/cards/billing-plan-card";
import { LicenseCodeCard } from "@/components/cards/license-code-card";
import { SubscriptionCard } from "@/components/cards/subscription-card";

export default function UsagePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-zinc-500">
          Manage billing and your subscription plan.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <BillingPlanCard />
        <div className="flex flex-col gap-5">
          <SubscriptionCard />
          <LicenseCodeCard />
        </div>
      </div>
    </div>
  );
}
