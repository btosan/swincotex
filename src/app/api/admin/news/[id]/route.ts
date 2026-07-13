import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionResponse } from "@/lib/authz";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { response } = await requireSessionResponse();
  if (response) return response;

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireSessionResponse();
  if (response) return response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { slug, title, excerpt, content, coverImage, coverImageAlt, published } = body as {
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    coverImageAlt?: string;
    published?: boolean;
  };

  if (slug) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }
  }

  const current = await prisma.post.findUnique({ where: { id } });
  const isNewlyPublished = published && current && !current.published;

  const post = await prisma.post.update({
    where: { id },
    data: {
      slug,
      title,
      excerpt,
      content,
      coverImage,
      coverImageAlt,
      published,
      publishedAt: isNewlyPublished ? new Date() : undefined,
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireSessionResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
