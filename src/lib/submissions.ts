import { prisma } from "@/lib/prisma";
import { notifyAdmins } from "@/lib/notifications";
import { sendContactNotificationEmail } from "@/lib/email";
import { appendContactSubmissionToSheet } from "@/lib/google-sheets";
import type { SubmissionSource } from "@prisma/client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOURCE_LABEL: Record<SubmissionSource, string> = {
  CONTACT: "enquiry",
  PARTNERSHIP: "partnership enquiry",
  JOB_APPLICATION: "job application",
};

export type CreateSubmissionInput = {
  source: SubmissionSource;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

export async function createSubmission(input: CreateSubmissionInput) {
  const { source, name, email, phone, company, service, message } = input;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "Name, email, and message are required" as const, status: 400 as const };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Invalid email address" as const, status: 400 as const };
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      source,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      service: source === "CONTACT" ? service?.trim() || null : null,
      message: message.trim(),
    },
  });

  const label = SOURCE_LABEL[source];

  // Create the in-app notification first — this must succeed since it's
  // the primary way admins find out about new submissions.
  await notifyAdmins({
    message: `New ${label} from ${submission.name}`,
    submissionId: submission.id,
  });

  // Email + Sheets are best-effort: log failures but never fail the
  // request, since the submission is already safely stored either way.
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { email: true },
  });

  await Promise.allSettled([
    admins.length > 0
      ? sendContactNotificationEmail({
          to: admins.map((a) => a.email),
          submitterName: submission.name,
          submitterEmail: submission.email,
          subject:
            source === "CONTACT" ? submission.service ?? "General enquiry" : `New ${label}`,
          message: submission.message,
        })
      : Promise.resolve(),
    appendContactSubmissionToSheet({
      source,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      company: submission.company,
      service: submission.service,
      message: submission.message,
      createdAt: submission.createdAt,
    }).then((result) => {
      if (!result.skipped) {
        return prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { forwardedToSheet: true },
        });
      }
    }),
  ]).then((results) => {
    results.forEach((r) => {
      if (r.status === "rejected") {
        console.error("Submission side-effect failed:", r.reason);
      }
    });
  });

  return { submission };
}
