import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  // If cookie is set, no need to login again, redirect to admin page
  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/admin", request.url));
  }

  // Admin page could not be accessed without set cookie
  if (!currentUser && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", request.url));
  }
}
