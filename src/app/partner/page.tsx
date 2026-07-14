import type { Metadata } from "next";
import PartnerForm from "@/components/PartnerForm";

export const metadata: Metadata = {
  title: "Partner With Us & Careers",
  description:
    "Explore partnership opportunities or apply for a role at Swincotex Oil and Gas Company Limited.",
};

export default function PartnerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 to-navy" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">Partnerships & Careers</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Work with us, or work for us.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Whether you're a contractor, supplier, or operator looking to partner on a project,
            or a professional interested in joining our field and engineering teams, tell us
            more below.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page max-w-xl">
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
