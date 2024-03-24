import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import stripeIcon from "@/public/images/stripeLogo.png";

export const StripeCard = () => {
  return (
    <Card className="">
      <div className="flex items-center justify-between space-x-2 px-4 py-2 ">
        <div className="flex items-center space-x-2">
          <div className="h-full min-w-16 items-center justify-center overflow-auto bg-transparent p-2">
            <Image
              src={stripeIcon.src}
              width={50}
              height={50}
              alt=""
              className="rounded-full p-0"
            />
          </div>
          <div className="space-y-2 py-3">
            <CardTitle>Start Selling Tickets</CardTitle>
            <CardDescription>
              Collect payments by creating a Stripe account. Receive payouts
              daily. Set up in under 5 minutes.
            </CardDescription>
          </div>
        </div>
        <div className="">
          <Button variant={"secondary"} className="h-7 px-2 capitalize ">
            Get Started
          </Button>
        </div>
      </div>
    </Card>
  );
};

{
  /* <p className="font-bold">Start Selling Tickets.</p>
<p className="font-light">
  Collect payments by creating a Stripe account. Receive payouts
  daily. Set up in under 5 minutes.
</p> 
 <Image
            src={stripeIcon.src}
            width={50}
            height={50}
            alt=""
            className="p-0"
          />*/
}
