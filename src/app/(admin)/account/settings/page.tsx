import { EditAccountForm } from "@/components/forms/edit-account-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-zinc-500">Manage account settings</p>
      </header>

      <Card className="w-fit">
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-lg">
          <EditAccountForm />
        </CardContent>
      </Card>
    </div>
  );
}
