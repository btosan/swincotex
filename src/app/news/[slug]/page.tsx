import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({ where: { slug, published: true } });

  if (!post) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/50 to-navy/70" />
        <div className="container-page relative">
          <Link
            href="/news"
            className="mb-6 flex w-fit items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-sky"
          >
            <ArrowLeft size={14} /> All news
          </Link>
          <p className="spec-tag text-sky">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container-page max-w-3xl">
          {/*
            Content is authored by logged-in Admin/Staff only, via the
            Tiptap editor whose schema constrains output to a fixed set
            of elements (p, h2/h3, lists, blockquote, a, img) — there's
            no way for a script tag to reach this field. Still, if you
            ever accept post content from outside that editor, sanitize
            before rendering.
          */}
          <div
            className="[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-steel [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-steel [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-steel [&_blockquote]:border-l-2 [&_blockquote]:border-sky [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-steel [&_a]:text-primary [&_a]:underline [&_img]:my-6 [&_img]:rounded-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </>
  );
}
