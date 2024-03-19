"use client";

import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import {
  ArrowUpToLineIcon,
  CircleEllipsisIcon,
  CircleIcon,
  HelpCircleIcon,
  MailIcon,
  PlusIcon,
  SmartphoneIcon,
  Ticket,
  TicketIcon,
  User2Icon,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import lemonSqueezyIcon from "@/public/images/LemonSqueezy.jpeg";

import { ActionButton } from "../overview/_components/action-buttons";

export default function RegistrationPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const tickets = [
    { id: 1, ticketName: "Premium", requireApproval: false, available: true },
    { id: 2, ticketName: "VIP", requireApproval: true, available: false },
    { id: 3, ticketName: "VIP", requireApproval: true, available: false },
    { id: 4, ticketName: "VIP", requireApproval: true, available: false },
  ];
  const requireApproval = false;

  const emailTemplate = [
    {
      status: "Pending Approval / Waitlist",
      icon: <CheckCircledIcon className="size-8 text-slate-300" />,
    },
    {
      status: "Going",
      icon: <CheckCircledIcon className="size-8 text-green-500" />,
    },
    {
      status: "Declined",
      icon: <CrossCircledIcon className="size-8 text-red-500" />,
    },
  ];
  return (
    <div className="flex flex-col space-y-4">
      <div>TODO: {params.eventId} registration</div>
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden">
        <ActionButton
          title="Registration"
          Icon={Ticket}
          onClick={() => alert("Registration")}
        />
        <ActionButton
          title="Event Capacity"
          Icon={ArrowUpToLineIcon}
          onClick={() => alert("Event Capacity")}
        />
        <ActionButton
          title="Group Registration"
          Icon={TicketIcon}
          onClick={() => alert("Group Registration")}
        />
      </div>
      <Card className="flex  items-center justify-between space-x-2 p-2 px-4">
        <div className="flex space-x-2">
          <Image
            src={lemonSqueezyIcon.src}
            width={40}
            height={40}
            alt=""
            className="rounded-full p-0"
          />
          <div className="text-sm">
            <p className="font-bold">Start Selling Tickets.</p>
            <p className="font-light">
              Collect payments by creating a Lemon Squeezy account. Receive
              payouts daily. Set up in under 5 minutes.
            </p>
          </div>
        </div>

        <div>
          <Button className="h-7 gap-2 bg-muted  px-2 text-muted-foreground">
            Get Started
          </Button>
        </div>
      </Card>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Button className="h-7 gap-2 bg-muted  pl-2 text-muted-foreground">
          <PlusIcon className="size-4 p-0" />
          New Ticket Type
        </Button>
      </div>
      {/*flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-3 md:overflow-hidden */}
      <div className="grid grid-cols-2 gap-4 pb-4 ">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="bg-muted/30">
            <CardHeader className="space-y-4">
              <CardTitle className="flex justify-between">
                <div>
                  <h1>{ticket.ticketName}</h1>
                </div>
                <div>
                  <button>
                    <CircleEllipsisIcon className="size-4 text-foreground/30 transition-all hover:text-foreground" />
                  </button>
                </div>
              </CardTitle>
              <CardDescription className="text-2xl font-medium text-foreground">
                FREE
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between pb-2">
              <div className="flex items-center space-x-2">
                <p>Require Approval</p>
                <InfoCircledIcon className="size-4 text-foreground/30" />
              </div>
              <Switch className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-primary/20" />
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-2 text-base font-light">
              <div className="flex items-center space-x-2 ">
                <CircleIcon className="size-2 rounded-full bg-green-500 text-green-500 " />
                <p>
                  {ticket.available && "Available"}
                  {!ticket.available && "Unavailable"}
                </p>
              </div>
              <div>
                <p>1 sold</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Separator />
      {requireApproval && (
        <div className="space-y-4 pb-4">
          <div>
            <h1 className="text-xl font-semibold">Registration Email</h1>
            <p className="text-base font-normal text-foreground/70">
              Upon registration, we send guests a confirmation email that
              includes a calendar invite. You can add a custom message to the
              email.
            </p>
          </div>
          <div>
            <Button className="space-x-2 px-4">
              <MailIcon className="size-5 text-secondary" />
              <p className="text-base">Customize Email</p>
            </Button>
          </div>
        </div>
      )}
      {!requireApproval && (
        <div className="space-y-4 pb-4">
          <div>
            <h1 className="text-xl font-semibold">Registration Emails</h1>
            <p className="text-base font-normal text-foreground/70">
              Customize the emails sent when a guest registers for the event and
              for when you approve or decline their registration.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {emailTemplate.map((email) => (
              <Card
                key={email.status}
                className="overflow-auto bg-gradient-to-b from-muted/20 to-muted  transition-all hover:cursor-pointer hover:ring-1 hover:ring-muted"
              >
                <CardHeader className="">
                  <CardTitle className="">{email.icon}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Separator className="h-3 rounded-full" />
                  <Separator className="h-3 w-2/5 rounded-full" />
                </CardContent>
                <CardFooter className=" bg-background py-2">
                  {email.status}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Separator className="" />
      <div className="flex flex-col space-y-4 pb-4">
        <div>
          <h1 className="text-xl font-semibold">Registration Questions</h1>
          <p className="text-base font-normal text-foreground/70">
            We will ask guests the following questions when they register for
            the event.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <User2Icon className=" rounded-full bg-green-400 p-1" />
          <h1 className="text-lg font-semibold">Identity</h1>
        </div>
        <div className="flex w-full items-center space-x-4">
          <div className="  w-4/5 flex-auto flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User2Icon className=" p-1 text-muted-foreground" />
                <h1 className="text-base font-normal">Name</h1>
              </div>
              <div className="h-fit items-center rounded-full bg-muted px-3 py-0.5">
                <h1 className="text-sm text-primary">Required</h1>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MailIcon className=" p-1 text-muted-foreground" />
                <h1 className="text-base font-normal">Email Address</h1>
              </div>
              <div className="h-fit items-center rounded-full bg-muted px-3 py-0.5">
                <h1 className="text-sm text-primary">Required</h1>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SmartphoneIcon className=" p-1 text-muted-foreground" />
                <h1 className="text-base font-normal">Phone Number</h1>
              </div>
              <div className="h-fit items-center rounded-full bg-muted px-3 py-0.5">
                {/* <h1 className="text-sm text-primary">Required</h1> */}
                <Select>
                  <SelectTrigger className="h-fit w-[80px] p-0">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                      <SelectItem value="required">Required</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-28" />
          <div className="flex flex-col items-start">
            <p className="line-clamp-2">
              We always ask guests for their name and email.
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <HelpCircleIcon className=" rounded-full bg-orange-400 p-1" />
          <h1 className="text-lg font-semibold">Custom Questions</h1>
        </div>
        <div>
          <p className="text-base font-normal text-foreground/70">
            You are not asking guests additional questions.
          </p>
        </div>
        <Button className="w-fit space-x-2 bg-muted py-0 pl-2 text-primary/80">
          <PlusIcon className="size-5 p-0 " />
          <p>Add Question</p>
        </Button>
      </div>
    </div>
  );
}
