"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";
import MultiImageField from "./MultiImageField";

export type ProjectFormValues = {
  id?: string;
  code: string;
  client: string;
  location: string;
  title: string;
  duration: string;
  image: string;
  gallery: string[];
  order: number;
};

const EMPTY_VALUES: ProjectFormValues = {
  code: "",
  client: "",
  location: "",
  title: "",
  duration: "",
  image: "",
  gallery: [],
  order: 0,
};

export default function ProjectForm({ initial }: { initial?: ProjectFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<ProjectFormValues>(initial ?? EMPTY_VALUES);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save project");
      }

      router.push("/admin/projects");
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
          <label className="text-xs font-semibold text-navy">Reference code</label>
          <input
            required
            value={values.code}
            onChange={(e) => update("code", e.target.value)}
            placeholder="e.g. PRJ-005"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy">Duration</label>
          <input
            required
            value={values.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="e.g. Jan – Mar 2026"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Client</label>
        <input
          required
          value={values.client}
          onChange={(e) => update("client", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Location</label>
        <input
          required
          value={values.location}
          onChange={(e) => update("location", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Project title / description</label>
        <textarea
          required
          rows={3}
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <ImageUploadField label="Cover image" value={values.image} onChange={(url) => update("image", url)} />

      <MultiImageField label="Gallery images" values={values.gallery} onChange={(urls) => update("gallery", urls)} />

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
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create project"}
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
