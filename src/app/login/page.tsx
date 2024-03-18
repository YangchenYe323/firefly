"use client";

import { Inputs, UserAuthForm } from "@/components/UserAuthForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onAuthenticate = async ({ username, passwd }: Inputs) => {
    let res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, passwd }),
    });

    if (res.status === 200) {
      router.replace("/admin");
      return true;
    }

    let body = await res.text();
    alert(`登录失败: ${body}`);

    return false;
  };

  return (
    <div className="h-[800px] flex-col items-center justify-center">
      <div className="h-[100px]"></div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">登录</h1>
          <p className="text-sm text-muted-foreground">请输入用户名密码登录</p>
        </div>
        <UserAuthForm onAuthenticate={onAuthenticate} />
      </div>
    </div>
  );
}
