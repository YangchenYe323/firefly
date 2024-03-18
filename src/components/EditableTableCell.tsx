"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Column, Row, Table } from "@tanstack/react-table";
import { Song } from "@prisma/client";

interface PropType {
  getValue: () => any;
  row: Row<Song>;
  column: Column<Song>;
  table: Table<Song>;
}

export default function EditableTableCell({
  getValue,
  row,
  column,
  table,
}: PropType) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  let columnType = column.columnDef.meta?.type;

  const handleChange: ChangeEventHandler = (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (columnType === "list") {
      setValue(value.split(","));
    } else {
      setValue(value);
    }
  };

  const valueDisplay = columnType === "list" ? value.join(",") : value;

  if (table.options.meta?.editedRows[row.id]) {
    if (!columnType || columnType === "text") {
      <Input
        value={valueDisplay}
        onChange={handleChange}
        onBlur={onBlur}
        type="text"
      />;
    }

    return <Input value={value} onChange={handleChange} onBlur={onBlur} />;
  }

  return <span>{valueDisplay}</span>;
}
