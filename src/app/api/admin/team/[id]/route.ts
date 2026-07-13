import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const teamMember = await prisma.teamMember.findUnique({ where: { id } });

  if (!teamMember) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ teamMember });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, role, image, imageAlt, bio, isCeo, order } = body as {
    name?: string;
    role?: string;
    image?: string;
    imageAlt?: string;
    bio?: string;
    isCeo?: boolean;
    order?: number;
  };

  if (isCeo) {
    await prisma.teamMember.updateMany({
      where: { isCeo: true, id: { not: id } },
      data: { isCeo: false },
    });
  }

  const teamMember = await prisma.teamMember.update({
    where: { id },
    data: { name, role, image, imageAlt, bio, isCeo, order },
  });

  return NextResponse.json({ teamMember });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
