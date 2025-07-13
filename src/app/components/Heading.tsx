"use client";

import type { VtuberProfileWithThemesAndLinks } from "../actions/crud";

interface PropType {
	songCount: number;
	profile: VtuberProfileWithThemesAndLinks;
	renderAvatar: () => React.ReactNode;
}

export default function Heading({ songCount, profile, renderAvatar }: PropType) {
	const { name } = profile;

	return (
		<div className="w-full text-center my-6">
			<div className="mb-4">
				{renderAvatar()}
			</div>
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
