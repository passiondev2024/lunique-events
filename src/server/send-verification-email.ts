import { type SendVerificationRequestParams } from "next-auth/providers";
import { Resend } from "resend";

import { VerificationEmail } from "@/components/email/verification-email";
import { env } from "@/env.mjs";

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);

export async function sendVerificationRequest({
  identifier,
  provider,
  url,
}: SendVerificationRequestParams) {
  await resend.emails.send({
    from: `Better Event <${provider.from}>`,
    to: [identifier],
    subject: "Better Event Magic Link",
    react: VerificationEmail({ magicLink: url }),
  });
}
