"use client";

import { paths } from "@/routes/paths";
import {
  BarChart3Icon,
  ChevronRightCircle,
  CreditCardIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

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
  const router = useRouter();

  const onValueChange = (href: string) => {
    router.push(href, { scroll: false });
  };

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
      <Tabs className="flex" onValueChange={onValueChange} value={pathname}>
        <TabsList className="gap-5 rounded-none bg-transparent px-3 text-muted-foreground md:px-0">
          {items.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.href}
              className="rounded-none border-b-2 border-transparent px-0 py-2 shadow-none transition duration-300 hover:text-primary/90 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              <item.Icon className="mr-1.5 h-4 w-4" />
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
