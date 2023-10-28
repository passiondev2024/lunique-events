"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GoogleIcon } from "../icons/google-icon";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";

export const SocialSignInForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const router = useRouter();

  useEffect(() => {
    if (error && error === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        title: "Email Already in Use",
        description:
          "This email is already associated with an account. Please try logging in using this email or reach out to our support team for assistance. Thank you!",
      });

      router.replace("/sign-in");
    }
  }, [error, router]);

  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="w-full"
    >
      <GoogleIcon className="mr-1.5 h-5 w-5 fill-primary" />
      Google
    </Button>
  );
};
