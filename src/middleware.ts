// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const PROTECTED_PREFIXES = ["/user/*", "/post-property/details"];
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, search } = req.nextUrl;

  const protectedPaths = PROTECTED_PREFIXES;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "1");
    url.searchParams.set("callbackurl", pathname + (search || ""));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/post-property/details"],
};
