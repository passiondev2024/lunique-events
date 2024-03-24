import React from "react";
import {
  HelpCircleIcon,
  MailIcon,
  PlusIcon,
  SmartphoneIcon,
  User2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const RegistrationQuestions = () => {
  return (
    <div className="flex flex-col space-y-4 pb-4">
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
};
