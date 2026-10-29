import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/auth";
import { defaultLocale, hasLocalePrefix, stripLocale } from "@/i18n/config";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin" || (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login"))) {
    const session = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) return NextResponse.redirect(new URL("/admin/login", request.url));
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) return NextResponse.next();
  // Static files (anything with an extension) are served as they are.
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  // Georgian is served without a prefix: /ka/... redirects to the bare path, bare paths render the /ka routes.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    return NextResponse.redirect(new URL(stripLocale(pathname) + search, request.url), 308);
  }
  if (hasLocalePrefix(pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}${search}`, request.url));
}

export const config = {
  // Everything except Next internals, API/upload routes and pictures; other static files are skipped in proxy().
  matcher: ["/((?!_next|api|uploads|img).*)"],
};
