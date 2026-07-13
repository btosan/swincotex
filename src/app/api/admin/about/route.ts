import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";
import type { Prisma } from "@prisma/client";

export async function GET() {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const about = await prisma.aboutContent.findFirst();
  return NextResponse.json({ about });
}

export async function PUT(request: Request) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    heroEyebrow,
    heroHeading,
    introParagraphs,
    cards,
    capabilityEyebrow,
    capabilityTitle,
    capabilityDescription,
    capabilityGroups,
    leadershipEyebrow,
    leadershipTitle,
    leadershipDescription,
  } = body as {
    heroEyebrow?: string;
    heroHeading?: string;
    introParagraphs?: string[];
    cards?: Prisma.InputJsonValue;
    capabilityEyebrow?: string;
    capabilityTitle?: string;
    capabilityDescription?: string;
    capabilityGroups?: Prisma.InputJsonValue;
    leadershipEyebrow?: string;
    leadershipTitle?: string;
    leadershipDescription?: string;
  };

  if (!heroHeading || !capabilityTitle || !capabilityDescription || !leadershipTitle || !leadershipDescription) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.aboutContent.findFirst();

  const data = {
    heroEyebrow: heroEyebrow ?? "About",
    heroHeading,
    introParagraphs: introParagraphs ?? [],
    cards: cards ?? [],
    capabilityEyebrow: capabilityEyebrow ?? "Capability",
    capabilityTitle,
    capabilityDescription,
    capabilityGroups: capabilityGroups ?? [],
    leadershipEyebrow: leadershipEyebrow ?? "Leadership",
    leadershipTitle,
    leadershipDescription,
  };

  const about = existing
    ? await prisma.aboutContent.update({ where: { id: existing.id }, data })
    : await prisma.aboutContent.create({ data });

  return NextResponse.json({ about });
}
