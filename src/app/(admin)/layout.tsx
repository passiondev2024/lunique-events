import { redirect } from "next/navigation";

import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect(paths.auth.signIn);

  return (
    <>
      <DashboardNav />
      <main>{children}</main>
    </>
  );
}
