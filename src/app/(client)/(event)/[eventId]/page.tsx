export default function ClientEventIdPage({
  params: { eventId },
}: {
  params: {
    eventId: string;
  };
}) {
  return <div>{eventId} page</div>;
}
