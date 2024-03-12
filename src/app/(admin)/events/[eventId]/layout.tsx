import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { paths } from "@/routes/paths";
import {
  BarChart3Icon,
  ChevronLeftIcon,
  ClipboardListIcon,
  ImageIcon,
  MailsIcon,
  PanelLeftIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

interface SettingsLayoutProps {
  params: { eventId: string };
  children: React.ReactNode;
}

export default function SettingsLayout({
  children,
  params: { eventId },
}: SettingsLayoutProps) {
  const sidebarNavItems = [
    {
      title: "Events",
      href: paths.events.root,
      icon: <ChevronLeftIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Overview",
      href: paths.events.overview(eventId),
      icon: <PanelLeftIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Guests",
      href: paths.events.guests(eventId),
      icon: <UsersIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Registration",
      href: paths.events.registration(eventId),
      icon: <ClipboardListIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Emails",
      href: paths.events.emails(eventId),
      icon: <MailsIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Photos",
      href: paths.events.photos(eventId),
      icon: <ImageIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Insights",
      href: paths.events.insights(eventId),
      icon: <BarChart3Icon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: paths.events.settings(eventId),
      icon: <SettingsIcon className="mr-1.5 h-4 w-4" />,
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
