"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

type FieldWork = { id: string; description: string };

export default function FieldWorksManager({ initial }: { initial: FieldWork[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function addItem() {
    if (!input.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/field-works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: input.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      setItems((prev) => [...prev, data.fieldWork]);
      setInput("");
      router.refresh();
    }
  }

  async function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await fetch(`/api/admin/field-works/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mt-12 rounded-md border border-line bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-navy">Additional field works</h2>
      <p className="mt-1 text-sm text-steel-light">
        Shown as the "Additional site works" list on the public Projects page.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder="Describe a field work item and press Enter"
          className="min-w-0 flex-1 rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-sm border border-line px-3.5 text-sm font-semibold text-navy hover:border-primary disabled:opacity-50"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-sm bg-paper px-3.5 py-2 text-sm text-steel">
            {item.description}
            <button type="button" onClick={() => removeItem(item.id)} aria-label="Remove">
              <X size={14} />
            </button>
          </li>
        ))}
        {items.length === 0 && <p className="text-sm text-steel-light">No field works listed yet.</p>}
      </ul>
    </div>
  );
}
