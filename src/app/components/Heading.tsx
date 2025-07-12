"use client";

import Image from "next/image";
import type { VtuberProfile } from "@/profile";

interface PropType {
	songCount: number;
	profile: VtuberProfile;
}

export default function Heading({ songCount, profile }: PropType) {
	const { name, avatarImagePath, backgroundImagePath } = profile;

	return (
		<div className="w-full text-center my-6">
			<span className="inline-block overflow-hidden border-0 mx-0 mb-4 p-0">
				<Image
					src={avatarImagePath}
					alt={name}
					width={240}
					height={240}
					className="rounded-full border border-black"
					priority={true}
				/>
			</span>
			<h1 className="text-center text-3xl md:text-4xl lg:text-5xl text-black font-light font-alex_chinese">
				{name}
			</h1>
			<h1 className="pt-4 text-center text-3xl md:text-4xl lg:text-5xl text-black font-light">
				和她<del>不一定</del>拿手的
				{songCount}
				首歌
			</h1>
			<p className="pt-6 pb-4 text-center text-black font-light">
				可以点击歌名复制哦
			</p>
		</div>
	);
}
