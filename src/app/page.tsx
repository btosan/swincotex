import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import ImageCarousel from "@/components/ImageCarousel";
import { services } from "@/lib/services-data";
import { projects } from "@/lib/projects-data";

const stats = [
  { value: "1.6M+", label: "Man-hours without a lost time accident" },
  { value: "20+", label: "Field & technical personnel" },
  { value: "9", label: "Core service disciplines" },
  { value: "ISO 9001", label: "Quality management system" },
];

// de-sanding of a 25,000-barrel crude oil storage tank, Addax Izombe Flow Station
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="blueprint-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/80 to-navy" />

        <div className="container-page relative py-24 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7 ">
              <div className="mb-5 flex justify-center md:justify-start">
                <p className="spec-tag inline-flex items-center gap-2 rounded-sm border border-sky/30 bg-white/5 px-3 py-1.5 text-sky">
                  Oil & Gas
                </p>
              </div>
              <h1 className="max-w-3xl text-center md:text-start font-display text-3xl md:text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                EPC & field services for Nigeria's oil and gas.
              </h1>
              <p className="mt-6 text-center md:text-start max-w-xl text-base md:text-lg leading-relaxed text-white/65">
                Process, mechanical, civil and inspection engineering, fabrication, and well head services — from feasibility through turnkey construction.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Request a Quote
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-2 rounded-sm border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-sky hover:text-sky"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>

            {/* Hero photo */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-sky/20 bg-navy-2">
                <img
                  src="https://images.unsplash.com/photo-1507497806295-753c4108560c?q=80&w=1200&auto=format&fit=crop"
                  alt="Welder in protective gear working on-site at a Swincotex project"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/10 to-transparent" />

                <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-sky/80" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-sky/80" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="spec-tag text-sky">PHOTO 01 &middot; Site Works</p>
                  <p className="mt-1.5 text-sm font-medium text-white/90">
                    Fabrication and pipe welding, Warri workshop
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative border-t border-white/10 bg-navy-2/60">
          <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-sky sm:text-3xl">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="DWG-00A / Company Profile"
              title="A fast-growing indigenous oil & gas service company."
              description="Based in Warri, Delta State, Swincotex aspires to be one of the fastest growing firms among indigenous oil and gas service organizations — providing project management, engineering, procurement and construction services for the oil & gas industry, power plants, buildings, general civil works, and offshore light industry."
            />
            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Owns and operates an engineering workshop and fabrication yard in Warri",
                "Standardized project safety programme across all sites",
                "Operating a quality system to ISO 9001",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-steel">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              More about Swincotex <ArrowRight size={15} />
            </Link>
          </div>

          <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-line bg-navy">
            <img
              src="https://images.unsplash.com/photo-1772376920846-8925e03c3fcf?q=80&w=1200&auto=format&fit=crop"
              alt="Crude oil storage tanks at an industrial site"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="blueprint-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="spec-tag text-sky">Field Note</p>
              <p className="mt-2 font-display text-xl font-semibold text-white">
                De-sanding of a 25,000-barrel crude oil storage tank, Addax Izombe Flow Station
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Services grid */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Service Index"
            title="Nine disciplines, one contractor."
            description="From process engineering to civil construction, our teams cover the full scope of technical and labour supply services the oil and gas industry needs on site."
            light
          />

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-4 bg-navy p-7 transition-colors hover:bg-navy-2"
              >
                <div className="flex items-center justify-between">
                  <ServiceIcon icon={s.icon} size={26} className="text-sky" />
                  <span className="spec-tag text-white/30">{s.code}</span>
                </div>
                <h3 className="font-display text-base font-semibold leading-snug text-white">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{s.short}</p>
                <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-sky opacity-0 transition-opacity group-hover:opacity-100">
                  View scope <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Field gallery */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Field Documentation"
            title="From foundation to commissioning."
            description="A record of the work itself — fabrication, welding, civil and integrity works captured on site across our current and completed projects."
          />
          <div className="mt-12">
            <ImageCarousel />
          </div>
        </div>
      </section>

      {/* Projects teaser */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Project Experience"
              title="Delivered on Shell, Agip, and Addax operated sites."
              description="A track record of manifold, flare, and integrity works executed for major operators and their main contractors across the Niger Delta."
            />
            <Link
              href="/projects"
              className="flex shrink-0 items-center gap-2 rounded-sm border border-line px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-primary hover:text-primary"
            >
              Full project list <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12 overflow-x-auto rounded-md border border-line">
            <table className="w-full min-w-180 border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-paper text-left">
                  <th className="spec-tag px-5 py-3.5 font-medium text-steel-light">Ref</th>
                  <th className="spec-tag px-5 py-3.5 font-medium text-steel-light">Location</th>
                  <th className="spec-tag px-5 py-3.5 font-medium text-steel-light">Scope</th>
                  <th className="spec-tag px-5 py-3.5 font-medium text-steel-light">Duration</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.code} className="border-b border-line last:border-0">
                    <td className="spec-tag px-5 py-4 align-top text-sky">{p.code}</td>
                    <td className="px-5 py-4 align-top font-medium text-navy">{p.location}</td>
                    <td className="px-5 py-4 align-top text-steel">{p.title}</td>
                    <td className="spec-tag px-5 py-4 align-top text-steel-light">{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-primary-light py-20">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Have a project scope ready?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-steel">
              Send us your specification and site details — our engineering team will
              respond with scope, timeline, and a technical point of contact.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex shrink-0 items-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}