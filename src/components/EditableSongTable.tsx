"use client";

import { Song } from "@prisma/client";
import {
  PaginationState,
  RowData,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import EditableTableCell from "./EditableTableCell";
import EditCell from "./EditCell";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    revertData: (rowIndex: number, revert: boolean) => void;
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    //?(yangchen) How tf do you type these things?
    editedRows?: any;
    setEditedRows?: any;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    type: string;
  }
}

interface PropType {
  songs: Song[];
}

const columnHelper = createColumnHelper<Song>();

export default function EditableSongTable({ songs }: PropType) {
  const [data, setData] = useState([...songs]);
  const [originalData, setOriginalData] = useState(() => [...songs]);
  const [editedRows, setEditedRows] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    columnHelper.accessor("title", {
      header: "歌名",
      cell: EditableTableCell,
      meta: {
        type: "text",
      },
    }),

    columnHelper.accessor("artist", {
      header: "歌手",
      cell: EditableTableCell,
      meta: {
        type: "text",
      },
    }),

    columnHelper.accessor("genre", {
      cell: EditableTableCell,
      meta: {
        type: "list",
      },
    }),

    columnHelper.accessor("remark", {
      header: "备注",
      cell: EditableTableCell,
      meta: {
        type: "text",
      },
    }),

    columnHelper.display({
      id: "edit",
      cell: EditCell,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    meta: {
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((oldData) =>
          oldData.map((row, index) => {
            if (index == rowIndex) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      editedRows,
      setEditedRows,
    },
  });

  // Note that user expects to see 1-based page index
  const currentPageIdxOneBased = pagination.pageIndex + 1;

  return (
    <div className="rounded-md border w-1/2 m-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <PaginationPrevious onClick={() => table.previousPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => table.firstPage()}>1</PaginationLink>
          </PaginationItem>
          {currentPageIdxOneBased > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPageIdxOneBased > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => table.previousPage()}>
                {currentPageIdxOneBased - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPageIdxOneBased > 1 &&
            currentPageIdxOneBased < table.getPageCount() && (
              <PaginationItem>
                <PaginationLink onClick={() => {}}>
                  {currentPageIdxOneBased}
                </PaginationLink>
              </PaginationItem>
            )}
          {currentPageIdxOneBased < table.getPageCount() - 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  table.nextPage();
                }}
              >
                {currentPageIdxOneBased + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPageIdxOneBased < table.getPageCount() - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink onClick={() => table.lastPage()}>
              {table.getPageCount()}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => table.nextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
