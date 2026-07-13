import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";
import type { SubmissionStatus } from "@prisma/client";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { status } = body as { status?: SubmissionStatus };

  if (!status) {
    return NextResponse.json({ error: "status required" }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ submission });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.contactSubmission.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
