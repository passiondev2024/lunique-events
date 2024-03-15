import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";

export default function EventIdRootPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  return redirect(paths.events.overview(params.eventId));
}
