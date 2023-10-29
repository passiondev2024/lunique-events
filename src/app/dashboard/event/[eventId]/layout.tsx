import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { paths } from "@/routes/paths";
import { ImageIcon, SettingsIcon } from "lucide-react";

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
      title: "Photos",
      href: paths.dashboard.event(eventId),
      icon: <ImageIcon className="mr-1.5 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: paths.dashboard.eventSettings(eventId),
      icon: <SettingsIcon className="mr-1.5 h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
