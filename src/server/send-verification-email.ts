import { VerificationEmail } from "@/components/email/verification-email";
import { env } from "@/env.mjs";
import { Resend } from "resend";
import { type SendVerificationRequestParams } from "next-auth/providers";

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
