"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import type { Filter } from "./SongPanel";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
	filters: Filter[];
	onFilterChange: (filter: Filter) => void;
	selectedFilter: Filter;
}

/**
 * ScrollableTags component for displaying and selecting song filters
 *
 * Design decisions:
 * 1. Horizontal scrolling with hidden scrollbars for clean UI
 * 2. Responsive button sizing with consistent spacing
 * 3. Visual feedback for selected state with color changes
 * 4. Rounded pill design for modern, touch-friendly interface
 * 5. Smooth transitions for state changes
 * 6. Scroll buttons for better navigation on desktop
 *
 * This component works in conjunction with SongPanel to provide
 * an intuitive filtering interface that works well on both desktop and mobile
 */
export default function ScrollableTags({
	filters,
	onFilterChange,
	selectedFilter,
}: Props) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
		}
	};

	const handleScroll = useCallback(() => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setShowLeftButton(scrollLeft > 0);
			setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
		}
	}, []);

	// Check scroll state on mount and when filters change
	useEffect(() => {
		// Use setTimeout to ensure DOM is fully rendered
		const timer = setTimeout(() => {
			handleScroll();
		}, 0);

		return () => clearTimeout(timer);
	}, [handleScroll]);

	return (
		<div className="relative group">
			{/* Left scroll button */}
			{showLeftButton && (
				<button
					type="button"
					onClick={scrollLeft}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:from-white/50 hover:to-white/30"
					title="向左滚动"
				>
					<Icons.player_prev_button className="w-4 h-4 text-gray-700/80 mx-auto" />
				</button>
			)}

			{/* Right scroll button */}
			{showRightButton && (
				<button
					type="button"
					onClick={scrollRight}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:from-white/50 hover:to-white/30"
					title="向右滚动"
				>
					<Icons.player_next_button className="w-4 h-4 text-gray-700/80 mx-auto" />
				</button>
			)}

			{/* Container with horizontal scrolling and hidden scrollbars */}
			<div
				ref={scrollContainerRef}
				className="w-full overflow-x-auto scrollbar-hide"
				onScroll={handleScroll}
			>
				{/* Inner container with flex layout and minimum width to prevent wrapping */}
				<div className="flex gap-2 p-2 min-w-max">
					{filters.map((filter) => (
						<Button
							key={filter.value}
							variant="outline"
							size="sm"
							className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
								selectedFilter.value === filter.value
									? "bg-blue-500 text-white border-blue-500 shadow-md"
									: "bg-white/80 text-gray-700 border-gray-200 hover:bg-gray-50"
							}`}
							onClick={() => onFilterChange(filter)}
						>
							{filter.value}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
