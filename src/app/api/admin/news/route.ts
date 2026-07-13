import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireSessionResponse();
  if (response) return response;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const { session, response } = await requireSessionResponse();
  if (response) return response;

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

  if (!slug || !title || !excerpt || !content || !coverImage || !coverImageAlt) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const post = await prisma.post.create({
    data: {
      slug,
      title,
      excerpt,
      content,
      coverImage,
      coverImageAlt,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
      authorId: session.user.id,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}
