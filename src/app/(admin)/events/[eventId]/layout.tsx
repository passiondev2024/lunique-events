import { EventNav } from "@/components/navigation/event-nav";
import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

interface SettingsLayoutProps {
  params: { eventId: string };
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
  params: { eventId },
}: SettingsLayoutProps) {
  const event = await api.event.get.query({ id: eventId });
  if (!event) redirect(paths.events.error);

  return (
    <>
      <div className="sticky top-0 border-b bg-background">
        <div className="mx-auto max-w-4xl pt-3">
          <EventNav id={eventId} name={event.name} />
        </div>
      </div>
      <main className="mx-auto max-w-4xl p-3 md:px-0 md:py-5">{children}</main>
    </>
  );
}
