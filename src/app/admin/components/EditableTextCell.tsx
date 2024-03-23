"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Column, Row, Table } from "@tanstack/react-table";

import { EditableSong } from "../page";
import { Input } from "../../../components/ui/input";
import Link from "next/link";

interface PropType {
  getValue: () => string | null;
  row: Row<EditableSong>;
  column: Column<EditableSong>;
  table: Table<EditableSong>;
}

export default function EditableTextCell({
  getValue,
  row,
  column,
  table,
}: PropType) {
  const [value, setValue] = useState(getValue());

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  const onBlur = () => {
    table.options.meta?.updateEditedData(row.id, column.getIndex(), value);
  };

  let columnType = column.columnDef.meta?.type;

  const handleChange: ChangeEventHandler = (e) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
  };

  const isEditing = table.options.meta?.editedRows.has(row.id);

  return (
    <div>
      {isEditing ? (
        <Input
          size={30}
          value={value || undefined}
          onChange={handleChange}
          onBlur={onBlur}
          type={columnType || "text"}
        />
      ) : columnType == "link" && value ? (
        <Link href={value} className="underline">
          {value}
        </Link>
      ) : (
        value
      )}
    </div>
  );
}
