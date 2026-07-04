import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { services, getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/10 via-navy/20 to-navy/30" />
        <div className="container-page relative">
          <Link
            href="/services"
            className="mb-6 flex w-fit items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-sky"
          >
            <ArrowLeft size={14} /> All services
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-sky/30 bg-white/5">
              <ServiceIcon icon={service.icon} size={26} className="text-sky" />
            </span>
            <div>
              <p className="spec-tag text-sky">{service.code}</p>
              <h1 className="mt-1 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-steel">{service.summary}</p>

            <h2 className="mt-10 font-display text-xl font-semibold text-navy">Scope of work</h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-steel">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-md border border-line bg-paper p-6">
              <p className="spec-tag text-steel-light">Discuss this scope</p>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                Send us your site details and specification for a technical response
                from our engineering team.
              </p>
              <Link
                href="/contact"
                className="mt-5 flex w-fit items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
            </div>

            <Link
              href={`/services/${next.slug}`}
              className="group flex flex-col gap-2 rounded-md border border-line bg-white p-6 hover:border-primary"
            >
              <span className="spec-tag text-steel-light">Next service</span>
              <span className="flex items-center justify-between font-display text-base font-semibold text-navy group-hover:text-primary">
                {next.title}
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}