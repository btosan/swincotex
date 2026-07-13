import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { code, client, location, title, duration, image, gallery, order } = body as {
    code?: string;
    client?: string;
    location?: string;
    title?: string;
    duration?: string;
    image?: string;
    gallery?: string[];
    order?: number;
  };

  if (code) {
    const existing = await prisma.project.findUnique({ where: { code } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "A project with this code already exists" }, { status: 409 });
    }
  }

  const project = await prisma.project.update({
    where: { id },
    data: { code, client, location, title, duration, image, gallery, order },
  });

  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
