import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const body = await request.json().catch(() => null);
  const { code, caption, src } = (body ?? {}) as { code?: string; caption?: string; src?: string };

  if (!code || !caption || !src) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({ data: { code, caption, src, order: count } });

  return NextResponse.json({ image }, { status: 201 });
}
