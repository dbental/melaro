import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/pricing",
  "/login",
  "/signup",
  "/verify",
  "/platform",
  "/use-cases",
  "/waitlist",
];

const AUTH_PATHS = ["/login", "/signup", "/verify"];

/**
 * Check for a better-auth session cookie.
 * Better-auth sets a cookie named "better-auth.session_token" by default.
 */
function hasSession(req: NextRequest): boolean {
  const cookieNames = ["better-auth.session_token", "session", "auth-token"];
  return cookieNames.some((name) => req.cookies.has(name));
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow API routes, static files, and Next.js internals to pass through
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.\w+$/)
  ) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  const devBypass = process.env.NODE_ENV === "development";
  const authed = devBypass || hasSession(req);

  // Redirect logged-in users away from auth pages
  if (isAuthPath && authed && !devBypass) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Require auth for protected routes
  if (isProtected && !authed) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
