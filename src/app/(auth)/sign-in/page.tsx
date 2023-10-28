import { EmailSignInForm } from "@/components/forms/sign-in-form";
import { SocialSignInForm } from "@/components/forms/social-sign-in-form";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect("/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <div className="space-y-5 px-5 md:px-10">
            <EmailSignInForm />
            <div className="flex items-center gap-1.5">
              <div className="h-[1px] flex-1 bg-border" />
              <span className="text-sm text-zinc-400">OR CONTINUE WITH</span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <SocialSignInForm />
          </div>

          <CardFooter>
            <p className="mt-5 w-full text-center text-sm text-zinc-500">
              By signing in, you agree to our <br />
              <Link href="/" className="underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
