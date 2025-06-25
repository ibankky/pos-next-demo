"use client";

import { useEffect, useState } from "react";
import NumericKeypad from "@/components/NumericKeypad";
import Tables from "@/components/Tables";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";

export default function TopUpPage() {
  const [loading, setLoading] = useState(true);
  const [groupMenus, setGroupMenus] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [menuData , setMenuData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [selectedItem, setSelectedItem] = useState([])

  useEffect(() => {
    const fetchGroupMenu = async () => {
      try {
        const res = await fetch("/api/group-menu");
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setGroupMenus(json.data || []);
      } catch (err) {
        console.error("Error loading GroupBranches:", err);
      }
    };

    fetchGroupMenu();
    
  }, []);

  useEffect(() => {
    if (groupMenus.length > 0 && !selectedId) {
      setSelectedId(groupMenus[0].id);
    }
  }, [groupMenus, selectedId]);

  useEffect(() => {
    if(selectedId){
      fetchMenuDataList();
    }
    
  }, [selectedId]);

  const fetchMenuDataList = async () => {
    try {
      const res = await fetch(`/api/pos-menu/sale/list?location=ccb&groupMenuId=${selectedId}`);
      if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setMenuData(json.data.result)
    }catch(err){
      console.error("Error loading menuDataList:", err);
    }
  }
  /* useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, []); */

  const handleConfirm = (val) => {
    console.log("Confirmed amount:", val);
  };

  const handleSelectedItem = (newItem) => {
    setSelectedItem((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.menu_id === newItem.menu_id);
  
      if (existingIndex !== -1) {
        // ถ้ามีอยู่แล้ว: เพิ่ม qty + รวมยอด
        const updatedItems = [...prevItems];
        const existing = updatedItems[existingIndex];
        const newQty = existing.qty ? existing.qty + 1 : 2; // default ถ้ายังไม่มี qty คือ 2
  
        updatedItems[existingIndex] = {
          ...existing,
          qty: newQty,
          totalprice: (newItem.e_coin ?? 0) * newQty,
          totalecoin: (newItem.e_coin ?? 0) * newQty,
          totalebonus: (newItem.e_bonus ?? 0) * newQty,
          totaltoken: (newItem.token ?? 0) * newQty,
        };
  
        return updatedItems;
      } else {
        // ถ้ายังไม่มี: เพิ่มใหม่พร้อม qty = 1
        return [
          ...prevItems,
          {
            ...newItem,
            qty: 1,
            totalprice: newItem.e_coin ?? 0,
            totalecoin: newItem.e_coin ?? 0,
            totalebonus: newItem.e_bonus ?? 0,
            totaltoken: newItem.token ?? 0,
          },
        ];
      }
    });
  };
  

  const columns = [
    {
      header: "รายการ",
      accessorKey: "menu_name",
      cell: (info) => info.getValue(),
    },
    {
      header: "ราคา",
      accessorKey: "price",
      cell: (info) => info.getValue(),
    },
    {
      header: "ecoin",
      accessorKey: "e_coin",
      cell: (info) => info.getValue(),
    },
    {
      header: "eBonus",
      accessorKey: "e_bonus",
      cell: (info) => info.getValue(),
    },
    {
      header: "Token",
      accessorKey: "token",
      cell: (info) => info.getValue(),
    },
  ];

  const rows = selectedItem.map((item, index) => ({
    name: `รายการ ${item.group_menu_name ?? "-"} ${item.code ?? index + 1}`,
    qty: item.qty ?? 1,
    price: item.e_coin ?? 0,
    ecoin: item.e_coin ?? 0,
    ebonus: item.e_bonus ?? 0,
    token: 0,
    totalprice: (item.e_coin ?? 0) * item.qty,
    totalecoin: (item.e_coin ?? 0) * item.qty,
    totalebonus: (item.e_bonus ?? 0) * item.qty,
    totaltoken: 0,
  }));
  

  /* if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  } */

  return (
    <div className='p-6 flex flex-col gap-4'>
      <h1 className='text-xl font-bold'>เติมเงินทั่วไป</h1>
      <div className='flex items-start justify-center gap-x-6'>
        <div className='w-1/4'>
          <NumericKeypad onConfirm={handleConfirm} />
        </div>
        <div className='w-3/4'>
          <div className='flex gap-4'>
          {groupMenus.map((menu) => (
            <Button
            key={menu.id}
            variant="secondary"
            size="lg"
            onClick={() => setSelectedId(menu.id)}
            className={`py-6 px-10 text-lg rounded-xl font-semibold
              ${selectedId === menu.id
                ? "bg-purple-100 text-purple-600 border border-purple-500"
                : "bg-white text-black border border-transparent"}
            `}
            >
          {menu.name}
            </Button>
          ))}
          </div>
          <div className='mt-2 bg-white min-h-96'>
            <DataTable
                      columns={columns}
                      data={menuData}
                     
                      pagination={pagination}
                      setPagination={setPagination}
                      pageCount={pageCount}
                      isPagination={true}
                      onRowClick={(rowData) => {
                        handleSelectedItem(rowData)
                      }}
                    />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Tables rows={rows} />
      </div>
    </div>
  );
}
