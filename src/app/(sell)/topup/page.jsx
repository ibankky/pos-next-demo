"use client";

import { useEffect, useState } from "react";
import NumericKeypad from "@/components/NumericKeypad";
import Tables from "@/components/Tables";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import DataTable from "@/components/DataTable";
import { usePosStore } from "@/store";

export default function TopUpPage() {
  const [loading, setLoading] = useState(true);
  const [groupMenus, setGroupMenus] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [selectedItem, setSelectedItem] = useState([]);
  const [topupMenu , setTopupMenu] = useState({});
  const totalAmount = usePosStore((state) => state.totalAmount);
  const selectedItems = usePosStore((state) => state.selectedItems);
  const addItem = usePosStore((state) => state.addItem);
  const clearItems = usePosStore((state) => state.clearItems);
  const state = usePosStore();

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
    fetchMenuTopup();
  }, []);

  useEffect(() => {
    if (groupMenus.length > 0 && !selectedId) {
      setSelectedId(groupMenus[0].id);
    }
  }, [groupMenus, selectedId]);

  useEffect(() => {
    if (selectedId) {
      fetchMenuDataList();
    }
  }, [selectedId]);

  const fetchMenuDataList = async () => {
    try {
      const res = await fetch(
        `/api/pos-menu/sale/list?location=ccb&groupMenuId=${selectedId}`
      );
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      setMenuData(json.data.result);
    } catch (err) {
      console.error("Error loading menuDataList:", err);
    }
  };

  const fetchMenuTopup = async () => {
    try {
      const res = await fetch(
        `/api/pos-menu/sale-all`
      );
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      setTopupMenu(json.data);
      //setMenuData(json.data.result);
    } catch (err) {
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
    console.log(topupMenu)
  };

  const handleSelectedItem = (newItem) => {
    console.log('state');
    console.log(state.selectedItems)
    setSelectedItem((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.menu_id === newItem.menu_id
      );

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
  ];

  const columnsMenu = [
    {
      header: "ชื่อ",
      accessorKey: "menu_name",
      cell: (info) => info.getValue(),
    },
    {
      header: "จำนวน",
      accessorKey: "qty",
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
  ];

  const rows = selectedItem.map((item, index) => ({
    name: `รายการที่ ${index+1} ${"[ "+item.group_menu_name+" ]" ?? "-"} ${item.menu_name ?? item.code}`,
    qty: item.qty ?? 1,
    price: item.e_coin ?? 0,
    ecoin: item.e_coin ?? 0,
    ebonus: item.e_bonus ?? 0,
    totalprice: (item.e_coin ?? 0) * item.qty,
    totalecoin: (item.e_coin ?? 0) * item.qty,
    totalebonus: (item.e_bonus ?? 0) * item.qty,
  }));

  /* if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  } */

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold">เติมเงินทั่วไป</h1>
      <div className="flex items-start justify-center gap-x-6">
        <div className="w-1/4">
          <NumericKeypad onConfirm={handleConfirm} />
        </div>
        <div className="w-3/4">
          <div className="flex gap-4">
            {groupMenus.map((menu) => (
              <Button
                key={menu.id}
                variant="secondary"
                size="lg"
                onClick={() => setSelectedId(menu.id)}
                className={`py-6 px-10 text-lg rounded-xl font-semibold
              ${
                selectedId === menu.id
                  ? "bg-purple-100 text-purple-600 border border-purple-500"
                  : "bg-white text-black border border-transparent"
              }
            `}
              >
                {menu.name}
              </Button>
            ))}
          </div>
          <div className="mt-2 bg-white min-h-80 overflow-x-scroll max-h-80">
            <DataTable
              columns={columns}
              data={menuData}
              pagination={pagination}
              setPagination={setPagination}
              pageCount={pageCount}
              isPagination={true}
              onRowClick={(rowData) => {
                handleSelectedItem(rowData);
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-white min-h-60">
        <Tables rows={rows} />
      </div>
      <div className="mt-3 flex">
        <div className="w-1/4 flex gap-4">
          <Button className="bg-white border-[#F96C20] text-[#F96C20] border h-16 rounded-md px-10 text-2xl">
            Clear
          </Button>
          <Button className="bg-white border-[#F96C20] text-[#F96C20] border h-16 rounded-md px-10 text-2xl">
            Delete
          </Button>
        </div>
        <div className="w-3/4 flex gap-10">
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#BEE0CF] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">รับเงิน</div>
          </div>
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#A4CCEA] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">รับเงินพอดี</div>
          </div>
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#FEE0A8] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">โอนเงิน</div>
          </div>
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#F3B0A8] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">Shoppee Pay</div>
          </div>
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#F9DEE8] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">บัตรเครดิต</div>
          </div>
          <div className="w-36 h-30 flex flex-col items-center justify-center bg-[#D3B8D8] rounded-md">
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={30}
            height={30}
            className='rounded'
          />
            <div className="mt-2 text-xl">Voucher</div>
          </div>
        </div>
      </div>
    </div>
  );
}
