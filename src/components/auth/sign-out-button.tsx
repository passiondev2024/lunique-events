"use client";

import { useMutation } from "@tanstack/react-query";
import { RotateCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button, type ButtonProps } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
    <Button
      onClick={() => mutate()}
      disabled={isLoading}
      className="w-[92px]"
      {...props}
    >
      {isLoading && <RotateCwIcon className="mx-auto size-5 animate-spin" />}
      {!isLoading && "Sign Out"}
    </Button>
  );
};
