import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Technical and labour supply services to the oil and gas industry — process, mechanical, civil, inspection engineering, EPC, well head and maintenance services.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 to-navy" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">Service Index</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Technical &amp; labour supply services, end to end.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Twelve disciplines covering engineering, fabrication, construction, and
            maintenance for the oil and gas industry — delivered by our teams out of
            our Warri fabrication yard.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="DWG-INDEX" title="All service lines" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-navy">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent" />

                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 bg-white/10 backdrop-blur-sm">
                    <ServiceIcon icon={s.icon} size={18} className="text-sky" />
                  </span>
                  <span className="spec-tag absolute right-3 top-3 text-white/70">{s.code}</span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <h3 className="font-display text-lg font-semibold leading-snug text-navy">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-steel">{s.short}</p>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View scope <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}