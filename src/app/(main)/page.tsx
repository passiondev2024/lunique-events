import { paths } from "@/routes/paths";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(paths.dashboard.root);
}
