import "react-toastify/dist/ReactToastify.css";
import "./_variables.css";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Alex_Brush } from "next/font/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { getVtuberProfileCached } from "./actions/v2/profile";

const alexBrush = Alex_Brush({
	display: "swap",
	subsets: ["latin"],
	weight: "400",
	variable: "--font-alex-brush",
});

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
	const { profile } = await getVtuberProfileCached();

	if (profile) {
		return {
			title: profile.metaTitle || "主播歌单",
			description: profile.metaDescription || "主播歌单",
			generator: "Next.js",
			keywords: ["主播歌单", "vtuber", "bilibili", "live", "music"],
			robots: {
				index: true,
				follow: false,
			},
			icons: profile.themes.filter((theme) => theme.isActive).map((theme) => ({
				rel: "icon",
				url: theme.faviconImagePath!,
			})),
			openGraph: {
				title: profile.metaTitle || "主播歌单",
				description: profile.metaDescription || "主播歌单",
			},
			twitter: {
				card: "summary",
				title: profile.metaTitle || "主播歌单",
				description: profile.metaDescription || "主播歌单",
			},
		};
	}

	// Fallback metadata
	return {
		title: "Vtuber Profile",
		description: "Vtuber Profile",
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN" suppressHydrationWarning={true}>
			<body className={`${alexBrush.variable} font-chinese`}>
				<Providers>{children}</Providers>
				{/*Toastify and Toaster are both used as I don't feel like changing the admin page when I switch toast library for the main page*/}
				<ToastContainer autoClose={1000} />
				<Toaster />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
