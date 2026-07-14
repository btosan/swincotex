import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";

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

  const result = await createSubmission({
    source: "CONTACT",
    name,
    email,
    phone,
    company,
    service,
    message,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ success: true, id: result.submission.id });
}