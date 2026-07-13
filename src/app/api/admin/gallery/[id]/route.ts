import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminResponse } from "@/lib/authz";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const { code, caption, src, order } = (body ?? {}) as {
    code?: string;
    caption?: string;
    src?: string;
    order?: number;
  };

  const image = await prisma.galleryImage.update({
    where: { id },
    data: { code, caption, src, order },
  });

  return NextResponse.json({ image });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { response } = await requireAdminResponse();
  if (response) return response;

  const { id } = await params;
  await prisma.galleryImage.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
