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
             <tr
             key={row.id}
             className='hover:bg-gray-50 cursor-pointer'
             onClick={() => {
              onRowClick?.(row.original);
             }}
           >
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
      {data.length > 0 && (
      <div className='flex items-center justify-between mt-4 flex-wrap gap-2'>
        <div className='flex gap-2 flex-wrap'>
          {/* ก่อนหน้า window */}
          {currentWindowStart > 0 && (
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: currentWindowStart - 1,
                }))
              }
              className='px-3 py-1 rounded border border-gray-300 text-sm'
            >
              « ก่อนหน้า
            </button>
          )}

          {/* ปุ่มเลขหน้า */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: page - 1,
                }))
              }
              className={`px-4 py-2 rounded-md border text-sm ${
                pagination.pageIndex === page - 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* ถัดไป window */}
          {currentWindowStart + pageWindowSize < pageCount && (
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: currentWindowStart + pageWindowSize,
                }))
              }
              className='px-3 py-1 rounded border border-gray-300 text-sm'
            >
              ถัดไป »
            </button>
          )}
        </div>

        {/* ปุ่ม ก่อนหน้า / ถัดไป */}
        <div className='flex gap-2'>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.max(prev.pageIndex - 1, 0),
              }))
            }
            disabled={pagination.pageIndex === 0}
            className='px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50'
          >
            ⬅ ก่อนหน้า
          </button>

          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.min(prev.pageIndex + 1, pageCount - 1),
              }))
            }
            disabled={pagination.pageIndex >= pageCount - 1}
            className='px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50'
          >
            ถัดไป ➡
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
