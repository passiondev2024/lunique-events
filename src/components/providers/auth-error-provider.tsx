"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { paths } from "@/routes/paths";

import { useToast } from "../ui/use-toast";

export const AuthErrorProvider = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      if (error === "OAuthAccountNotLinked") {
        toast({
          variant: "destructive",
          title: "Email Already in Use",
          description:
            "This email is already associated with an account. Please try logging in using this email or reach out to our support team for assistance. Thank you!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description:
            "Please try again or reach out to our support team for assistance. Thank you!",
        });
      }
      router.replace(paths.auth.signIn);
    }
  }, [error, router, toast]);

  return null;
};
