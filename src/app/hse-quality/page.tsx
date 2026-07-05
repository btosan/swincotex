import type { Metadata } from "next";
import { ShieldCheck, Award, ClipboardCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "HSE & Quality",
  description:
    "Swincotex safety and quality programme — a standardized project safety structure, 1.6 million man-hours without a lost time accident, and an ISO 9001 quality management system.",
};

export default function HseQualityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80"
          alt="Swincotex project site with safety signage and PPE compliance"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/30 via-navy/40 to-navy/50" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">HSE / Health, Safety, Environment &amp; Quality</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Safety and quality are engineered in, not inspected in.
          </h1>
        </div>

        <div className="relative border-t border-white/10 bg-navy-2/60">
          <div className="container-page grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-3xl font-bold text-sky">1.6M+</p>
              <p className="mt-1.5 text-xs leading-snug text-white/55">
                Man-hours worked across our existing projects without a lost time accident
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-sky">ISO 9001</p>
              <p className="mt-1.5 text-xs leading-snug text-white/55">
                Quality management system operated for many years
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-sky">100%</p>
              <p className="mt-1.5 text-xs leading-snug text-white/55">
                Project sites monitored under our safety &amp; controls department
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Health & Safety" title="Our safety programme" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="overflow-hidden rounded-md border border-line bg-white">
              <div className="relative h-40 w-full">
                <img
                  src="/assets/company-img/safety.jpg"
                  alt="Awincotex project site with safety signage and PPE compliance"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7">
                <ShieldCheck size={24} className="text-primary" />
                <h3 className="mt-4 font-display text-base font-semibold text-navy">
                  Safety &amp; Controls Department
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  A dedicated department monitors and supports all our project sites,
                  embedding safety oversight directly into daily site operations.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-line bg-white">
              <div className="relative h-40 w-full">
                <img
                  src="/assets/company-img/safety-checklist.png"
                  alt="Swincotex safety checklist and project site inspection"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7">
                <ClipboardCheck size={24} className="text-primary" />
                <h3 className="mt-4 font-display text-base font-semibold text-navy">
                  Standardized Safety Structure
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  We implement a standardized project safety programme structure
                  consistently across all our projects, regardless of client or site.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-line bg-white">
              <div className="relative h-40 w-full">
                <img
                  src="/assets/company-img/proven.png"
                  alt="Swincotex project site with safety signage and PPE compliance"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7">
                <Award size={24} className="text-primary" />
                <h3 className="mt-4 font-display text-base font-semibold text-navy">
                  A Proven Record
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">
                  Our existing projects have worked a total of 1.6 million man-hours
                  without a lost time accident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Quality" title="ISO 9001 quality system" />
            <p className="mt-6 text-base leading-relaxed text-steel">
              Swincotex is committed to the principle of providing all our clients
              with quality services and products, ensuring the achievement of agreed
              specifications. For many years, we have operated a quality system to
              ISO 9001 — and by doing so, we intend to remain a market leader by
              pursuing a programme of continuous quality improvement.
            </p>
            <div className="mt-8 overflow-hidden rounded-md border border-line">
              <img
                src="/assets/company-img/iso.png"
                alt="SwincotexISO 9001 quality management system certification"
                className="h-56 w-full object-cover"
              />
            </div>
          </div>
          <div className="rounded-md border border-line bg-navy p-8">
            <p className="spec-tag text-sky">Our Commitment</p>
            <ul className="mt-5 flex flex-col gap-4">
              {[
                "Deliver to agreed specifications on every project",
                "Operate a documented ISO 9001 quality management system",
                "Pursue continuous quality improvement, project over project",
                "Maintain full technical support and after-sales service",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}