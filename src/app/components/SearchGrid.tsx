"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { Filter, SongFilter } from "./SongPanel";
import { Button } from "../../components/ui/button";

interface PropType {
  heading?: ReactNode;
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
  selectedFilter: Filter;
}

export default function SearchGrid({
  heading,
  filters,
  onFilterChange,
  selectedFilter,
}: PropType) {
  return (
    <div className="w-full">
      {heading && <div className="text-center mt-2">{heading}</div>}
      <div className="w-full flex flex-row flex-wrap justify-center items-stretch p-0.5 md:p-4 m-auto gap-1 md:gap-4">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="outline"
            className={
              selectedFilter.value == filter.value
                ? "rounded-2xl text-center w-[45%] md:w-[23%] border-2 border-black"
                : "rounded-2xl text-center w-[45%] md:w-[23%] border hover:border-2 hover:border-black"
            }
            onClick={() => onFilterChange(filter)}
          >
            {filter.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
