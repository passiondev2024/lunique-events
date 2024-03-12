import { paths } from "@/routes/paths";
import { redirect } from "next/navigation";

export default function EventIdRootPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  return redirect(paths.events.overview(params.eventId));
}
