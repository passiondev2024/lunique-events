import { EmailSignInForm } from "@/components/forms/sign-in-form";
import { SocialSignInForm } from "@/components/forms/social-sign-in-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="mt-0.5 text-zinc-500">
            Enter your email below to create your account
          </p>
        </div>

        <EmailSignInForm />

        <div className="flex items-center gap-1.5">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="text-sm text-zinc-400">OR CONTINUE WITH</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <SocialSignInForm />

        <p className="text-center text-sm text-zinc-500">
          By signing in, you agree to our <br />
          <Link href="/" className="underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
