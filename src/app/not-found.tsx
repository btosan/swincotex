import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy">
      <div className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-linear-to-b from-navy/60 to-navy" />
      <div className="container-page relative text-center">
        <p className="spec-tag text-sky">ERR-404 / Not Found</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
          This drawing doesn&rsquo;t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-white/60">
          The page you&rsquo;re looking for may have moved. Head back to the
          homepage to find your way.
        </p>
        <Link
          href="/"
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </section>
  );
}
