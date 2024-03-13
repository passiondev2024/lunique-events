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
  );
}
