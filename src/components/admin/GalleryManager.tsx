"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import DeleteButton from "./DeleteButton";

type GalleryImage = { id: string; code: string; caption: string; src: string };

export default function GalleryManager({ initial }: { initial: GalleryImage[] }) {
  const router = useRouter();
  const [images, setImages] = useState(initial);
  const [code, setCode] = useState("");
  const [caption, setCaption] = useState("");
  const [src, setSrc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!code.trim() || !caption.trim() || !src) {
      setError("Code, caption, and an image are all required");
      return;
    }
    setSaving(true);
    setError(null);

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim(), caption: caption.trim(), src }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to add image");
      return;
    }

    const data = await res.json();
    setImages((prev) => [...prev, data.image]);
    setCode("");
    setCaption("");
    setSrc("");
    router.refresh();
  }

  return (
    <div>
      <div className="rounded-md border border-line bg-white p-6">
        <h2 className="font-display text-base font-semibold text-navy">Add image</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-navy">Code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. PHOTO 10"
              className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy">Caption</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <ImageUploadField label="Image" value={src} onChange={setSrc} />
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="button"
          onClick={handleAdd}
          disabled={saving}
          className="mt-4 flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          <Plus size={16} /> {saving ? "Adding…" : "Add to gallery"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-md border border-line bg-white">
            <img src={img.src} alt={img.caption} className="aspect-4/3 w-full object-cover" />
            <div className="p-3">
              <p className="spec-tag text-steel-light">{img.code}</p>
              <p className="mt-1 truncate text-xs text-steel">{img.caption}</p>
            </div>
            <div className="absolute right-2 top-2 rounded-full bg-white/90 opacity-0 group-hover:opacity-100">
              <DeleteButton endpoint={`/api/admin/gallery/${img.id}`} confirmLabel={img.code} />
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <p className="col-span-full py-10 text-center text-steel-light">No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
