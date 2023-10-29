"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Button, type ButtonProps } from "../ui/button";
import { RotateCwIcon } from "lucide-react";

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
      {isLoading && <RotateCwIcon className="mx-auto h-5 w-5 animate-spin" />}
      {!isLoading && "Sign Out"}
    </Button>
  );
};
