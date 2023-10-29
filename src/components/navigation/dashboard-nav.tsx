import { getServerAuthSession } from "@/server/auth";
import { AccountMenu } from "./account-menu";

export const DashboardNav = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 w-full items-center justify-between">
        <div className="rounded-md px-3 py-1.5 text-xl font-extrabold text-primary">
          Better Event
        </div>
        <AccountMenu
          name={session?.user.name}
          email={session?.user.email}
          image={session?.user.image}
        />
      </div>
    </nav>
  );
};
