import { columns, type Guest } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";
import { GuestListActions } from "./guest-list-actions";

async function getData(): Promise<Guest[]> {
  // Fetch data from your API here.
  await new Promise((resolve) => setTimeout(resolve, 0));
  return [
    {
      id: "1",
      name: "Luka Stojadinovic",
      email: "luka@lunique.tech",
      status: "going",
      date: "Mar 14",
    },
    {
      id: "2",
      name: "Nikola Mladenovic",
      email: "nikola@lunique.tech",
      status: "going",
      date: "Mar 15",
    },
    {
      id: "3",
      name: "Petar Petrovic",
      email: "petar@lunique.tech",
      status: "invited",
      date: "Mar 13",
    },
    {
      id: "4",
      name: "Janko Jankovic",
      email: "janko@lunique.tech",
      status: "not going",
      date: "Mar 13",
    },
    // ...
  ];
}

export default async function GuestsTable() {
  const data = await getData();

  return (
    <div className="container mx-auto px-0 ">
      <GuestListActions />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
