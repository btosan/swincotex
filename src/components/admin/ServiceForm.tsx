"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import { serviceIconOptions } from "@/lib/service-icon-map";
import type { ServiceIcon } from "@prisma/client";

export type ServiceFormValues = {
  id?: string;
  slug: string;
  code: string;
  title: string;
  short: string;
  summary: string;
  scope: string[];
  image: string;
  imageAlt: string;
  icon: ServiceIcon;
  order: number;
};

const EMPTY_VALUES: ServiceFormValues = {
  slug: "",
  code: "",
  title: "",
  short: "",
  summary: "",
  scope: [],
  image: "",
  imageAlt: "",
  icon: "wrench",
  order: 0,
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ServiceForm({ initial }: { initial?: ServiceFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<ServiceFormValues>(initial ?? EMPTY_VALUES);
  const [scopeInput, setScopeInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function addScopeItem() {
    if (!scopeInput.trim()) return;
    update("scope", [...values.scope, scopeInput.trim()]);
    setScopeInput("");
  }

  function removeScopeItem(index: number) {
    update("scope", values.scope.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/services/${initial!.id}` : "/api/admin/services";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save service");
      }

      router.push("/admin/services");
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
          <label className="text-xs font-semibold text-navy">Code</label>
          <input
            required
            value={values.code}
            onChange={(e) => update("code", e.target.value)}
            placeholder="e.g. 01"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
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
        <label className="text-xs font-semibold text-navy">Short description (card blurb)</label>
        <input
          required
          value={values.short}
          onChange={(e) => update("short", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Summary (full description)</label>
        <textarea
          required
          rows={4}
          value={values.summary}
          onChange={(e) => update("summary", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Scope items</label>
        <div className="mt-1.5 flex gap-2">
          <input
            value={scopeInput}
            onChange={(e) => setScopeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addScopeItem();
              }
            }}
            className="min-w-0 flex-1 rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="Add a scope item and press Enter"
          />
          <button
            type="button"
            onClick={addScopeItem}
            className="flex items-center gap-1.5 rounded-sm border border-line px-3.5 text-sm font-semibold text-navy hover:border-primary"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {values.scope.map((item, i) => (
            <li key={i} className="flex items-center justify-between rounded-sm bg-paper px-3.5 py-2 text-sm text-steel">
              {item}
              <button type="button" onClick={() => removeScopeItem(i)} aria-label="Remove item">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ImageUploadField label="Image" value={values.image} onChange={(url) => update("image", url)} />

      <div>
        <label className="text-xs font-semibold text-navy">Image alt text</label>
        <input
          required
          value={values.imageAlt}
          onChange={(e) => update("imageAlt", e.target.value)}
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Icon</label>
        <div className="mt-1.5 grid grid-cols-6 gap-2">
          {serviceIconOptions.map(([key, { component: Icon, label }]) => (
            <button
              key={key}
              type="button"
              onClick={() => update("icon", key)}
              title={label}
              className={`flex flex-col items-center gap-1 rounded-sm border p-3 text-[10px] text-steel ${
                values.icon === key ? "border-primary bg-primary-light text-primary" : "border-line hover:border-primary"
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

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
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
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
