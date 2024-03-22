"use client";

import {
  AlarmClockIcon,
  CalendarOff,
  CircleEllipsisIcon,
  CircleIcon,
  ClockIcon,
  HeartIcon,
  MessageCircleIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ActionButton } from "../overview/_components/action-buttons";

export default function EmailPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const remindersAndFeedbacks = [
    {
      name: "Event is starting tomorow",
      to: ["Going", "Invited"],
      scheduled: "Mar 24",
    },
    {
      name: "Event is starting in 2 days",
      to: ["Going", "Invited"],
      scheduled: "Mar 28",
    },
  ];

  const posts = [
    {
      post: "This is my first post!",
      createdAt: "8 minutes ago",
      recipients: "Going",
    },
  ];

  return (
    <div className="flex flex-col space-y-5 px-4">
      <div>TODO: {params.eventId} - Emails</div>

      <div>
        <h1 className="text-xl font-semibold">Scheduled Emails</h1>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 md:grid md:grid-cols-2 md:overflow-hidden">
        <ActionButton
          Icon={AlarmClockIcon}
          title="Add Reminder "
          onClick={() => alert("Add Reminder")}
        />
        <ActionButton
          Icon={StarIcon}
          title="Add Feedback Email"
          onClick={() => alert("Add Feedback Email")}
        />
      </div>

      <div className="pb-4">
        <Table className="rounded-full">
          <TableBody>
            {remindersAndFeedbacks?.map((_reminder, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-muted-foreground ">
                  <ClockIcon className="size-5" />
                </TableCell>
                <TableCell className="font-bold">{_reminder.name}</TableCell>
                <TableCell className="flex text-muted-foreground">
                  To: {_reminder.to.join(", ")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="w-fit rounded-xl border-none bg-orange-900/50">
                    <p className="px-2 py-0.5 text-orange-400">
                      Scheduled: {_reminder.scheduled}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground transition-all hover:text-primary">
                  <PencilIcon className="size-5" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Separator className="" />

      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Posts</h1>
          <Button className="h-7 gap-2 bg-muted  pl-2 text-muted-foreground">
            <PlusIcon className="size-4 p-0" />
            New Post
          </Button>
        </div>

        {!!posts &&
          posts.length > 0 &&
          posts.map((_post, idx) => (
            <Card key={idx} className="bg-muted/30">
              <CardHeader>
                <CardTitle className="">
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <div className="size-fit rounded-full border-2 border-primary p-1">
                        <UserIcon size={20} />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">Luka Stojadinovic</span>
                        <div className="flex items-center space-x-2 text-xs font-normal text-secondary-foreground/50 ">
                          <span className="">{_post.createdAt}</span>
                          <CircleIcon
                            size={4}
                            className="rounded-full bg-secondary-foreground/30 "
                          />
                          <span>{_post.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <div className=" font-normal text-secondary-foreground/50 ">
                      <CircleEllipsisIcon size={20} />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>{_post.post}</CardContent>
              <CardFooter className="space-x-2">
                <div className="flex size-8 items-center justify-center space-x-2  rounded-lg bg-muted p-1.5">
                  <HeartIcon size={15} />
                </div>
                <div className="flex h-8 w-fit items-center justify-center space-x-2 rounded-lg  bg-muted p-1.5 text-sm">
                  <MessageCircleIcon size={15} />
                  <p>Comment</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        {posts.length === 0 && (
          <div className="flex h-52 w-full flex-col items-center justify-center gap-8 rounded-lg text-center">
            <div className="size-fit rounded-full  p-5">
              <CalendarOff className="size-32 text-muted" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">No Posts</h1>
              <span className="text-base font-normal text-foreground/50">
                Create a post to email guests at any time.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
