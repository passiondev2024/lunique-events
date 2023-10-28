"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button, type ButtonProps } from "../ui/button";

export const SignOutButton = (props: ButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => router.refresh(),
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to sign out. Please try again.",
      }),
  });

  return (
    <Button {...props} onClick={() => mutate()} disabled={isLoading}>
      Sign Out
    </Button>
  );
};
