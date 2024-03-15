import { redirect } from "next/navigation";

import { paths } from "@/routes/paths";
import { api } from "@/trpc/server";

import { GallerySidebar } from "./_components/gallery-sidebar";
import { RenderGalleryImages } from "./_components/render-gallery-images";

export default async function GalleryIdPage({
  params,
}: {
  params: { galleryId: string };
}) {
  const { galleryId } = params;

  if (!galleryId) redirect(paths.gallery.error);

  const event = await api.event.get.query({ id: galleryId });
  const images = await api.event.getImages.query({ eventId: galleryId });

  if (!event || !images) redirect(paths.gallery.error);

  return (
    <main className="grid grid-cols-1 bg-background md:h-[calc(100vh-65px)] md:grid-cols-3">
      <div className="p-3 md:pr-0">
        <GallerySidebar event={event} images={images} />
      </div>

      <RenderGalleryImages event={event} images={images} />
    </main>
  );
}
