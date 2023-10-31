import { paths } from "@/routes/paths";
import { redirect } from "next/navigation";

export default function AccountPage() {
  return redirect(paths.account.settings);
}
