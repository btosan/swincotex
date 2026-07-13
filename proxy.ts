import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` — same runtime, same
// convention (one default export, runs on every matched request before
// the route renders).
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  if (pathname.startsWith("/login")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Staff are restricted to the News/Blog section only.
    const staffAllowed = pathname === "/admin" || pathname.startsWith("/admin/news");
    if (role === "STAFF" && !staffAllowed) {
      return NextResponse.redirect(new URL("/admin/news", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
