import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";
import type { ServiceIcon } from "@prisma/client";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ service });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
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

  if (slug) {
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "A service with this slug already exists" }, { status: 409 });
    }
  }

  const service = await prisma.service.update({
    where: { id },
    data: { slug, code, title, short, summary, scope, image, imageAlt, icon, order },
  });

  return NextResponse.json({ service });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.service.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
