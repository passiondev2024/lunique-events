import { z } from "zod";

export const eventSettingsSchema = z.object({
  isPublic: z.boolean(),
  isWatermarkHidden: z.boolean(),
});

export type EventSettingsFields = z.infer<typeof eventSettingsSchema>;
