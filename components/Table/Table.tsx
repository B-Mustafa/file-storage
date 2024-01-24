"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "../ui/button"
import { FileType } from "@/typings"
import { useAppStore } from "@/store/store"
import DeleteModal from "../DeleteModal"
import RenameModal from "../RenameModal"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    setFileIdFromStore,
    setFilename,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.setFileId,
    state.setFilename,
    state.setIsRenameModalOpen,
  ]);
  
  
  const [fileId, setFileId] = useAppStore((state) => [state.fileId, state.setFileId]);

  
  const openRenameModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFilename(filename);
    setIsRenameModalOpen(true);
  }

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="rounded-md border">
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
                )
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
                <DeleteModal/>
                <RenameModal/>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === 'filename' ? (
                      <p
                        onClick={() => 
                          openRenameModal(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          )
                        }
                        className="underline flex item-center text-blue-500 hover:cursor-pointer"
                      >
                        {cell.getValue() as string}
                        <PencilIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                  <TableCell key={(row.original as FileType).id}>
                  <Button
                  variant={"outline"}
                  onClick={() => {
                  openDeleteModal((row.original as FileType).id)
                  }}
                  >
                  <TrashIcon size={20} />
                  </Button>
                  </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Table;