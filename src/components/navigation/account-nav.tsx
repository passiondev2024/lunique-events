"use client";

import { paths } from "@/routes/paths";
import {
  BarChart3Icon,
  ChevronRightCircle,
  CreditCardIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const AccountNav = () => {
  const items = [
    {
      title: "Settings",
      href: paths.account.settings,
      Icon: UserIcon,
    },
    {
      title: "Usage",
      href: paths.account.usage,
      Icon: BarChart3Icon,
    },
    {
      title: "Billing",
      href: paths.account.billing,
      Icon: CreditCardIcon,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="px-3 text-lg font-semibold md:px-1.5 md:text-2xl">
          Account
        </h1>
        <Link
          href={paths.events.root}
          className={buttonVariants({ variant: "ghost" })}
        >
          Events <ChevronRightCircle className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
      <div className="flex">
        <ul className="flex justify-start gap-5 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-3 text-muted-foreground md:overflow-hidden md:px-0">
          {items.map((item) => (
            <Link key={item.title} href={item.href}>
              <li
                className={cn(
                  "flex items-center rounded-none border-b-2 border-transparent py-2 text-sm font-medium transition duration-300 hover:text-primary/90",
                  pathname === item.href && "border-primary text-primary",
                )}
              >
                <item.Icon className="mr-1.5 h-4 w-4" />
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
