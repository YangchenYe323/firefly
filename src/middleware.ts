import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/admin", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", request.url));
  }
}
