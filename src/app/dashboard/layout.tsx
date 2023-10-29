import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) return redirect("/sign-in");

  return <>{children}</>;
}
