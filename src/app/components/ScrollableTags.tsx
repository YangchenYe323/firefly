"use client";

import { Button } from "@/components/ui/button";
import type { Filter } from "./SongPanel";

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
 * 
 * This component works in conjunction with SongPanel to provide
 * an intuitive filtering interface that works well on both desktop and mobile
 */
export default function ScrollableTags({
  filters,
  onFilterChange,
  selectedFilter,
}: Props) {
  return (
    // Container with horizontal scrolling and hidden scrollbars
    <div className="w-full overflow-x-auto scrollbar-hide">
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
  );
} 