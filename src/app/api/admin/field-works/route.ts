import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const fieldWorks = await prisma.fieldWork.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ fieldWorks });
}

export async function POST(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const body = await request.json().catch(() => null);
  const description = (body as { description?: string })?.description?.trim();

  if (!description) {
    return NextResponse.json({ error: "Description is required" }, { status: 400 });
  }

  const count = await prisma.fieldWork.count();
  const fieldWork = await prisma.fieldWork.create({ data: { description, order: count } });

  return NextResponse.json({ fieldWork }, { status: 201 });
}
