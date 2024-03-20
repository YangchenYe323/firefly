"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Column, Row, Table } from "@tanstack/react-table";

import { EditableSong } from "../page";
import { Input } from "../../../components/ui/input";

interface PropType {
  getValue: () => string[];
  row: Row<EditableSong>;
  column: Column<EditableSong>;
  table: Table<EditableSong>;
}

// TODO: Refactor list cell for better interactivity
export default function EditableListCell({
  getValue,
  row,
  column,
  table,
}: PropType) {
  const initialValue = getValue();
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateEditedData(
      row.id,
      column.getIndex(),
      currentValue
    );
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setCurrentValue(value.split(","));
  };

  const isEditing = table.options.meta?.editedRows.has(row.id);

  return (
    <div>
      {isEditing ? (
        <Input
          value={currentValue}
          onChange={handleChange}
          onBlur={onBlur}
          type={"text"}
        />
      ) : (
        currentValue.join(", ")
      )}
    </div>
  );
}
