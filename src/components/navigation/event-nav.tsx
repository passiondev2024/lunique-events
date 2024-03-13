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
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const EventNav = ({ id }: { id: string }) => {
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:gap-1.5">
          <Link href={paths.events.root}>
            <div className="flex items-center gap-1.5 rounded-lg px-3 py-1 hover:bg-accent hover:text-accent-foreground">
              <ChevronLeft />
              <h1 className="text-xl font-semibold md:text-2xl">Events</h1>
            </div>
          </Link>
        </div>
        <Link href={`/${id}`} className={buttonVariants({ variant: "ghost" })}>
          Event Page <ChevronRightCircle className="ml-1.5 h-4 w-4" />
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
