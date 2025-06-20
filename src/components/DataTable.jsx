"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel, // 👈 สำคัญ!
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DataTable({ columns, data }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, // ปรับขนาดหน้าได้
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString", //
    manualPagination: true,
  });

  return (
    <div className='space-y-4'>
      <Input
        placeholder='🔍 ค้นหา...'
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className='rounded-md border'>
        <table className='w-full table-auto border-collapse'>
          <thead className='bg-gray-100'>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id} className='px-4 py-2 text-left text-sm'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover:bg-gray-50'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4 py-2 border-t text-sm'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <span>Page {pagination.pageIndex + 1}</span>
        <div className='space-x-2'>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='px-3 py-1 border rounded disabled:opacity-50'
          >
            ⬅ ก่อนหน้า
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='px-3 py-1 border rounded disabled:opacity-50'
          >
            ถัดไป ➡
          </button>
        </div>
      </div>
    </div>
  );
}
