import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Swincotex Oil and Gas Company Limited in Warri, Delta State, Nigeria.",
};

const WHATSAPP_NUMBER = "2340000000000"; // same digits as the tel: link, no + or spaces
const WHATSAPP_MESSAGE = "Hello Swincotex, I'd like to enquire about a project.";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">DWG-CTC / Contact</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Tell us about your site and scope.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Reach our engineering team directly, or send your specification through
            the form and we&rsquo;ll respond with scope, timeline, and next steps.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Reach us" title="Contact details" />
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-light">
                  <MapPin size={18} className="text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Yard &amp; office</p>
                  <p className="mt-0.5 text-sm text-steel">Warri, Delta State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-light">
                  <Phone size={18} className="text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Phone</p>
                  <a href="tel:+2340000000000" className="mt-0.5 block text-sm text-steel hover:text-primary">
                    +234 (0) 000 000 0000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#25D366]/10">
                  <WhatsAppIcon size={18} className="text-[#25D366]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">WhatsApp</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm text-steel hover:text-primary"
                  >
                    +234 (0) 000 000 0000
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-light">
                  <Mail size={18} className="text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Email</p>
                  <a href="mailto:info@swincotex.com" className="mt-0.5 block text-sm text-steel hover:text-primary">
                    info@swincotex.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary-light">
                  <Clock size={18} className="text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">Site hours</p>
                  <p className="mt-0.5 text-sm text-steel">Mon &ndash; Fri, 8:00 &ndash; 17:00 (WAT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Static form UI — wire to an API route / email service before going live */}
          <form className="rounded-md border border-line bg-white p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                <label htmlFor="company" className="text-xs font-semibold text-navy">Company</label>
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
                  placeholder="you@company.com"
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
                <label htmlFor="service" className="text-xs font-semibold text-navy">Service of interest</label>
                <select
                  id="service"
                  name="service"
                  className="mt-1.5 w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
                >
                  <option>Environmental, Process &amp; Thermal Engineering</option>
                  <option>Well Head Services</option>
                  <option>Mechanical Engineering, Design &amp; Construction</option>
                  <option>Fabrication, Supply &amp; Installation of Process Equipment</option>
                  <option>Civil Engineering Construction</option>
                  <option>Inspection &amp; Corrosion Engineering</option>
                  <option>Pipeline Construction</option>
                  <option>EPC Services</option>
                  <option>Maintenance of Mechanical Installations &amp; Structures</option>
                  <option>Other / not sure</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-xs font-semibold text-navy">Project details</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-none rounded-sm border border-line px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary"
                  placeholder="Tell us about the site, scope, and timeline"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Send request
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-line">
        <div className="h-[420px] w-full">
          <iframe
            title="Swincotex location — Warri, Delta State"
            src="https://www.google.com/maps?q=Warri,+Delta+State,+Nigeria&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}