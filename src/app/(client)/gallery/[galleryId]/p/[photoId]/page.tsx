export default function ImagePage({
  params,
}: {
  params: { photoId: string; galleryId: string };
}) {
  const { photoId, galleryId } = params;

  return (
    <main>
      <p>Photo ID: {photoId}</p>
      <p>Gallery ID: {galleryId}</p>
    </main>
  );
}
