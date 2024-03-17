"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LoginCardProp {
  onLoginSuccess?: (res: Response) => Promise<void>;
  onLoginFailure?: (res: Response) => Promise<void>;
}

export default function LoginCard({
  onLoginSuccess,
  onLoginFailure,
}: LoginCardProp) {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const onLoginAttempt = async () => {
    let res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, passwd }),
    });

    if (res.status == 200) {
      if (onLoginSuccess) {
        await onLoginSuccess(res);
      }
    } else {
      if (onLoginFailure) {
        await onLoginFailure(res);
      }
    }
  };

  return (
    <div className="px-0">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">登录</CardTitle>
          <CardDescription>请输入用户名密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">用户名</Label>
              <Input
                id="username"
                placeholder="username"
                required
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                required
                type="password"
                onChange={(e) => {
                  setPasswd(e.target.value);
                }}
              />
            </div>
            <Button className="w-full" type="submit" onClick={onLoginAttempt}>
              登录
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
