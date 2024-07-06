"use client";

import { Cell, type Row, type Table } from "@tanstack/react-table";
import { type MouseEventHandler, useState } from "react";

import { Button } from "../../../components/ui/button";
import type { EditableSong } from "../page";
import { Icons } from "@/components/Icons";

interface PropType {
	row: Row<EditableSong>;
	table: Table<EditableSong>;
}

export default function EditCell({ row, table }: PropType) {
	const [isLoading, setIsLoading] = useState(false);
	const meta = table.options.meta;

	const onEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
		const originalCellValues = row.getAllCells().map((cell) => cell.getValue());
		meta?.setEditedRows((old) => old.set(row.id, originalCellValues));
	};

	const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
		setIsLoading(true);
		const success = await meta?.persistdata(row.index, row.id);
		setIsLoading(false);
		if (success) {
			meta?.setEditedRows((old) => old.delete(row.id));
		}
		meta?.revertData(row.index, !success);
	};

	const onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
		meta?.setEditedRows((old) => old.delete(row.id));
		meta?.revertData(row.index, true);
	};

	const isEditing = meta?.editedRows.has(row.id);

	return isEditing ? (
		<>
			<Button
				onClick={onCancel}
				disabled={isLoading}
				variant="outline"
				size="sm"
				className="whitespace-nowrap"
			>
				X
			</Button>
			<Button
				onClick={onSubmit}
				disabled={isLoading}
				variant="outline"
				size="sm"
				className="whitespace-nowrap"
			>
				✔{" "}
				{isLoading && (
					<Icons.spinner className="inline, h-4, w-4, animate-spin" />
				)}
			</Button>
		</>
	) : (
		<Button onClick={onEdit} variant="outline" size="sm">
			✐
		</Button>
	);
}
