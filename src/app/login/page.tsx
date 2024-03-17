"use client";

import LoginCard from "@/components/LoginCard";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const onLoginSuccess = async (_res: Response) => {
    alert("登录成功");
    router.replace("/admin");
  };

  const onLoginFailure = async (res: Response) => {
    const body = await res.json();
    alert(`登录失败: ${body}`);
  };

  return (
    <LoginCard
      onLoginSuccess={onLoginSuccess}
      onLoginFailure={onLoginFailure}
    />
  );
}
