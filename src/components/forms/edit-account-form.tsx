"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

export const EditAccountForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input defaultValue="Nikola Mladenovic" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update name</Button>
      </form>
    </Form>
  );
};
