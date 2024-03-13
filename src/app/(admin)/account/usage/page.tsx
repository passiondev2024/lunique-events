import { UsageCard } from "@/components/cards/usage-card";

export default function UsagePage() {
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-5">
      <UsageCard title="Photos uploaded" max={500} value={200} />
      <UsageCard title="Indexed images" max={500} value={500} />
      <UsageCard title="Found faces" max={500} value={200} />
      <UsageCard title="Faces searched" max={2000} value={100} />
    </div>
  );
}
