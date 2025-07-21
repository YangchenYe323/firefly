"use client";

import type { FC } from "react";
import { Music, Calendar } from "lucide-react";

interface ViewTabsProps {
	activeView: "songs" | "calendar";
	onViewChange: (view: "songs" | "calendar") => void;
}

const ViewTabs: FC<ViewTabsProps> = ({ activeView, onViewChange }) => {
	return (
		<div className="flex justify-center mb-6">
			<div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200/50">
				<button
					type="button"
					onClick={() => onViewChange("songs")}
					className={`
						flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
						${activeView === "songs"
							? "bg-blue-500 text-white shadow-sm"
							: "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
						}
					`}
				>
					<Music className="w-4 h-4" />
					歌曲列表
				</button>
				<button
					type="button"
					onClick={() => onViewChange("calendar")}
					className={`
						flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
						${activeView === "calendar"
							? "bg-blue-500 text-white shadow-sm"
							: "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
						}
					`}
				>
					<Calendar className="w-4 h-4" />
					直播日历
				</button>
			</div>
		</div>
	);
};

export default ViewTabs; 