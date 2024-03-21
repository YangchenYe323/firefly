"use client";

import { UserAuthForm } from "./components/UserAuthForm";

export default function LoginPage() {
  return (
    <div className="h-[800px] flex-col items-center justify-center">
      <div className="h-[100px]"></div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">登录</h1>
          <p className="text-sm text-muted-foreground">请输入用户名密码登录</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
