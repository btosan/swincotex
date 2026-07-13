"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

export type TeamMemberFormValues = {
  id?: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string;
  isCeo: boolean;
  order: number;
};

const EMPTY_VALUES: TeamMemberFormValues = {
  name: "",
  role: "",
  image: "",
  imageAlt: "",
  bio: "",
  isCeo: false,
  order: 0,
};

export default function TeamMemberForm({ initial }: { initial?: TeamMemberFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<TeamMemberFormValues>(initial ?? EMPTY_VALUES);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof TeamMemberFormValues>(key: K, value: TeamMemberFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/team/${initial!.id}` : "/api/admin/team";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save team member");
      }

      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold text-navy">Name</label>
          <input
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy">Role / title</label>
          <input
            required
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
      </div>

      <ImageUploadField label="Photo" value={values.image} onChange={(url) => update("image", url)} />

      <div>
        <label className="text-xs font-semibold text-navy">Photo alt text</label>
        <input
          required
          value={values.imageAlt}
          onChange={(e) => update("imageAlt", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Bio (optional — shown for the featured CEO card only)</label>
        <textarea
          rows={3}
          value={values.bio}
          onChange={(e) => update("bio", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-navy">
        <input
          type="checkbox"
          checked={values.isCeo}
          onChange={(e) => update("isCeo", e.target.checked)}
          className="h-4 w-4 rounded-sm border-line accent-primary"
        />
        Feature as CEO (large card at top of the About page team section)
      </label>

      <div>
        <label className="text-xs font-semibold text-navy">Display order</label>
        <input
          type="number"
          value={values.order}
          onChange={(e) => update("order", Number(e.target.value))}
          className="mt-1.5 w-32 rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add team member"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-sm border border-line px-6 py-3 text-sm font-semibold text-steel hover:border-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
