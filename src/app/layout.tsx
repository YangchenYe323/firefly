import "react-toastify/dist/ReactToastify.css";
import "./_variables.css";
import "./globals.css";

import { Alex_Brush } from "next/font/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
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
        {/*Toastify and Toaster are both used as I don't feel like changing the admin page when I switch toast library for the main page*/}
        <ToastContainer autoClose={1000} />
        <Toaster />
      </body>
    </html>
  );
}
