import { getServerAuthSession } from "@/server/auth";
import { AccountMenu } from "./account-menu";
import Link from "next/link";
import { paths } from "@/routes/paths";

export const DashboardNav = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <Link href={paths.dashboard.root}>
          <div className="rounded-md text-xl font-bold tracking-wider text-primary drop-shadow-lg md:font-extrabold">
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
