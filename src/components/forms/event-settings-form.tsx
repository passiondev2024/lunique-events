"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EventSettings } from "@prisma/client";
import { RotateCwIcon, SaveIcon } from "lucide-react";

import { api } from "@/trpc/react";
import {
  type EventSettingsFields,
  eventSettingsSchema,
} from "@/validation/event-settings";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Switch } from "../ui/switch";
import { useToast } from "../ui/use-toast";

interface EventSettingsFormProps {
  settings: EventSettings;
}

export const EventSettingsForm = ({ settings }: EventSettingsFormProps) => {
  const form = useForm<EventSettingsFields>({
    resolver: zodResolver(eventSettingsSchema),
  });

  useEffect(() => {
    form.setValue("isPublic", settings.isPublic);
    form.setValue("isWatermarkHidden", settings.isWatermarkHidden);
  }, [settings, form]);

  const { toast } = useToast();

  const mutation = api.event.updateSettings.useMutation();

  const onSubmit = (values: EventSettingsFields) => {
    mutation.mutate(
      { id: settings.eventId, ...values },
      {
        onSuccess: (_event) => {
          toast({
            title: `Settings updated!`,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update settings!",
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-lg font-medium">Make the gallery public</p>
                  <p className="text-sm text-zinc-500">
                    Allow anyone to view your gallery. Turing this off will make
                    your gallery not accessible to anyone.
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isWatermarkHidden"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-lg font-medium">
                    Hide Better Event
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Hide &quot;Made with Better Event&quot; badge in your
                    gallery.
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled
                  />
                </FormControl>
              </div>
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
