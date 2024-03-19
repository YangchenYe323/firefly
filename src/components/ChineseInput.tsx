"use client";

import { ChangeEventHandler, CompositionEventHandler, useState } from "react";
import { Input, InputProps } from "./ui/input";

interface PropType {
  onValueChange: (value: string) => void;
}

export default function ChineseInput({
  onValueChange,
  ...props
}: InputProps & PropType) {
  const [isEditingChinese, setIsEditingChinese] = useState(false);

  const onCompositionStart: CompositionEventHandler<HTMLInputElement> = (e) => {
    setIsEditingChinese(true);
  };

  const onCompositionEnd: CompositionEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    setIsEditingChinese(false);
    onValueChange(value);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isEditingChinese) {
      const value = e.currentTarget.value;
      onValueChange(value);
    }
  };

  return (
    <Input
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      onChange={onChange}
      {...props}
    />
  );
}
