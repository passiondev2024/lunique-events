import Link from "next/link";

import { paths } from "@/routes/paths";
import { getServerAuthSession } from "@/server/auth";

import { ThemedLogoIcon } from "../icons/themed-logo-icon";
import { ThemeToggle } from "../ui/theme-toggle";

import { AccountMenu } from "./account-menu";

export const DashboardNav = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="container mx-auto flex h-12 items-center justify-between">
      <Link href={paths.events.root}>
        <ThemedLogoIcon />
      </Link>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>
    </nav>
  );
};
