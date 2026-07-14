"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      applicationType: formData.get("applicationType") as string,
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong — please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border border-line bg-white p-8 text-center">
        <CheckCircle2 size={40} className="text-primary" />
        <h3 className="mt-4 font-display text-lg font-semibold text-navy">Submission received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel">
          Thanks for reaching out — our team will review your submission and get back to you.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Send another submission
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-line bg-white p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="applicationType" className="text-xs font-semibold text-navy">
            I'm reaching out about
          </label>
          <select
            id="applicationType"
            name="applicationType"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="partnership">Partnership</option>
            <option value="job_application">Job application</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-xs font-semibold text-navy">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="Your name"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="company" className="text-xs font-semibold text-navy">
            Company <span className="font-normal text-steel-light">(if applicable)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="Company name"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-xs font-semibold text-navy">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="you@example.com"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-xs font-semibold text-navy">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="+234"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold text-navy">
            Tell us more
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
            placeholder="For partnerships: what you have in mind and how it fits our work. For job applications: the role you're applying for and your relevant experience."
          />
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" && <Loader2 size={15} className="animate-spin" />}
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
