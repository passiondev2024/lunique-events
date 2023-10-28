"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getCsrfToken } from "next-auth/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useCallback } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please add valid email." }),
});

type FormFields = z.infer<typeof formSchema>;

export const EmailSignInForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const successToast = useCallback(
    () =>
      toast({
        title: "We have sent you verification link",
        description:
          "Please check your email inbox, it also might be in your span folder!",
      }),
    [],
  );
  const errorToast = useCallback(
    () =>
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Email sign in failed. Try again!",
      }),
    [],
  );

  const onSubmit = async (values: FormFields) => {
    const csrfToken = await getCsrfToken();

    if (csrfToken) {
      const response = await axios.post("/api/auth/signin/email", {
        csrfToken,
        email: values.email,
      });

      if (response.status === 200) {
        successToast();
      } else {
        errorToast();
      }
    } else {
      errorToast();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-5 w-full">
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
};
