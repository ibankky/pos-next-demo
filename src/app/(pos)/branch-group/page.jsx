"use client";

import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/badge"


export default function BranchGroupListPage() {
  const [branchGroups, setBranchGroups] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBranchGroups = async () => {
        try {
          const res = await fetch("/api/branch-group");
          if (!res.ok) throw new Error("Failed to fetch branches");
          const json = await res.json();
          setBranchGroups(json.data || []);
        } catch (err) {
          console.error("Error loading GroupBranches:", err);
        }
      };
    
      fetchBranchGroups();
   }, []);

   const handleEdit = (rowData) => {
    router.push(`/branch-group/${rowData.id}`);
  };
  
  const handleDelete = async (rowData) => {
    if (confirm("คุณแน่ใจว่าต้องการลบ?")) {
      await fetch(`/api/branch-group/${rowData.id}`, { method: "DELETE" });
      // reload table
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "group_name",
      cell: (info) => info.getValue(),
    },
    {
        header: "Sub branch",
        accessorKey: "sub_location_codes",
        cell: (info) => {
          const codes = info.getValue(); // เป็น Array เช่น ["CR2", "CMA", "RSS"]
          if (!codes || codes.length === 0) return "-";
          return (
            <div className="flex flex-wrap gap-1 max-w-[600px] w-2/4">
                {codes.map((code, index) => (
                <Badge key={index} className="text-xs">
                    {code}
                </Badge>
                ))}
            </div>

          );
        },
      },
    {
      header: "สถานะ",
      accessorKey: "is_active",
      cell: (info) =>
        info.getValue() ? (
          <span className='text-green-600 font-medium'>เปิดใช้งาน</span>
        ) : (
          <span className='text-red-600 font-medium'>ปิดใช้งาน</span>
        ),
    },
    {
        header: "action",
        cell: (info) => {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(info.row.original)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(info.row.original)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                ลบ
              </button>
            </div>
          );
        },
      }
  ];
  return (
    <div className='flex gap-4'>
      <div className='w-full  mt-10 bg-white p-6 rounded-xl shadow space-y-6'>
        <div>Branch Group List</div>
        <DataTable
                  columns={columns}
                  data={branchGroups}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  pagination={pagination}
                  setPagination={setPagination}
                  pageCount={pageCount}
                  isLoading={isLoading}
                />
      </div>
    </div>
  );
}
