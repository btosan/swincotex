import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";
import type { ServiceIcon } from "@prisma/client";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { slug, code, title, short, summary, scope, image, imageAlt, icon, order } = body as {
    slug?: string;
    code?: string;
    title?: string;
    short?: string;
    summary?: string;
    scope?: string[];
    image?: string;
    imageAlt?: string;
    icon?: ServiceIcon;
    order?: number;
  };

  if (!slug || !code || !title || !short || !summary || !image || !imageAlt || !icon) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 });
  }

  const service = await prisma.service.create({
    data: {
      slug,
      code,
      title,
      short,
      summary,
      scope: scope ?? [],
      image,
      imageAlt,
      icon,
      order: order ?? 0,
    },
  });

  return NextResponse.json({ service }, { status: 201 });
}
