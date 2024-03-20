import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import vtuberProfile from "@/profile";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
