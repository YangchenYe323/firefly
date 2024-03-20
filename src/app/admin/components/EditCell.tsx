import { Row, Table } from "@tanstack/react-table";

import { Button } from "../../../components/ui/button";
import { MouseEventHandler } from "react";
import { Song } from "@/generated/client";

interface PropType {
  row: Row<Song>;
  table: Table<Song>;
}

export default function EditCell({ row, table }: PropType) {
  const meta = table.options.meta;

  const setEditedRows: MouseEventHandler = (e) => {
    const elementName = (e.currentTarget as HTMLButtonElement).name;

    // Revert edited rows state.
    meta?.setEditedRows((old: any) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    // Set data
    if (elementName !== "edit") {
      meta?.revertData(row.index, elementName === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <Button onClick={setEditedRows} name="cancel" variant="outline" size="sm">
        X
      </Button>{" "}
      <Button onClick={setEditedRows} name="finish" variant="outline" size="sm">
        ✔
      </Button>
    </>
  ) : (
    <Button onClick={setEditedRows} name="edit" variant="outline" size="sm">
      ✐
    </Button>
  );
}
