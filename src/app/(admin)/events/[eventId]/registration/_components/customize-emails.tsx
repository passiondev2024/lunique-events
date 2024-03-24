import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CustomizeEmailsProps {
  requireApproval: boolean;
}

export const CustomizeEmailsSection = ({
  requireApproval,
}: CustomizeEmailsProps) => {
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
    <div>
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
      {requireApproval && (
        <div>
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
    </div>
  );
};
