import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main>
      <Link href="/api/auth/signout" className={buttonVariants()}>
        Sign Out
      </Link>
    </main>
  );
}
