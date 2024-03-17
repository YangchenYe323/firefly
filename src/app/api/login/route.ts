import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db";

const USER_HASH = bcrypt.genSaltSync(8);

export async function POST(request: NextRequest) {
  const { username, passwd } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "用户名或密码错误" }, { status: 400 });
  }

  const { username: _, salt, password_hash: expectedPasswdHash } = user;

  const actualPasswdHash = await bcrypt.hash(passwd, salt);

  if (expectedPasswdHash !== actualPasswdHash) {
    return NextResponse.json({ message: "用户名或密码错误" }, { status: 400 });
  }

  const currentUserHash = await bcrypt.hash(username, USER_HASH);

  const redirectUrl = new URL("/admin", new URL(request.url).origin);

  let response = NextResponse.redirect(redirectUrl);

  response.cookies.set("currentUser", currentUserHash);

  return response;
}
