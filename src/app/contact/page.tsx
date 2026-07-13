import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Swincotex Oil and Gas Company Limited in Warri, Delta State, Nigeria.",
};

export const revalidate = 60;

// Falls back to this if the ContactContent row hasn't been created in
// the admin yet (e.g. fresh DB before the first save from /admin/contact).
const DEFAULTS = {
  heroHeading: "Tell us about your project and scope.",
  heroDescription:
    "Reach our engineering team directly, or send your specification through the form and we'll respond with scope, timeline, and next steps.",
  address:
    "100, Midwestern College of Maritime Nautical Management & Technology, Enerhen Road, Warri, Delta State, Nigeria",
  phones: ["+234 805 250 7358", "+234 812 232 2331"],
  email: "info@swincotex.com",
  hours: "Mon – Fri, 8:00am – 5:00pm",
  whatsappNumber: "2348052507358",
  whatsappMessage: "Hello Swincotex, I'd like to enquire about a project.",
  mapEmbedQuery: "Warri, Delta State, Nigeria",
};

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.98.577 3.826 1.573 5.38L2 22l4.75-1.545A9.953 9.953 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.19a8.14 8.14 0 0 1-4.15-1.14l-.297-.177-2.82.917.926-2.75-.194-.283A8.15 8.15 0 1 1 20.15 12a8.16 8.16 0 0 1-8.149 8.19z" />
    </svg>
  );
}

export default async function ContactPage() {
  const [contactContent, services] = await Promise.all([
    prisma.contactContent.findFirst(),
    prisma.service.findMany({ orderBy: { order: "asc" }, select: { title: true } }),
  ]);

  const content = contactContent ?? DEFAULTS;

  const whatsappHref = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(content.whatsappMessage)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 to-navy" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">Contact</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {content.heroHeading}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Reach us" title="Contact details" />

            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="min-w-0 wrap-break-word leading-relaxed text-steel">
                  {content.address}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="flex min-w-0 flex-col gap-0.5">
                  {content.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-steel hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                <a
                  href={`mailto:${content.email}`}
                  className="min-w-0 wrap-break-word text-steel hover:text-primary"
                >
                  {content.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="min-w-0 text-steel">{content.hours}</span>
              </li>
            </ul>
          </div>

          <ContactForm serviceOptions={services.map((s) => s.title)} />
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-line">
        <div className="h-105 w-full">
          <iframe
            title={`Swincotex location — ${content.mapEmbedQuery}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapEmbedQuery)}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Floating WhatsApp button */}
      {content.whatsappNumber && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <WhatsAppIcon size={26} />
        </a>
      )}
    </>
  );
}
