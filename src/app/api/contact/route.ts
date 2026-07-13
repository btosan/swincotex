import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdmins } from "@/lib/notifications";
import { sendContactNotificationEmail } from "@/lib/email";
import { appendContactSubmissionToSheet } from "@/lib/google-sheets";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, company, service, message } = body as {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      service: service?.trim() || null,
      message: message.trim(),
    },
  });

  // Create the in-app notification first — this must succeed since it's
  // the primary way admins find out about new enquiries.
  await notifyAdmins({
    message: `New enquiry from ${submission.name}`,
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
          subject: submission.service ?? "General enquiry",
          message: submission.message,
        })
      : Promise.resolve(),
    appendContactSubmissionToSheet({
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
        console.error("Contact submission side-effect failed:", r.reason);
      }
    });
  });

  return NextResponse.json({ success: true, id: submission.id });
}
