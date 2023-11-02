import { RenderGalleryImages } from "@/components/partials/gallery/render-gallery-images";
import { SelfieUploadCard } from "@/components/partials/gallery/selfie-upload-card";
import { events, images } from "@/lib/data";
import { paths } from "@/routes/paths";
import { redirect } from "next/navigation";

export default function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  const event = events[Number(galleryId)];

  if (!event) return redirect(paths.root);

  return (
    <main className="dark grid gap-3 bg-background p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {galleryId && <SelfieUploadCard galleryId={galleryId} />}
      {images && <RenderGalleryImages images={images} galleryId={galleryId} />}
    </main>
  );
}
