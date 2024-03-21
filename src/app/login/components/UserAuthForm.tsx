"use client";

import * as React from "react";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import login from "@/app/actions/login";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button type="submit">
      {status.pending && (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
      登录
    </Button>
  );
};

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(login, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      router.replace("/admin");
    } else {
      const message = state.message || state.errors || "";
      toast.error(`登录失败: ${message}`);
    }
  }, [state, router]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              用户名
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="username"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              密码
            </Label>
            <Input
              id="password"
              name="passwd"
              type="password"
              placeholder="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
