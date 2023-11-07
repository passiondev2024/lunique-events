"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { CheckCheckIcon, RotateCwIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/paths";
import {
  createEventSchema,
  type CreateEventFields,
} from "@/validation/create-event";

export const CreateEventForm = () => {
  const form = useForm<CreateEventFields>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      location: "",
    },
  });

  const { toast } = useToast();
  const { onClose } = useModal();
  const router = useRouter();
  const mutation = api.event.create.useMutation();

  const onSubmit = (values: CreateEventFields) => {
    mutation.mutate(values, {
      onSuccess: (event) => {
        toast({
          title: event.name,
          description: "Congratulations, you have created a new event",
        });

        onClose();

        router.push(paths.events.event(event.id));
        router.refresh();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to create event. Please try again.",
        });
      },
    });
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
        <Button className="w-full" disabled={mutation.isLoading}>
          {mutation.isLoading && (
            <RotateCwIcon className="mr-1.5 h-4 w-4 animate-spin" />
          )}
          {!mutation.isLoading && <CheckCheckIcon className="mr-1.5 h-4 w-4" />}
          Create Event
        </Button>
      </form>
    </Form>
  );
};
