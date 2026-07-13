import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

/**
 * Requires any logged-in Admin or Staff user.
 * Throws so callers can catch it and return the right HTTP response,
 * or use requireAdminResponse()/requireSessionResponse() below for
 * the common "just give me a NextResponse or the session" case.
 */
export async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError("Not signed in");
  return session;
}

/** Requires the ADMIN role specifically. */
export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== "ADMIN") {
    throw new ForbiddenError("Admin access required");
  }
  return session;
}

/**
 * Convenience wrapper for route handlers: returns either
 * { session } on success or { response } with the right status code
 * on failure, so handlers don't need try/catch boilerplate.
 */
export async function requireAdminResponse() {
  try {
    const session = await requireAdmin();
    return { session, response: null };
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    return { session: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
}

export async function requireSessionResponse() {
  try {
    const session = await requireSession();
    return { session, response: null };
  } catch {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
}
