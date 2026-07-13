"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

type Card = { icon: "Target" | "Eye" | "Factory"; title: string; description: string };
type CapabilityGroup = { heading: string; items: string[] };

type AboutValues = {
  heroEyebrow: string;
  heroHeading: string;
  introParagraphs: string[];
  cards: Card[];
  capabilityEyebrow: string;
  capabilityTitle: string;
  capabilityDescription: string;
  capabilityGroups: CapabilityGroup[];
  leadershipEyebrow: string;
  leadershipTitle: string;
  leadershipDescription: string;
};

export default function AboutContentForm({ initial }: { initial: AboutValues }) {
  const router = useRouter();
  const [values, setValues] = useState<AboutValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof AboutValues>(key: K, value: AboutValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/about", {
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
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-10">
      {/* Hero */}
      <section>
        <h2 className="font-display text-base font-semibold text-navy">Hero</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-navy">Eyebrow label</label>
            <input
              value={values.heroEyebrow}
              onChange={(e) => update("heroEyebrow", e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy">Heading</label>
            <textarea
              required
              rows={2}
              value={values.heroHeading}
              onChange={(e) => update("heroHeading", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* Intro paragraphs */}
      <section>
        <h2 className="font-display text-base font-semibold text-navy">"Who we are" paragraphs</h2>
        <div className="mt-4 flex flex-col gap-3">
          {values.introParagraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                rows={3}
                value={p}
                onChange={(e) => {
                  const next = [...values.introParagraphs];
                  next[i] = e.target.value;
                  update("introParagraphs", next);
                }}
                className="w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => update("introParagraphs", values.introParagraphs.filter((_, idx) => idx !== i))}
                className="shrink-0 text-steel hover:text-red-600"
                aria-label="Remove paragraph"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("introParagraphs", [...values.introParagraphs, ""])}
            className="flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Plus size={14} /> Add paragraph
          </button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="font-display text-base font-semibold text-navy">
          Aspiration / Approach / Base cards
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {values.cards.map((card, i) => (
            <div key={i} className="rounded-md border border-line p-4">
              <div className="flex items-center justify-between">
                <select
                  value={card.icon}
                  onChange={(e) => {
                    const next = [...values.cards];
                    next[i] = { ...card, icon: e.target.value as Card["icon"] };
                    update("cards", next);
                  }}
                  className="rounded-sm border border-line px-2.5 py-1.5 text-xs text-navy outline-none focus:border-primary"
                >
                  <option value="Target">Target</option>
                  <option value="Eye">Eye</option>
                  <option value="Factory">Factory</option>
                </select>
                <button
                  type="button"
                  onClick={() => update("cards", values.cards.filter((_, idx) => idx !== i))}
                  className="text-steel hover:text-red-600"
                  aria-label="Remove card"
                >
                  <X size={16} />
                </button>
              </div>
              <input
                value={card.title}
                onChange={(e) => {
                  const next = [...values.cards];
                  next[i] = { ...card, title: e.target.value };
                  update("cards", next);
                }}
                placeholder="Card title"
                className="mt-3 w-full rounded-sm border border-line px-3.5 py-2 text-sm text-navy outline-none focus:border-primary"
              />
              <textarea
                rows={2}
                value={card.description}
                onChange={(e) => {
                  const next = [...values.cards];
                  next[i] = { ...card, description: e.target.value };
                  update("cards", next);
                }}
                placeholder="Card description"
                className="mt-2 w-full resize-none rounded-sm border border-line px-3.5 py-2 text-sm text-navy outline-none focus:border-primary"
              />
            </div>
          ))}
          {values.cards.length < 3 && (
            <button
              type="button"
              onClick={() =>
                update("cards", [...values.cards, { icon: "Target", title: "", description: "" }])
              }
              className="flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <Plus size={14} /> Add card
            </button>
          )}
        </div>
      </section>

      {/* Capability section */}
      <section>
        <h2 className="font-display text-base font-semibold text-navy">Capability section</h2>
        <div className="mt-4 flex flex-col gap-4">
          <input
            value={values.capabilityEyebrow}
            onChange={(e) => update("capabilityEyebrow", e.target.value)}
            placeholder="Eyebrow label"
            className="w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
          <input
            required
            value={values.capabilityTitle}
            onChange={(e) => update("capabilityTitle", e.target.value)}
            placeholder="Section title"
            className="w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
          <textarea
            required
            rows={2}
            value={values.capabilityDescription}
            onChange={(e) => update("capabilityDescription", e.target.value)}
            placeholder="Section description"
            className="w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />

          {values.capabilityGroups.map((group, i) => (
            <div key={i} className="rounded-md border border-line p-4">
              <div className="flex items-center justify-between gap-2">
                <input
                  value={group.heading}
                  onChange={(e) => {
                    const next = [...values.capabilityGroups];
                    next[i] = { ...group, heading: e.target.value };
                    update("capabilityGroups", next);
                  }}
                  placeholder="Group heading (e.g. Mechanical works)"
                  className="w-full rounded-sm border border-line px-3.5 py-2 text-sm text-navy outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => update("capabilityGroups", values.capabilityGroups.filter((_, idx) => idx !== i))}
                  className="shrink-0 text-steel hover:text-red-600"
                  aria-label="Remove group"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {group.items.map((item, j) => (
                  <div key={j} className="flex gap-2">
                    <input
                      value={item}
                      onChange={(e) => {
                        const nextItems = [...group.items];
                        nextItems[j] = e.target.value;
                        const next = [...values.capabilityGroups];
                        next[i] = { ...group, items: nextItems };
                        update("capabilityGroups", next);
                      }}
                      className="w-full rounded-sm border border-line px-3 py-1.5 text-xs text-navy outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...values.capabilityGroups];
                        next[i] = { ...group, items: group.items.filter((_, idx) => idx !== j) };
                        update("capabilityGroups", next);
                      }}
                      className="text-steel hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next = [...values.capabilityGroups];
                    next[i] = { ...group, items: [...group.items, ""] };
                    update("capabilityGroups", next);
                  }}
                  className="flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <Plus size={12} /> Add item
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => update("capabilityGroups", [...values.capabilityGroups, { heading: "", items: [] }])}
            className="flex w-fit items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Plus size={14} /> Add capability group
          </button>
        </div>
      </section>

      {/* Leadership section header */}
      <section>
        <h2 className="font-display text-base font-semibold text-navy">Leadership section header</h2>
        <p className="mt-1 text-xs text-steel-light">
          The team members and CEO shown here come from the Team page, not this form.
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <input
            value={values.leadershipEyebrow}
            onChange={(e) => update("leadershipEyebrow", e.target.value)}
            placeholder="Eyebrow label"
            className="w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
          <input
            required
            value={values.leadershipTitle}
            onChange={(e) => update("leadershipTitle", e.target.value)}
            placeholder="Section title"
            className="w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
          <textarea
            required
            rows={2}
            value={values.leadershipDescription}
            onChange={(e) => update("leadershipDescription", e.target.value)}
            placeholder="Section description"
            className="w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          />
        </div>
      </section>

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
