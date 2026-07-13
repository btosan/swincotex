import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "News",
  description: "Company news and updates from Swincotex Oil and Gas Company Limited.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/60 to-navy" />
        <div className="container-page relative">
          <p className="spec-tag mb-4 text-sky">Updates</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            News from Swincotex
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Project milestones, company announcements, and updates from our
            engineering and field teams.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Latest" title="All posts" />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-line bg-white transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-navy">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="spec-tag text-steel-light">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  <h3 className="font-display text-lg font-semibold leading-snug text-navy">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-steel">{post.excerpt}</p>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <p className="col-span-full py-10 text-center text-steel-light">
                No news posts published yet — check back soon.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
