import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const SubscriptionCard = () => {
  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle className="text-xl">Subscription Plan</CardTitle>
        <CardDescription>
          You currently on do not have an active subscription.
        </CardDescription>
      </CardHeader>
      <CardContent className=" text-zinc-500">
        <Button className="w-full">Get premium plan</Button>
      </CardContent>
    </Card>
  );
};
