import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

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

  if (!code || !client || !location || !title || !duration || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.project.findUnique({ where: { code } });
  if (existing) {
    return NextResponse.json({ error: "A project with this code already exists" }, { status: 409 });
  }

  const project = await prisma.project.create({
    data: { code, client, location, title, duration, image, gallery: gallery ?? [], order: order ?? 0 },
  });

  return NextResponse.json({ project }, { status: 201 });
}
