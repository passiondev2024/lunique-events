import { z } from "zod";

export const createEventSchema = z.object({
  name: z
    .string({ required_error: "Please enter event name." })
    .min(3, { message: "Event name must contain at least 3 characters." }),
  date: z.date(),
  location: z.string(),
});

export type CreateEventFields = z.infer<typeof createEventSchema>;
