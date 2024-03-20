import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db";
import { signNewJwtToken } from "@/lib/auth";

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

  const actualPasswdHash = await bcrypt.hash(passwd, user.salt);
  const expectedPasswdHash = user.password_hash;

  if (expectedPasswdHash !== actualPasswdHash) {
    return NextResponse.json({ message: "用户名或密码错误" }, { status: 400 });
  }

  const newUserToken = await signNewJwtToken(user);

  const redirectUrl = new URL("/admin", new URL(request.url).origin);

  let response = NextResponse.redirect(redirectUrl);

  response.cookies.set("currentUser", newUserToken);

  return response;
}
