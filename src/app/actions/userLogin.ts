"use server";

import { ActionReturnTypeBase } from "./types";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import prisma from "@/db";
import { signNewJwtToken } from "@/lib/auth";
import { z } from "zod";

export interface LoginReturnType extends ActionReturnTypeBase {
  errors?: {
    username?: string[] | undefined;
    passwd?: string[] | undefined;
  };
  message?: string;
}

const schema = z.object({
  username: z.string(),
  passwd: z.string(),
});

export default async function userLogin(
  prevState: any,
  formData: FormData
): Promise<LoginReturnType> {
  const validation = await schema.safeParseAsync({
    username: formData.get("username"),
    passwd: formData.get("passwd"),
  });

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { username, passwd } = validation.data;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "用户名或密码错误",
    };
  }

  const actualPasswdHash = await bcrypt.hash(passwd, user.salt);
  const expectedPasswdHash = user.password_hash;

  if (expectedPasswdHash !== actualPasswdHash) {
    return {
      success: false,
      message: "用户名或密码错误",
    };
  }

  const newUserToken = await signNewJwtToken(user);
  cookies().set("currentUser", newUserToken);

  return {
    success: true,
  };
}
