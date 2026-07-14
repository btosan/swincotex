import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";
import type { SubmissionSource } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { applicationType, name, email, phone, company, message } = body as {
    applicationType?: string;
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
  };

  const source: SubmissionSource | null =
    applicationType === "partnership"
      ? "PARTNERSHIP"
      : applicationType === "job_application"
        ? "JOB_APPLICATION"
        : null;

  if (!source) {
    return NextResponse.json(
      { error: "applicationType must be 'partnership' or 'job_application'" },
      { status: 400 },
    );
  }

  const result = await createSubmission({ source, name, email, phone, company, message });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ success: true, id: result.submission.id });
}
