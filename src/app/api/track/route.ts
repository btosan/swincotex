import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

// This is a route handler, not middleware, so it runs on Node.js by
// default — needed since the pg driver adapter behind Prisma can't run
// on the Edge runtime.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const path = typeof body?.path === "string" ? body.path.slice(0, 300) : "/";

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  // Hash IP + User-Agent + a server-side secret so we can count unique
  // visitors without ever storing anything that identifies a real person.
  const visitorHash = crypto
    .createHash("sha256")
    .update(`${process.env.AUTH_SECRET ?? ""}:${ip}:${userAgent}`)
    .digest("hex");

  try {
    await prisma.pageView.create({ data: { path, visitorHash } });
  } catch (err) {
    // Never let analytics failures surface to the visitor's browser.
    console.error("Page view tracking failed:", err);
  }

  return NextResponse.json({ ok: true });
}
