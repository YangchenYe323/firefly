import { NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/auth";

const ADMIN_PATH = ["/admin"];

function isAccessAdminPath(pathname: string) {
  return ADMIN_PATH.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));

  // If cookie is set, no need to login again, redirect to admin page
  if (
    jwtVerified &&
    request.nextUrl.pathname.startsWith("/login") &&
    request.method === "GET"
  ) {
    return Response.redirect(new URL("/admin", request.url));
  }

  // Admin page could not be accessed without set cookie
  if (!jwtVerified && isAccessAdminPath(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}
