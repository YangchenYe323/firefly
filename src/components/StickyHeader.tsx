import { ReactNode } from "react";

interface HeaderProps {
  heading: string;
  text?: string;
  children?: ReactNode;
}

export default function StickyHeader({ heading, text, children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <h1>{heading}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </header>
  );
}
