import * as z from "zod";

export const registrationSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export const registrationDefaultValues: RegistrationData = {
  name: "",
  email: "",
};
