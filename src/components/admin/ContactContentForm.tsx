"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

type ContactValues = {
  heroHeading: string;
  heroDescription: string;
  address: string;
  phones: string[];
  email: string;
  hours: string;
  whatsappNumber: string;
  whatsappMessage: string;
  mapEmbedQuery: string;
};

export default function ContactContentForm({ initial }: { initial: ContactValues }) {
  const router = useRouter();
  const [values, setValues] = useState<ContactValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save");
      }

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <div>
        <label className="text-xs font-semibold text-navy">Hero heading</label>
        <textarea
          required
          rows={2}
          value={values.heroHeading}
          onChange={(e) => update("heroHeading", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Hero description</label>
        <textarea
          required
          rows={2}
          value={values.heroDescription}
          onChange={(e) => update("heroDescription", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Address</label>
        <textarea
          required
          rows={2}
          value={values.address}
          onChange={(e) => update("address", e.target.value)}
          className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Phone numbers</label>
        <div className="mt-1.5 flex flex-col gap-2">
          {values.phones.map((phone, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={phone}
                onChange={(e) => {
                  const next = [...values.phones];
                  next[i] = e.target.value;
                  update("phones", next);
                }}
                className="w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => update("phones", values.phones.filter((_, idx) => idx !== i))}
                className="text-steel hover:text-red-600"
                aria-label="Remove phone number"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("phones", [...values.phones, ""])}
            className="flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Plus size={14} /> Add phone number
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold text-navy">Email</label>
          <input
            required
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy">Hours</label>
          <input
            required
            value={values.hours}
            onChange={(e) => update("hours", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-xs font-semibold text-navy">WhatsApp number (digits only, no +)</label>
          <input
            value={values.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
            placeholder="2348052507358"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-navy">WhatsApp default message</label>
          <input
            value={values.whatsappMessage}
            onChange={(e) => update("whatsappMessage", e.target.value)}
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-navy">Map location (Google Maps embed query)</label>
        <input
          required
          value={values.mapEmbedQuery}
          onChange={(e) => update("mapEmbedQuery", e.target.value)}
          placeholder="Warri, Delta State, Nigeria"
          className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-primary">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-fit rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
