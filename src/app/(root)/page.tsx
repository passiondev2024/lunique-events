import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";

export default function Home() {
  return redirect(paths.events.root);
}
