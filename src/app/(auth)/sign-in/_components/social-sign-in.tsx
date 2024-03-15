"use client";

import { useMutation } from "@tanstack/react-query";
import { RotateCwIcon } from "lucide-react";
import { signIn } from "next-auth/react";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
      {!isLoading && <GoogleIcon className="mr-1.5 size-5 fill-primary" />}
      {isLoading && (
        <RotateCwIcon className="mr-1.5 size-5 animate-spin text-primary" />
      )}
      Google
    </Button>
  );
};
