import { UsageCard } from "@/components/cards/usage-card";

export default function UsagePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Usage</h1>
        <p className="text-zinc-500">Track your usage</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <UsageCard title="Photos uploaded" max={500} value={200} />
        <UsageCard title="Indexed images" max={500} value={500} />
        <UsageCard title="Found faces" max={500} value={200} />
        <UsageCard title="Faces searched" max={2000} value={100} />
      </div>
    </div>
  );
}
