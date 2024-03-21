import "./globals.css";

import { Alex_Brush } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import vtuberProfile from "@/profile";

const alexBrush = Alex_Brush({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alex-brush",
});

export const metadata: Metadata = {
  title: vtuberProfile.metaTitle,
  description: vtuberProfile.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <body className={`${alexBrush.variable} font-chinese`}>
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
