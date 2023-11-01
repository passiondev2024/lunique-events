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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { CheckCheckIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z
    .string({ required_error: "Please enter event name." })
    .min(3, { message: "Event name must contain at least 3 characters." }),
  date: z.date(),
  location: z.string(),
});

type FormFileds = z.infer<typeof formSchema>;

export const CreateEventForm = () => {
  const form = useForm<FormFileds>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      location: "",
    },
  });

  const { toast } = useToast();
  const { onClose } = useModal();

  const onSubmit = (values: FormFileds) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    onClose();
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
        <Button className="w-full">
          <CheckCheckIcon className="mr-1.5 h-4 w-4" /> Create Event
        </Button>
      </form>
    </Form>
  );
};
