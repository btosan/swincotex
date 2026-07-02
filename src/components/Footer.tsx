import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { services } from "@/lib/services-data";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-page grid grid-cols-1 gap-10 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-sky/40 bg-white/5">
              <span className="font-display text-lg font-bold text-sky">S</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">SWINCOTEX</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Swincotex Oil and Gas Company Limited provides technical and labour supply
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
              <span>Warri, Delta State, Nigeria</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-sky" />
              <a href="tel:+2340000000000" className="hover:text-sky">+234 (0) 000 000 0000</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-sky" />
              <a href="mailto:info@swincotex.com" className="hover:text-sky">info@swincotex.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Swincotex Oil and Gas Company Limited. All rights reserved.</p>
          <p className="spec-tag">DWG-SITE / REV-A / WARRI-NG</p>
        </div>
      </div>
    </footer>
  );
}
