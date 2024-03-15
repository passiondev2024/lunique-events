import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";

export const useSignOut = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => router.refresh(),
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to sign out. Please try again.",
      }),
  });
};
