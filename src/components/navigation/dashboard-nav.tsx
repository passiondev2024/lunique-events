import { getServerAuthSession } from "@/server/auth";
import { AccountMenu } from "./account-menu";
import Link from "next/link";
import { paths } from "@/routes/paths";

export const DashboardNav = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <Link href={paths.events.root}>
          <div className="rounded-md bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-xl font-extrabold tracking-wider text-transparent">
            Better Event
          </div>
        </Link>
        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>
    </nav>
  );
};
