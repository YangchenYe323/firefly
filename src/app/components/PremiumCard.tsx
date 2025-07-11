"use client";

import { Icons } from "@/components/Icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

/**
 * A card for premium songs, whose occurrences are not shown to the public.
 */
export function PremiumCard() {
	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: "auto", opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="overflow-hidden"
		>
			<div className="flex items-center justify-center py-8">
				<div className="flex items-center gap-2 text-gray-500">
					<span>请前往直播间点歌~</span>
					<Link href="https://live.bilibili.com/23369901" target="_blank">
						<Icons.bilibili_live_costly className="w-8 h-8" />
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
