"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Trash2, Mail, MailOpen, Archive } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  source: "CONTACT" | "PARTNERSHIP" | "JOB_APPLICATION";
  message: string;
  status: "UNREAD" | "READ" | "ARCHIVED";
  createdAt: Date;
};

const SOURCE_LABEL: Record<Message["source"], string> = {
  CONTACT: "General",
  PARTNERSHIP: "Partnership",
  JOB_APPLICATION: "Job application",
};

export default function MessageRow({ message }: { message: Message }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(status: Message["status"]) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to update message");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update message");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete message from ${message.name}?`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/messages/${message.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to delete message");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message");
      setBusy(false);
    }
  }

  function toggleExpand() {
    setExpanded((e) => !e);
    if (!expanded && message.status === "UNREAD") updateStatus("READ");
  }

  return (
    <div className={`rounded-md border border-line bg-white ${message.status === "UNREAD" ? "border-l-4 border-l-primary" : ""}`}>
      <button
        type="button"
        onClick={toggleExpand}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <p className={`truncate text-sm ${message.status === "UNREAD" ? "font-semibold text-navy" : "font-medium text-steel"}`}>
            {message.name} <span className="font-normal text-steel-light">— {message.email}</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-steel-light">
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                message.source === "CONTACT"
                  ? "bg-paper text-steel"
                  : message.source === "PARTNERSHIP"
                    ? "bg-primary-light text-primary"
                    : "bg-sky/15 text-sky"
              }`}
            >
              {SOURCE_LABEL[message.source]}
            </span>
            {message.source === "CONTACT" && (message.service ?? "General enquiry")} ·{" "}
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
        {expanded ? <ChevronUp size={18} className="shrink-0 text-steel" /> : <ChevronDown size={18} className="shrink-0 text-steel" />}
      </button>

      {expanded && (
        <div className="border-t border-line px-5 py-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-steel">{message.message}</p>

          {(message.phone || message.company) && (
            <p className="mt-3 text-xs text-steel-light">
              {message.phone && <>Phone: {message.phone} </>}
              {message.company && <>· Company: {message.company}</>}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {message.status === "ARCHIVED" ? (
              <button
                type="button"
                disabled={busy}
                onClick={() => updateStatus("READ")}
                className="flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-navy hover:border-primary disabled:opacity-50"
              >
                <Mail size={14} /> Unarchive
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => updateStatus(message.status === "UNREAD" ? "READ" : "UNREAD")}
                  className="flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-navy hover:border-primary disabled:opacity-50"
                >
                  {message.status === "UNREAD" ? <MailOpen size={14} /> : <Mail size={14} />}
                  Mark {message.status === "UNREAD" ? "read" : "unread"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => updateStatus("ARCHIVED")}
                  className="flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-navy hover:border-primary disabled:opacity-50"
                >
                  <Archive size={14} /> Archive
                </button>
              </>
            )}
            <button
              type="button"
              disabled={busy}
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-600 disabled:opacity-50"
            >
              <Trash2 size={14} /> Delete
            </button>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
