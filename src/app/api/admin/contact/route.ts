import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const contact = await prisma.contactContent.findFirst();
  return NextResponse.json({ contact });
}

export async function PUT(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    heroHeading,
    heroDescription,
    address,
    phones,
    email,
    hours,
    whatsappNumber,
    whatsappMessage,
    mapEmbedQuery,
  } = body as {
    heroHeading?: string;
    heroDescription?: string;
    address?: string;
    phones?: string[];
    email?: string;
    hours?: string;
    whatsappNumber?: string;
    whatsappMessage?: string;
    mapEmbedQuery?: string;
  };

  if (!heroHeading || !heroDescription || !address || !email || !hours || !mapEmbedQuery) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.contactContent.findFirst();

  const data = {
    heroHeading,
    heroDescription,
    address,
    phones: phones ?? [],
    email,
    hours,
    whatsappNumber: whatsappNumber ?? "",
    whatsappMessage: whatsappMessage ?? "",
    mapEmbedQuery,
  };

  const contact = existing
    ? await prisma.contactContent.update({ where: { id: existing.id }, data })
    : await prisma.contactContent.create({ data });

  return NextResponse.json({ contact });
}
