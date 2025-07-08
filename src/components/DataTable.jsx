"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DataTable({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  isLoading,
  globalFilter,
  setGlobalFilter,
  isSearch,
  isPagination,
  onRowClick,
  selectedItems = [],
}) {

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
    manualFiltering:true,
    pageCount,
  });

  const pageWindowSize = 10; // จำนวนปุ่มที่แสดงต่อ 1 หน้า
  const currentWindowStart =
    Math.floor(pagination.pageIndex / pageWindowSize) * pageWindowSize;

  const visiblePages = Array.from({ length: pageWindowSize }, (_, i) => {
    const page = currentWindowStart + i + 1;
    return page <= pageCount ? page : null;
  }).filter(Boolean); // ตัด null ที่เกิน pageCount

  return (
    <div className='space-y-4'>
      {isSearch && (
        <Input
        placeholder="ค้นหา..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      )}
      
      <div className='rounded-md border'>
        {isLoading && (
          <div className='fixed inset-0 flex items-center justify-center bg-white/70 z-10'>
            <div className='loader' />
          </div>
        )}
        <div className="overflow-y-auto max-h-80">
        <table className='w-full table-auto border-collapse'>
          <thead className='bg-gray-100'>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th key={header.id} className='sticky top-0 bg-gray-100 px-4 py-2 text-left text-sm z-10'>
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
             <tr
             key={row.id}
             className='hover:bg-gray-50 cursor-pointer'
             onClick={() => {
              onRowClick?.(row.original);
             }}
           >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4 py-4 border-t text-md'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
     
    </div>
  );
}
