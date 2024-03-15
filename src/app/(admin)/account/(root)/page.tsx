import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";

export default function AccountPage() {
  return redirect(paths.account.settings);
}
