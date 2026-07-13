import { prisma } from "@/lib/prisma";
import type { NotificationType } from "@prisma/client";

/**
 * Creates one notification per Admin user. Staff don't see contact-form
 * notifications since they don't have access to that inbox.
 */
export async function notifyAdmins(params: {
  message: string;
  type?: NotificationType;
  submissionId?: string;
}) {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (admins.length === 0) return;

  await prisma.notification.createMany({
    data: admins.map((admin) => ({
      userId: admin.id,
      message: params.message,
      type: params.type ?? "CONTACT_SUBMISSION",
      submissionId: params.submissionId,
    })),
  });
}
