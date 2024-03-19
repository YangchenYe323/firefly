import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeaderProps
  extends React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export default function StickyHeader({
  children,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
