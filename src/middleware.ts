import { NextRequest, NextResponse } from "next/server";

const ADMIN_API_PATH = [
  "/apis/songs/update",
]

const ADMIN_PATH = [
  "/admin"
]

function isAccessAdminApiPath(pathname: string) {
  return ADMIN_API_PATH.some(p => pathname.startsWith(p));
}

function isAccessAdminPath(pathname: string) {
  return ADMIN_PATH.some(p => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  // TODO(yangchen): JWT

  // If cookie is set, no need to login again, redirect to admin page
  if (currentUser && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/admin", request.url));
  }

  if (!currentUser && isAccessAdminApiPath(request.nextUrl.pathname)) {
    return NextResponse.json({message: "Unauthorized"}, {status: 403});
  }

  // Admin page could not be accessed without set cookie
  if (!currentUser && isAccessAdminPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}

