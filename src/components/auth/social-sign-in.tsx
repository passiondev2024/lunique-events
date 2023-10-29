"use client";

import { GoogleIcon } from "../icons/google-icon";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { RotateCwIcon } from "lucide-react";

export const SocialSignInForm = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signIn("google"),
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to sign out. Please try again.",
      }),
  });

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
