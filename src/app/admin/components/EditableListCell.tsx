"use client";

import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Column, Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import ChineseInput from "@/components/ChineseInput";
import { EditableSong } from "../page";

interface PropType {
  getValue: () => string[];
  row: Row<EditableSong>;
  column: Column<EditableSong>;
  table: Table<EditableSong>;
}

interface State {
  currentValues: string[];
  inputValue: string;
}

export default function EditableListCell({
  getValue,
  row,
  column,
  table,
}: PropType) {
  const [currentState, setCurrentState] = useState<State>({
    currentValues: getValue(),
    inputValue: "",
  });
  const inputElRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentState((oldState) => ({
      ...oldState,
      currentValues: getValue(),
    }));
  }, [getValue]);

  const removeEntry = (i: number) => {
    const newEntries = [...currentState.currentValues];
    newEntries.splice(i, 1);
    setCurrentState((oldState) => ({ ...oldState, currentValues: newEntries }));
    table.options.meta?.updateEditedData(row.id, column.getIndex(), newEntries);
  };

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && currentState.inputValue) {
      if (inputElRef.current) {
        inputElRef.current.value = "";
      }

      setCurrentState((oldState) => {
        const newValues = oldState.currentValues.find(
          (val) => val.toLowerCase() === oldState.inputValue.toLowerCase()
        )
          ? [...oldState.currentValues]
          : [...oldState.currentValues, oldState.inputValue];

        return {
          currentValues: newValues,
          inputValue: "",
        };
      });
    }
  };

  const onValueChange = (newVal: string) => {
    setCurrentState((oldState) => ({ ...oldState, inputValue: newVal }));
  };

  const onBlur = () => {
    table.options.meta?.updateEditedData(
      row.id,
      column.getIndex(),
      currentState.currentValues
    );
  };

  const isEditing = table.options.meta?.editedRows.has(row.id);

  return (
    <div>
      {isEditing ? (
        <div>
          <ul className="inline-flex flex-wrap m-0 p-0 w-full" onBlur={onBlur}>
            {currentState.currentValues.map((val, idx) => (
              <li
                key={val}
                className="flex items-center rounded bg-white text-black border mr-2 p-1"
              >
                {val}
                <Button
                  variant="outline"
                  className="inline-flex justify-center items-center w-[15px] h-[15px] rounded-full p-0"
                  onClick={() => removeEntry(idx)}
                >
                  ×
                </Button>
              </li>
            ))}
            <ChineseInput
              placeholder="回车完成编辑"
              onValueChange={onValueChange}
              onKeyDown={onInputKeyDown}
              ref={inputElRef}
            />
          </ul>
        </div>
      ) : (
        currentState.currentValues.join(", ")
      )}
    </div>
  );
}
