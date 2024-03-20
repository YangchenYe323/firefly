import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const ADMIN_API_PATH = ["/apis/songs/update"];

const ADMIN_PATH = ["/admin"];

function isAccessAdminApiPath(pathname: string) {
  return ADMIN_API_PATH.some((p) => pathname.startsWith(p));
}

function isAccessAdminPath(pathname: string) {
  return ADMIN_PATH.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));

  // If cookie is set, no need to login again, redirect to admin page
  if (jwtVerified && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/admin", request.url));
  }

  if (!jwtVerified && isAccessAdminApiPath(request.nextUrl.pathname)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  // Admin page could not be accessed without set cookie
  if (!jwtVerified && isAccessAdminPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}
