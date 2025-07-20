"use client";

import { Icons } from "@/components/Icons";
import Link from "next/link";
import { useState, useEffect, type FC } from "react";

interface PremiumCardProps {
	present: boolean;
}

/**
 * A card for premium songs, whose occurrences are not shown to the public.
 */
const PremiumCard: FC<PremiumCardProps> = ({ present }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const transform =
		present && mounted
			? "scaleY(1) translateY(0)"
			: "scaleY(0.5) translateY(-50%)";
	const maxHeight = present && mounted ? "100px" : "0px";
	const opacity = present && mounted ? "1" : "0";

	return (
		<div
			className="overflow-hidden"
			style={{
				maxHeight: maxHeight,
				transition: "max-height, opacity",
				transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
				transitionDuration: "200ms",
				transformOrigin: "top",
				opacity: opacity,
			}}
		>
			<div
				style={{
					transform: transform,
					transition: "transform, opacity",
					transformOrigin: "top",
					transitionDuration: "200ms",
					opacity: opacity,
					transitionTimingFunction: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
				}}
			>
				<div className="flex items-center justify-center py-8">
					<div className="flex items-center gap-2 text-gray-500">
						<span>请前往直播间点歌~</span>
						<Link href="https://live.bilibili.com/23369901" target="_blank">
							<Icons.bilibili_live_costly className="w-8 h-8" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

PremiumCard.displayName = "PremiumCard";

export default PremiumCard;