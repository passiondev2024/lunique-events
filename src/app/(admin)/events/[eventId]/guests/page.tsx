"use client";
import {
  ArrowDownNarrowWide,
  CircleIcon,
  DownloadIcon,
  FilterIcon,
  MailOpenIcon,
  QrCodeIcon,
  Share2Icon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ActionButton } from "../overview/_components/action-buttons";
export default function EventGuestsPage({}: {
  params: {
    eventId: string;
  };
}) {
  // return <div>TODO: {params.eventId} guests</div>;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">At a Glance</h1>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex justify-start space-x-2 text-green-500">
          <div className=" ">
            <p className="text-2xl">1</p>
          </div>
          <div className="flex flex-col-reverse">
            <p className="">guest</p>
          </div>
        </div>

        <div className="flex space-x-0.5">
          <div className="h-[7px] w-full rounded-l-sm bg-green-500">{}</div>
          <div className="h-[7px] w-full rounded-r-sm bg-muted-foreground">
            {}
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 text-green-500">
            <CircleIcon className=" size-1.5 rounded-full bg-green-500 text-green-500" />
            <p>1 Going</p>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CircleIcon className="size-1.5 rounded-full bg-muted-foreground/80 text-muted-foreground/80" />
            <p>1 Not Going</p>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
        <ActionButton
          title="Invite Guests"
          Icon={MailOpenIcon}
          onClick={() => alert("Invite Guests")}
        />
        <ActionButton
          title="Check In Guests"
          Icon={QrCodeIcon}
          onClick={() => alert("Invite Guests")}
        />
        <ActionButton
          title="Guest List"
          Icon={UsersIcon}
          onClick={() => alert("Guest List")}
        />
      </div>
      <div className="space-y-8">
        <div>
          <Separator />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Guest List</h1>
            <div className="flex space-x-2 ">
              <Button className="flex size-7 h-7 place-content-center items-center rounded   bg-secondary p-0 text-primary">
                <DownloadIcon className="size-4 text-primary/60" />
              </Button>
              <Button className="flex size-7 h-7  place-content-center   items-center rounded bg-secondary p-0 text-primary">
                <Share2Icon className="size-4 text-primary/60" />
              </Button>
            </div>
          </div>
          <div className="w-full">
            <Input
              className="text-lg font-medium"
              placeholder="🔎  Search for guest"
              type="search"
            />
          </div>

          <div className="flex justify-between">
            <div>
              <Select>
                <SelectTrigger className="h-7 w-fit space-x-2 bg-muted">
                  <FilterIcon className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="allGuests">All Guests</SelectItem>
                    <Separator />
                    <SelectItem value="going">Going</SelectItem>
                    <SelectItem value="invited">Invited</SelectItem>
                    <SelectItem value="notGoing">Not Going</SelectItem>
                    <Separator />
                    <SelectItem value="checkedIn">Checked In</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="h-7 w-fit space-x-2 bg-muted">
                  <ArrowDownNarrowWide className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="going">Name</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="approvalStatus">
                      Approval Status
                    </SelectItem>
                    <SelectItem value="registerTime">Register Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground ">
                    <UserIcon className="size-5" />
                  </TableCell>
                  <TableCell className="font-bold">Luka Stojadinovic</TableCell>
                  <TableCell className="text-muted-foreground">
                    luka@lunique.tech
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="w-fit rounded-xl border-none bg-green-900/50">
                      <p className="px-2 py-0.5 text-green-400">Going</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    Mar 14
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground ">
                    <UserIcon className="size-5" />
                  </TableCell>
                  <TableCell className="font-bold">Nikola Mladenovic</TableCell>
                  <TableCell className="text-muted-foreground">
                    nikola@lunique.tech
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="w-fit rounded-xl border-none bg-green-900/50">
                      <p className="px-2 py-0.5 text-green-400">Going</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    Mar 14
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
