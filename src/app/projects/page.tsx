import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Project Experience",
  description:
    "Swincotex project experience on Shell, Nigeria Agip, and Addax Petroleum operated sites across the Niger Delta.",
};

export default async function ProjectsPage() {
  const [projects, fieldWorks] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.fieldWork.findMany({ orderBy: { order: "asc" } }),
  ]);

  const allGalleryImages = projects.flatMap((p) =>
    p.gallery.map((src, i) => ({ src, code: p.code, title: p.title, key: `${p.code}-${i}` }))
  );

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src="/assets/company-img/imo-river2.png"
          alt="Steel fabrication and pipework on an industrial site"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/30 via-navy/40 to-navy/50" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">PRJ / Project Experience</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Delivered across Shell, Agip &amp; Addax operated assets.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/95">
            A track record of manifold, flare, fencing, and integrity works executed
            for major operators and their main contractors across the Niger Delta.
          </p>
        </div>
      </section>

      {/* Project cards with images */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Project Register" title="Selected project experience" />

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.code}
                className="overflow-hidden rounded-md border border-line bg-white"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-navy/10 to-transparent" />
                  <span className="spec-tag absolute bottom-3 left-4 text-white">{p.code}</span>
                </div>

                <div className="p-6">
                  <p className="font-medium text-navy">{p.location}</p>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{p.title}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                    <div>
                      <dt className="spec-tag text-steel-light">Client</dt>
                      <dd className="mt-1 text-steel">{p.client}</dd>
                    </div>
                    <div>
                      <dt className="spec-tag text-steel-light">Duration</dt>
                      <dd className="mt-1 text-steel">{p.duration}</dd>
                    </div>
                  </dl>

                  {/* mini gallery thumbnails */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {p.gallery.map((src, i) => (
                      <div key={`${p.code}-thumb-${i}`} className="relative h-16 w-full overflow-hidden rounded-sm">
                        <Image
                          src={src}
                          alt={`${p.title} – photo ${i + 1}`}
                          fill
                          unoptimized
                          sizes="120px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full project table (kept as reference/register view) */}
      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Project Register" title="Full project schedule" />

          <div className="mt-10 overflow-x-auto rounded-md border border-line">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-white text-left">
                  <th className="spec-tag px-5 py-4 font-medium text-steel-light">Ref</th>
                  <th className="spec-tag px-5 py-4 font-medium text-steel-light">Client</th>
                  <th className="spec-tag px-5 py-4 font-medium text-steel-light">Location</th>
                  <th className="spec-tag px-5 py-4 font-medium text-steel-light">Project title</th>
                  <th className="spec-tag px-5 py-4 font-medium text-steel-light">Duration</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.code} className="border-b border-line bg-white last:border-0">
                    <td className="spec-tag px-5 py-5 align-top text-sky">{p.code}</td>
                    <td className="px-5 py-5 align-top text-steel">{p.client}</td>
                    <td className="px-5 py-5 align-top font-medium text-navy">{p.location}</td>
                    <td className="px-5 py-5 align-top text-steel">{p.title}</td>
                    <td className="spec-tag px-5 py-5 align-top text-steel-light">{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full photo gallery */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Site Gallery"
            title="Project photo gallery"
            description="A visual record of works executed across our registered project sites."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {allGalleryImages.map((img) => (
              <div key={img.key} className="group relative aspect-4/3 overflow-hidden rounded-md border border-line">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="spec-tag absolute bottom-2 left-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {img.code}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Field Works"
            title="Additional site works"
            description="Further technical works executed in the field, alongside our registered project experience above."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {fieldWorks.map((w, i) => (
              <div key={w.id} className="rounded-md border border-line bg-white p-6">
                <p className="spec-tag text-sky">FW-{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed text-steel">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}