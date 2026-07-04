"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, PhoneCall } from "lucide-react";
import { services } from "@/lib/services-data";

const primaryLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/hse-quality", label: "HSE & Quality" },
  // { href: "/contact", label: "Contact" },
];

// drawer
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-navy shadow-lg shadow-black/10" : "bg-navy/95"
      }`}
    >
      {/* top strip */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="container-page flex h-9 items-center justify-end text-xs text-white/60">
          {/* <p className="spec-tag">Warri, Delta State, Nigeria &mdash; Est. Oil &amp; Gas Field Services</p> */}
          <a href="tel:+2340000000000" className="flex items-center gap-1.5 hover:text-sky">
            <PhoneCall size={12} />
            <span className="spec-tag">Talk to our engineers</span>
          </a>
        </div>
      </div>

      <nav className="container-page flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 md:gap-2.5">
          <Image
            src="/assets/logo.png"
            alt="Swincotex logo"
            width={40}
            height={40}
            className=" object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg md:text-xl lg:text-2xl font-bold tracking-normal text-white">
              SWINCOTEX
            </span>
            <span className="spec-tag text-white/50">Energy Limited</span>
          </div>
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-sm px-3.5 py-2 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-sm px-3.5 py-2 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white"
            >
              Services
              <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </Link>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-160 -translate-x-1/2 pt-3">
                <div className="rounded-md border border-line bg-white p-5 shadow-2xl shadow-black/20">
                  <p className="spec-tag mb-3 text-steel-light">Technical &amp; Field Services / Index</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-2.5 rounded-sm px-2 py-2.5 hover:bg-paper"
                      >
                        <span className="spec-tag mt-0.5 text-sky">{s.code}</span>
                        <span className="text-sm font-medium leading-snug text-navy group-hover:text-primary">
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                    <span className="text-xs text-steel">Full scope, capabilities and project examples</span>
                    <Link href="/services" className="text-xs font-semibold text-primary hover:underline">
                      View all services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm px-3.5 py-2 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="ml-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Contact Us
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-sm text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

{/* mobile drawer panel */}
<div
  className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-navy transition-transform duration-300 ease-in-out lg:hidden ${
    mobileOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {/* Drawer header */}
  <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-white/10 px-5">
    <span className="font-display text-sm font-bold tracking-tight text-white">Menu</span>
    <button
      onClick={() => setMobileOpen(false)}
      className="flex h-10 w-10 items-center justify-center rounded-sm text-white/80 hover:text-white"
      aria-label="Close menu"
    >
      <X size={20} />
    </button>
  </div>

  {/* Scrollable nav body — fills remaining height */}
  <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
    <Link
      href="/"
      className="rounded-sm px-3 py-3.5 text-[15px] font-medium text-white/90 hover:bg-white/5"
    >
      Home
    </Link>

    {/* Services accordion */}
    <div className="flex flex-col">
      <button
        onClick={() => setMobileServicesOpen((v) => !v)}
        className="flex items-center justify-between rounded-sm px-3 py-3.5 text-left text-[15px] font-medium text-white/90 hover:bg-white/5"
      >
        Services
        <ChevronDown
          size={16}
          className={`shrink-0 text-white/60 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Submenu: capped height + its own scroll so all 12 items are reachable */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-3 flex max-h-64 flex-col gap-0.5 overflow-y-auto border-l border-white/10 py-1 pl-4 pr-1">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-baseline gap-2 rounded-sm px-2 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                <span className="spec-tag shrink-0 text-sky">{s.code}</span>
                <span className="leading-snug">{s.title}</span>
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-sm px-2 py-2.5 text-sm font-semibold text-sky"
            >
              View all services &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>

    {primaryLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="rounded-sm px-3 py-3.5 text-[15px] font-medium text-white/90 hover:bg-white/5"
      >
        {link.label}
      </Link>
    ))}
  </div>

  {/* Fixed footer CTA — always visible, not pushed off-screen by long submenu */}
  <div className="shrink-0 border-t border-white/10 p-4">
    <Link
      href="/contact"
      className="flex items-center justify-center rounded-sm bg-primary px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-primary-dark"
    >
      Contact Us
    </Link>
  </div>
</div>
    </header>
  );
}