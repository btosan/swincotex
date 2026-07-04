import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { services } from "@/lib/services-data";

// Simple inline WhatsApp glyph — keeps it dependency-free since lucide-react
// doesn't ship a brand icon for it.
function WhatsAppIcon({ size = 16, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.437 5.166L2.05 22l4.963-1.362A9.953 9.953 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.163a8.15 8.15 0 01-4.157-1.14l-.298-.177-3.056.84.816-2.98-.194-.306a8.145 8.145 0 01-1.257-4.4c0-4.502 3.663-8.163 8.165-8.163 4.502 0 8.163 3.66 8.163 8.163 0 4.502-3.66 8.163-8.163 8.163z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-page grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center bg-white/5">
              <Image
                src="/assets/logo.png"
                alt="Swincotex logo"
                width={24}
                height={24}
                className=" object-contain"
              />                      
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">SWINCOTEX</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Swincotex Energy Nigeria Limited provides technical and labour supply
            services to the oil and gas industry &mdash; engineering, EPC, fabrication and
            field services from our yard in Warri, Delta State.
          </p>
          <p className="spec-tag mt-5 text-sky/80">ISO 9001 Quality System</p>
        </div>

        <div>
          <p className="spec-tag mb-4 text-white/40">Company</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link href="/about" className="hover:text-sky">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-sky">Project Experience</Link></li>
            <li><Link href="/hse-quality" className="hover:text-sky">HSE &amp; Quality</Link></li>
            <li><Link href="/contact" className="hover:text-sky">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="spec-tag mb-4 text-white/40">Services</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-sky">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-semibold text-sky hover:underline">
                View all &rarr;
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="spec-tag mb-4 text-white/40">Get in touch</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-sky" />
              <span className="min-w-0 wrap-break-word leading-relaxed">
                100, Midwestern College of Maritime Nautical Management &amp; Technology, Enerhen Road, Warri, Delta State, Nigeria
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-sky" />
              <a href="tel:+2348052507358" className="hover:text-sky">+234 805 250 7358</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-sky" />
              <a href="tel:+2348122322331" className="hover:text-sky">+234 812 232 2331</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-sky" />
              <a href="mailto:info@swincotex.com" className="hover:text-sky">info@swincotex.com</a>
            </li>
            <li>
              <a
                href="https://wa.me/2348052507358"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors hover:border-sky hover:text-sky"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Swincotex Energy Nigeria Limited. All rights reserved.</p>
          <a
            href="https://ofashi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="spec-tag hover:text-sky"
          >
            Developed by Ofashi.com
          </a>
        </div>
      </div>
    </footer>
  );
}