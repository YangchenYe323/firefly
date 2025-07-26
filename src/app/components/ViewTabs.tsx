"use client";

import type { FC } from "react";
import { Music, Calendar } from "lucide-react";

interface ViewTabsProps {
	activeView: "songs" | "calendar";
	onViewChange: (view: "songs" | "calendar") => void;
}

const ViewTabs: FC<ViewTabsProps> = ({ activeView, onViewChange }) => {
	return (
		<div className="flex justify-center mb-4">
			<div className="relative inline-flex rounded-lg">
				{/* Background tabs (inactive) */}
				<div className="flex">
					<button
						type="button"
						onClick={() => onViewChange("songs")}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 text-purple-300 hover:text-purple-200 hover:bg-white/10"
					>
						<Music className="w-3 h-3" />
						歌单
					</button>
					<button
						type="button"
						onClick={() => onViewChange("calendar")}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 text-purple-300 hover:text-purple-200 hover:bg-white/10"
					>
						<Calendar className="w-3 h-3" />
						日程
					</button>
				</div>

				{/* Active overlay that slides */}
				<div
					className="absolute inset-0 bg-white/30 rounded-md shadow-sm transition-all duration-300 ease-out-quad"
					style={{
						width: "50%",
						left: activeView === "songs" ? "0%" : "50%",
					}}
				>
					{/* Active tab content */}
					<div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700">
						{activeView === "songs" ? (
							<>
								<Music className="w-3 h-3" />
								歌单
							</>
						) : (
							<>
								<Calendar className="w-3 h-3" />
								日程
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewTabs; 