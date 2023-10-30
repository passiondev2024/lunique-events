import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

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
      <main className="h-full-nav container py-5 md:py-6">{children}</main>
    </>
  );
}
