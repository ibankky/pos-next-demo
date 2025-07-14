"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import Tables from "@/components/TablesVoid";
import dayjs from "dayjs";

export default function VoidPage() {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetchPosTransaction();
  }, []);

  const fetchPosTransaction = async () => {
    try {
      const res = await fetch(`/api/pos/transaction`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      console.log("transtaction");
      console.log(json.data.data.result);
      setTransaction(json.data.data.result);
      //setMenuData(json.data.result);
    } catch (err) {
      console.error("Error loading menuDataList:", err);
    }
  };

  const handleSelectedItem = (item) => {
    console.log(item)
    setSelectedItem((prev) => {
      const exists = prev.some((i) => i.bill_no === item.bill_no);
      return exists ? prev : [...prev, item];
    });
  };

  const columns = [
    {
      header: "เลขที่",
      accessorKey: "bill_no",
      cell: (info) => info.getValue(),
    },
    {
      header: "วันที่",
      accessorKey: "bill_date",
      cell: ({ row }) => {
        const rawDate = row.original.bill_date;
        return dayjs(rawDate).format("DD/MM/YYYY HH.mm");
      },
    },
    {
      header: "สมาชิก",
      accessorKey: "member_tel",
      cell: (info) => info.getValue(),
    },
    {
      header: "card",
      accessorKey: "card_no",
      cell: (info) => info.getValue(),
    },
    {
      header: "ราคา",
      accessorKey: "price",
      cell: (info) => info.getValue(),
    },
    {
      header: "eCoin",
      accessorKey: "e_coin",
      cell: (info) => info.getValue(),
    },
    {
      header: "eBonus",
      accessorKey: "e_bonus",
      cell: (info) => info.getValue(),
    },
    {
      header: "สถานะ",
      accessorKey: "bill_status",
      cell: (info) => info.getValue(),
    },
    {
      header: "POS",
      accessorKey: "pos_code",
      cell: (info) => info.getValue(),
    },
    {
      header: "สาขา",
      accessorKey: "branch_name",
      cell: (info) => info.getValue(),
    },
    {
      header: "Cashier",
      accessorKey: "cashier",
      cell: (info) => info.getValue(),
    },
  ];

  const rows = selectedItem.map((item, index) => ({
    /* name: `รายการที่ ${index + 1} ${
      "[ " + item.group_menu_name + " ]" ?? "-"
    } ${item.menu_name ?? item.code}`, */
    name : `name ${index + 1}`,
    qty: item.qty ?? 1,
    price: item.price ?? 0,
    ecoin: item.e_coin ?? 0,
    ebonus: item.e_bonus ?? 0,
    
  }));
  return (
    <div>
      <div className="p-6 flex gap-4">
        <div className="w-2/5 rounded-b-md bg-purple-100 p-6 rounded-xl">
          <h2 className="text-lg font-bold text-black">ค้นหารายการ</h2>
          <div className="flex gap-4 items-center mt-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">ตั้งแต่ :</label>
              <input
                type="date"
                className="border border-purple-500 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">ถึง :</label>
              <input
                type="date"
                className="border border-purple-500 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium mb-1">ค้นหาเบอร์โทร :</label>
            <input
              type="text"
              placeholder="ระบุเบอร์โทร"
              className="rounded-md px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium mb-1">ค้นหาเลขที่บิล :</label>
            <input
              type="text"
              placeholder="ระบุเลขที่บิล"
              className="rounded-md px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
        <div className="w-3/5 flex gap-4">
          <div className="w-1/2 flex flex-col">
            <div className="bg-orange-400 rounded-tl-md rounded-tr-md">
              <div className="text-white p-4 text-center text-2xl">
                คัดยอดใน Card
              </div>
            </div>
            <div className="flex flex-col bg-white px-4 py-4">
              <div>หมายเลขบัตร</div>
              <div className="text-3xl text-purple-600 text-center">AAAAAA</div>
            </div>
            <div className="flex bg-white px-4 py-4">
              <div className="w-1/2">
                <div>eCoin</div>
                <div className="text-3xl text-purple-600 text-center">200</div>
              </div>
              <div className="w-1/2">
                <div>eBonus</div>
                <div className="text-3xl text-purple-600 text-center">200</div>
              </div>
            </div>
            <div className="flex bg-white">
              <button
                type="button"
                className="w-full border  border-[#5834ED] bg-[#5834ED] text-white rounded py-2 text-center text-2xl"
              >
                Check Card
              </button>
            </div>
          </div>
          <div className="w-1/2 bg-white">เหตุผล</div>
        </div>
      </div>
      <div className="mt-2 bg-white min-h-80 overflow-auto max-h-80">
        <div className="min-w-full">
          <DataTable
            columns={columns}
            data={transaction}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={pageCount}
            isPagination={false}
             onRowClick={(rowData) => {
                      handleSelectedItem(rowData);
                    }}
          />
        </div>
      </div>
      <div className="flex mt-2">
        <div className="w-3/4">
          <p className="text-red-500 mb-1.5">รายละเอียดรายการ *</p>
          <div className="w-full h-10 bg-white">
           <Tables rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}
