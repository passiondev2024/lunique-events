import { Separator } from "@/components/ui/separator";

import GuestsActionButtons from "./_components/guests-action-buttons";
import { GuestsStatus } from "./_components/guests-status";
import GuestsTable from "./_components/guests-table";

export type GuestStatus = "going" | "not going" | "invited";
export type GuestsArray = Array<Guest>;
export interface Guest {
  name: string;
  email: string;
  status: GuestStatus;
  dateRegistered: string;
}

export default function EventGuestsPage({}: {
  params: {
    eventId: string;
  };
}) {
  const guests: GuestsArray = [
    {
      name: "Luka Stojadinovic",
      email: "luka@lunique.tech",
      status: "going",
      dateRegistered: "Mar 14",
    },
    {
      name: "Nikola Mladenovic",
      email: "nikola@lunique.tech",
      status: "going",
      dateRegistered: "Mar 15",
    },
    {
      name: "Petar Petrovic",
      email: "petar@lunique.tech",
      status: "invited",
      dateRegistered: "Mar 13",
    },
    {
      name: "Janko Jankovic",
      email: "janko@lunique.tech",
      status: "not going",
      dateRegistered: "Mar 13",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">At a Glance</h1>
      <GuestsStatus guestStatuses={guests.map((g) => g.status)} />
      <GuestsActionButtons />
      <Separator />
      <GuestsTable />
    </div>
  );
}
