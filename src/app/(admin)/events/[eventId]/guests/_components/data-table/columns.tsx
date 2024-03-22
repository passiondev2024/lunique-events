"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, UserIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type GuestStatus = "going" | "not going" | "invited";

export type Guest = {
  id: string;
  name: string;
  email: string;
  status: GuestStatus;
  date: string;
};
export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <UserIcon
            size={20}
            className="rounded-full border border-foreground"
            opacity={0.9}
          />
          <h1 className="text-base font-medium">{row.getValue("name")}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Email
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Status
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const value: GuestStatus = row.getValue("status");
      const color =
        value === "going"
          ? "#3DC45D"
          : value === "not going"
            ? "#64758A"
            : value === "invited"
              ? "#2963EA"
              : "";
      return (
        <div className="">
          <Badge
            className="rounded-full"
            style={{
              backgroundColor: color,
            }}
          >
            <h2 className="capitalize">{value}</h2>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-fit cursor-pointer transition-all hover:text-foreground"
        >
          Date
          <ArrowUpDown className="ml-2 size-4" />
        </div>
      );
    },
  },
];
