import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import ImageCarousel from "@/components/ImageCarousel";
import { services } from "@/lib/services-data";
import { projects } from "@/lib/projects-data";

const stats = [
  { value: "1.6M+", label: "Man-hours without a lost time accident" },
  { value: "20+", label: "Field & technical personnel" },
  { value: "12", label: "Core service disciplines" },
  { value: "ISO 9001", label: "Quality management system" },
];

// de-sanding of a 25,000-barrel crude oil storage tank, Addax Izombe Flow Station
export default function HomePage() {
  return (
    <>
{/* Hero */}
<section className="relative isolate flex min-h-150 items-end overflow-hidden bg-navy">
  {/* Full-bleed commanding photo */}
  <img
    src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2400&auto=format&fit=crop"
    alt="Oil and gas fabrication yard with structural steelwork under construction"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Single soft gradient for text legibility only */}
  <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/20 to-navy/10" />

  <div className="container-page relative w-full pb-20 pt-24 md:pt-28 lg:pb-28">
    <div className="max-w-3xl">
      {/* <p className="spec-tag text-sky">Warri, Delta State &middot; Since Inception</p> */}

      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
        EPC &amp; field services for Nigeria&rsquo;s oil and gas.
      </h1>

      <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
        Process, mechanical, civil and inspection engineering, fabrication, and
        well head services — from feasibility through turnkey construction.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Request a Quote
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/services"
          className="flex items-center gap-2 rounded-sm border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-sky hover:text-sky"
        >
          Explore Our Services
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Stats strip */}
      <div className="relative bg-navy">
        <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-semibold md:font-bold text-sky sm:text-3xl">{s.value}</p>
              <p className="mt-1.5 text-xs leading-snug text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

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

      {/* About teaser */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Company Profile"
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
              src="/assets/company-img/swin-building and civil.png"
              alt="Oil platform at sea representing Swincotex's oil and gas operations"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="blueprint-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-linear-to-t from-navy/20 via-navy/10 to-transparent" />
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
            eyebrow="Services"
            title="Twelve disciplines, one contractor."
            description="From process engineering to civil construction, our teams cover the full scope of technical and labour supply services the oil and gas industry needs on site."
            light
          />

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col bg-navy transition-colors hover:bg-navy-2"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/20 via-navy/10 to-navy/5" />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 bg-white/10 backdrop-blur-sm">
                    <ServiceIcon icon={s.icon} size={18} className="text-sky" />
                  </span>
                  <span className="spec-tag absolute right-4 top-4 text-white/60">{s.code}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55">{s.short}</p>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-sky opacity-0 transition-opacity group-hover:opacity-100">
                    View scope <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
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

          <div className="relative mt-10 aspect-21/9 w-full overflow-hidden rounded-md border border-line bg-navy">
            <img
              src="/assets/company-img/swincotex.png"
              alt="Excavator carrying out pipeline construction and tie-in works"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-navy/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="spec-tag text-sky">Site Reference</p>
              <p className="mt-1.5 text-sm font-medium text-white/90">
                Pipeline tie-in and integrity works, Niger Delta
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border border-line">
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
      <section className="relative overflow-hidden border-t border-line py-20">
        <img
          src="https://images.unsplash.com/photo-1644221150186-5d785a471f44?q=80&w=1600&auto=format&fit=crop"
          alt="Building under construction next to a tower crane"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-light/95" />
        <div className="container-page relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
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