export default function EventIdPag({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  return <div>Event ID: {params.eventId}</div>;
}
