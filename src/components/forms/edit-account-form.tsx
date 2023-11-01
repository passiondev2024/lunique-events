"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

export const EditAccountForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const onSubmit = (values: FormFields) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit">Update Name</Button>
      </form>
    </Form>
  );
};
