"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GoogleIcon } from "../icons/google-icon";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { RotateCwIcon } from "lucide-react";
import { paths } from "@/routes/paths";

export const SocialSignInForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => signIn("google"),
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to sign out. Please try again.",
      }),
  });

  useEffect(() => {
    if (error && error === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        title: "Email Already in Use",
        description:
          "This email is already associated with an account. Please try logging in using this email or reach out to our support team for assistance. Thank you!",
      });

      router.replace(paths.auth.signIn);
    }
  }, [error, router]);

  return (
    <Button
      onClick={() => mutate()}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {!isLoading && <GoogleIcon className="mr-1.5 h-5 w-5 fill-primary" />}
      {isLoading && (
        <RotateCwIcon className="mr-1.5 h-5 w-5 animate-spin text-primary" />
      )}
      Google
    </Button>
  );
};
