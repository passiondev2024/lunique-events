"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Event } from "@prisma/client";
import { RotateCwIcon, SaveIcon } from "lucide-react";
import * as z from "zod";

import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z
    .string({ required_error: "Please enter event name." })
    .min(3, { message: "Event name must contain at least 3 characters." }),
  date: z.date(),
  location: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

interface EditEventFormProps {
  event: Event;
}

export const EditEventForm = ({ event }: EditEventFormProps) => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      location: "",
    },
  });

  useEffect(() => {
    form.setValue("name", event.name);
    form.setValue("date", event.date);
    form.setValue("location", event.location);
  }, [event, form]);

  const { toast } = useToast();

  const mutation = api.event.update.useMutation();

  const onSubmit = (values: FormFields) => {
    mutation.mutate(
      { ...values, id: event.id },
      {
        onSuccess: (_event) => {
          toast({
            title: `${_event.name} updated!`,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update event!",
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="M&N Wdding" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on to your guests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of the event</FormLabel>
              <FormControl>
                <DatePicker selected={field.value} onSelect={field.onChange} />
              </FormControl>
              <FormDescription>
                This is when the event took place.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location of the event</FormLabel>
              <FormControl>
                <Input placeholder="Belgrade" {...field} />
              </FormControl>
              <FormDescription>
                This is where the event took place.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isDirty || mutation.isLoading}>
          {!mutation.isLoading && <SaveIcon className="mr-1.5 size-5" />}
          {mutation.isLoading && (
            <RotateCwIcon className="mr-1.5 size-5 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
