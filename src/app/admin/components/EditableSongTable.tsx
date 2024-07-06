"use client";
import {
  ColumnFilter,
  FilterFn,
  PaginationState,
  RowData,
  createColumnHelper,
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createSong, updateSong } from "@/app/actions/crud";

import AddHeaderCell from "./AddHeaderCell";
import EditCell from "./EditCell";
import EditableListCell from "./EditableListCell";
import { EditableSong } from "../page";
import EditableTextCell from "./EditableTextCell";
import Filter from "./Filter";
import { Map } from "immutable";
import { toast } from "sonner";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    revertData: (rowIndex: number, revert: boolean) => void;
    updateEditedData: (
      rowId: string,
      columnIndex: number,
      value: unknown
    ) => void;
    insertData: (value: TData) => Promise<boolean>;
    persistdata: (rowIndex: number, rowId: string) => Promise<boolean>;
    editedRows: Map<string, unknown[]>;
    setEditedRows: Dispatch<SetStateAction<Map<string, unknown[]>>>;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type: string;
  }

  interface ColumnDefBase<TData extends RowData, TValue = unknown> {
    isAdd?: boolean;
  }
}

interface PropType {
  songs: EditableSong[];
}

const filterSubstrInArr: FilterFn<any> = (row, columnId, value, addMeta) => {
  const arr = row.getValue(columnId) as string[];
  return arr.some((s) => s.indexOf(value) !== -1);
};

const columnHelper = createColumnHelper<EditableSong>();

const columns = [
  columnHelper.accessor("title", {
    header: "歌名",
    meta: {
      type: "text",
    },
    cell: EditableTextCell,
    filterFn: filterFns.includesString,
  }),

  columnHelper.accessor("artist", {
    header: "歌手",
    cell: EditableTextCell,
    meta: {
      type: "text",
    },
    filterFn: filterFns.includesString,
  }),

  columnHelper.accessor("lang", {
    header: "语种",
    cell: EditableListCell,
    meta: {
      type: "list",
    },
    filterFn: filterSubstrInArr,
  }),

  columnHelper.accessor("url", {
    header: "作品链接",
    cell: EditableTextCell,
    meta: {
      type: "link",
    },
    filterFn: filterFns.includesString,
  }),

  columnHelper.accessor("tag", {
    header: "标签",
    cell: EditableListCell,
    meta: {
      type: "list",
    },
    filterFn: filterSubstrInArr,
  }),

  columnHelper.accessor("remark", {
    header: "备注",
    cell: EditableTextCell,
    meta: {
      type: "text",
    },
    filterFn: filterFns.includesString,
  }),

  columnHelper.accessor("bucket_url", {
    header: "源文件链接",
    cell: EditableTextCell,
    meta: {
      type: "link",
    },
    filterFn: filterFns.includesString,
  }),

  columnHelper.display({
    id: "edit",
    header: AddHeaderCell,
    cell: EditCell,
    isAdd: true,
  }),
];

export default function EditableSongTable({ songs }: PropType) {
  const [data, setData] = useState([...songs]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const [originalData, setOriginalData] = useState(() => [...songs]);
  const [editedRows, setEditedRows] = useState<Map<string, unknown[]>>(Map());

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex,
    state: {
      pagination,
      columnFilters,
    },
    meta: {
      revertData: (rowIndex: number, revert: boolean) => {
        skipAutoResetPageIndex();
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
      updateEditedData: (rowId, columnIndex, value) => {
        const oldCol = editedRows.get(rowId) as unknown[];
        const newCol = [...oldCol];
        newCol[columnIndex] = value;
        setEditedRows((oldData) => oldData.set(rowId, newCol));
      },
      persistdata: async (rowIndex, rowId) => {
        const updatedValues = editedRows.get(rowId) as unknown[];
        const originalSong = data[rowIndex];
        const updatedSong: EditableSong = {
          id: originalSong.id,
          title: updatedValues[0] as string,
          artist: updatedValues[1] as string,
          lang: updatedValues[2] as string[],
          url: updatedValues[3] as string,
          tag: updatedValues[4] as string[],
          remark: updatedValues[5] as string,
          bucket_url: updatedValues[6] as string,
        };

        const res = await updateSong(updatedSong);

        if (res.success) {
          toast.success(`歌曲 ${updatedSong.title} 已成功更新`, {
            position: "bottom-left",
          });
          setData((oldData) =>
            oldData.map((song) => {
              if (song.id === updatedSong.id) {
                return updatedSong;
              }
              return song;
            })
          );
          return true;
        }

        toast.error(
          `歌曲 ${updatedSong.title} 更新失败: ${
            res.message || "原因异常, 请报bug"
          }`,
          {
            position: "bottom-left",
          }
        );
        return false;
      },

      insertData: async (newSong) => {
        const res = await createSong(newSong);
        if (res.success) {
          const newSongEntry = res.song;
          if (newSongEntry) {
            toast.success(`歌曲 ${newSong.title} 添加成功`, {
              position: "bottom-left",
            });

            const newEditableSongEntry: EditableSong = {
              ...newSongEntry,
              bucket_url: (newSongEntry.extra as any).bucket_url || "",
            };

            setData((oldData) => [newEditableSongEntry, ...oldData]);
            return true;
          }
          // unreachable
        }

        toast.error(
          `歌曲 ${newSong.title} 添加失败: ${
            res.message || "原因异常, 请报bug"
          }`,
          {
            position: "bottom-left",
          }
        );
        return false;
      },

      editedRows,
      setEditedRows,
    },

    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Note that user expects to see 1-based page index
  const currentPageIdxOneBased = pagination.pageIndex + 1;

  return (
    <div className="rounded-md border p-1 md:p-4 w-full md:w-3/4 m-auto">
      <Table className="table-auto overflow-x-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
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
                  <TableCell key={cell.id} className="whitespace-nowrap">
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

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}
