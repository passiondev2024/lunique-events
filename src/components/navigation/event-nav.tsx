"use client";

import { paths } from "@/routes/paths";
import {
  BarChart3Icon,
  ChevronLeft,
  ChevronRightCircle,
  ClipboardListIcon,
  ImageIcon,
  MailsIcon,
  PanelLeftIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export const EventNav = ({ id, name }: { id: string; name: string }) => {
  const items = [
    {
      title: "Overview",
      href: paths.events.overview(id),
      Icon: PanelLeftIcon,
    },
    {
      title: "Guests",
      href: paths.events.guests(id),
      Icon: UsersIcon,
    },
    {
      title: "Registration",
      href: paths.events.registration(id),
      Icon: ClipboardListIcon,
    },
    {
      title: "Emails",
      href: paths.events.emails(id),
      Icon: MailsIcon,
    },
    {
      title: "Photos",
      href: paths.events.photos(id),
      Icon: ImageIcon,
    },
    {
      title: "Insights",
      href: paths.events.insights(id),
      Icon: BarChart3Icon,
    },
    {
      title: "Settings",
      href: paths.events.settings(id),
      Icon: SettingsIcon,
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
        <div className="flex items-center gap-1.5">
          <Link
            href={paths.events.root}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <ChevronLeft />
          </Link>
          <h1 className="text-2xl font-semibold">{name}</h1>
        </div>
        <Link href={`/${id}`} className={buttonVariants({ variant: "ghost" })}>
          Event Page <ChevronRightCircle className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
      <Tabs className="flex" onValueChange={onValueChange} value={pathname}>
        <TabsList className="gap-5 bg-transparent text-muted-foreground">
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
