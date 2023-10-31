import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { paths } from "@/routes/paths";
import {
  BarChart3Icon,
  ChevronLeftIcon,
  CreditCardIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNavItems = [
    {
      title: "Events",
      href: paths.events.root,
      icon: <ChevronLeftIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: paths.account.settings,
      icon: <UserIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Usage",
      href: paths.account.usage,
      icon: <BarChart3Icon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Billing",
      href: paths.account.billing,
      icon: <CreditCardIcon className="mr-1.5 h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
