import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const teamMembers = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ teamMembers });
}

export async function POST(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

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

  if (!name || !role || !image || !imageAlt) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isCeo) {
    // Only one CEO card is shown featured on the About page — demote any
    // existing one so there's never more than one.
    await prisma.teamMember.updateMany({ where: { isCeo: true }, data: { isCeo: false } });
  }

  const teamMember = await prisma.teamMember.create({
    data: { name, role, image, imageAlt, bio, isCeo: isCeo ?? false, order: order ?? 0 },
  });

  return NextResponse.json({ teamMember }, { status: 201 });
}
