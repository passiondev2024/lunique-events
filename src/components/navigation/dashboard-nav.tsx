import { getServerAuthSession } from "@/server/auth";
import { AccountMenu } from "./account-menu";
import Link from "next/link";
import { paths } from "@/routes/paths";
import { ThemeToggle } from "../ui/theme-toggle";
import { ThemedLogoIcon } from "../icons/themed-logo-icon";

export const DashboardNav = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
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
      </div>
    </nav>
  );
};
