"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";
import TiptapEditor from "./TiptapEditor";

export type PostFormValues = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  published: boolean;
};

const EMPTY_VALUES: PostFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverImageAlt: "",
  published: false,
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<PostFormValues>(initial ?? EMPTY_VALUES);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(publish: boolean) {
    setSaving(true);
    setError(null);

    const payload = { ...values, published: publish };

    try {
      const url = isEdit ? `/api/admin/news/${initial!.id}` : "/api/admin/news";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save post");
      }

      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(values.published);
      }}
      className="flex max-w-2xl flex-col gap-5"
    >
      <div>
        <label className="text-xs font-semibold text-navy">Title</label>
        <input
          required
          value={values.title}
          onChange={(e) => {
            const title = e.target.value;
            update("title", title);
            if (!isEdit) update("slug", slugify(title));
          }}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Slug (URL path)</label>
        <input
          required
          value={values.slug}
          onChange={(e) => update("slug", slugify(e.target.value))}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Excerpt (shown on the news list)</label>
        <textarea
          required
          rows={2}
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <ImageUploadField label="Cover image" value={values.coverImage} onChange={(url) => update("coverImage", url)} />

      <div>
        <label className="text-xs font-semibold text-navy">Cover image alt text</label>
        <input
          required
          value={values.coverImageAlt}
          onChange={(e) => update("coverImageAlt", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Content</label>
        <div className="mt-1.5">
          <TiptapEditor content={values.content} onChange={(html) => update("content", html)} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => submit(false)}
          disabled={saving}
          className="rounded-sm border border-line px-6 py-3 text-sm font-semibold text-navy hover:border-primary disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => submit(true)}
          disabled={saving}
          className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : values.published ? "Save (published)" : "Publish"}
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
