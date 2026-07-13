import { prisma } from "@/lib/prisma";
import GalleryManager from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <p className="spec-tag text-primary">Content</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Gallery</h1>

      <div className="mt-8">
        <GalleryManager initial={images} />
      </div>
    </div>
  );
}
