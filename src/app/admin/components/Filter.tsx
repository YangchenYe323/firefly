"use client";

import type { Column, Table } from "@tanstack/react-table";

import ChineseInput from "@/components/ChineseInput";
import type { EditableSong } from "../page";

interface PropType {
	column: Column<EditableSong>;
	table: Table<EditableSong>;
}

export default function Filter({ column, table: _ }: PropType) {
	const columnFilterValue = column.getFilterValue();
	return (
		<ChineseInput
			type="text"
			onValueChange={(value) => column.setFilterValue(value)}
			placeholder=""
			className="w-36 border shadow rounded"
		/>
	);
}
