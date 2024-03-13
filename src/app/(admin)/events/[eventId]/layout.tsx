import { EventNav } from "@/components/navigation/event-nav";

interface SettingsLayoutProps {
  params: { eventId: string };
  children: React.ReactNode;
}

export default function EventIdLayout({
  children,
  params: { eventId },
}: SettingsLayoutProps) {
  return (
    <>
      <div className="sticky top-0 border-b bg-background">
        <div className="mx-auto max-w-4xl pt-3">
          <EventNav id={eventId} />
        </div>
      </div>
      <main className="mx-auto max-w-4xl p-3 md:px-0 md:py-5">{children}</main>
    </>
  );
}
