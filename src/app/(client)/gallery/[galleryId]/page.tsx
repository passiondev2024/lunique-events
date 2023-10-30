export default function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  return <div>Gallery ID: {` ${galleryId}`}</div>;
}
