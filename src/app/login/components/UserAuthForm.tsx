"use client";

import * as React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../../../components/Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onAuthenticate?: (input: InputType) => Promise<boolean>;
}

export interface InputType {
  username: string;
  passwd: string;
}

export function UserAuthForm({
  className,
  onAuthenticate,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);
    if (onAuthenticate) {
      const success = await onAuthenticate(data);
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              用户名
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="username"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              密码
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("passwd", { required: true })}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            登录
          </Button>
        </div>
      </form>
    </div>
  );
}
