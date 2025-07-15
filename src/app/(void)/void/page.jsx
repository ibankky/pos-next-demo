"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import Tables from "@/components/TablesVoid";
import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePosStore } from "@/store";

export default function VoidPage() {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [formData, setFormData] = useState({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    phone: "",
    billNo: "",
  });
  const [reason, setReason] = useState("ลูกค้าขอเปลี่ยนโปรฯ");
  const [customReason, setCustomReason] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [cutInCard, setCutInCard] = useState(true);
  const [cardData , setCardData] = useState("")
  const [coin , setCoin] = useState(0)
  const [bonus , setBonus] = useState(0)
  const member = usePosStore((state) => state.member);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoid = () => {
    const finalReason = isOther ? customReason : reason;
    if (!finalReason.trim()) {
      alert("กรุณาระบุเหตุผลให้ครบถ้วน");
      return;
    }

    console.log("Void with reason:", finalReason);
    // ทำการส่งข้อมูลไป backend ตรงนี้
  };

  useEffect(() => {
    const { startDate, endDate, phone, billNo } = formData;
    const hasValidDates = startDate && endDate;
    const hasValidSearch =
      (phone && phone.length > 3) || (billNo && billNo.length > 3);

    if (hasValidDates && hasValidSearch) {
      fetchPosTransaction();
    }
  }, [formData]);

  const fetchPosTransaction = async () => {
    const { startDate, endDate, phone, billNo } = formData;
   
    const query = new URLSearchParams({
      startDate: startDate,
      endDate: endDate,
      memberTel: phone,
      billNo,
    }).toString();

    if (cutInCard && cardData) {
      // สมมติว่า cardData มีโครงสร้างเป็น object เช่น { card_no: 'ABC123' }
      Object.entries(cardData).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value);
        }
      });
    }
    //console.log('query');
    //console.log(query);
    try {
      const res = await fetch(`/api/pos/transaction?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      setTransaction(json.data.data.result);
      //setMenuData(json.data.result);
    } catch (err) {
      console.error("Error loading menuDataList:", err);
    }
  };

  const fetchPosSubTransaction = async (bill) => {
    const billNo = bill;
    try {
      const res = await fetch(`/api/pos/pos-sub?billNo=${billNo}`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      return json.data.data[0];
      //setMenuData(json.data.result);
    } catch (err) {
      console.error("Error loading menuDataList:", err);
    }
  };

  const handleSelectedItem = async (item) => {
    const subTransaction = await fetchPosSubTransaction(item.bill_no);
    const newItem = {
      ...item,
      name: subTransaction.menu_name,
    };
    setSelectedItem([newItem]);
  };

  const voidTransaction = () => {
    const payload = {
      bill_no: billNo,
      card_no: cardNo,
      void_reason: voidReason,
      void_user: voidUser,
    }
  }

  const checkCard = async () => {
    if(cutInCard){
      if(!cardData){
        Swal.fire({
          icon: "warning",
          title: "กรุณาแสกนบัตร",
          text: "กรุณาแสกนบัตรก่อนดำเนินการ",
        });
        return;
      }
    }
    try {
      const res = await fetch(`/api/card/check/${cardData}`);
      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลบัตรได้");
      const json = await res.json();
      setCoin(json.data.e_coin);
      setBonus(json.data.e_bonus);
      
     
    } catch (err) {
      console.error("Error checking card:", err);
      alert("เกิดข้อผิดพลาดในการดึงข้อมูลบัตร");
    }
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
    name: item.name,
    qty: item.qty ?? 1,
    price: item.price ?? 0,
    ecoin: item.e_coin ?? 0,
    ebonus: item.e_bonus ?? 0,
  }));

  const cancelReasons = [
    { label: "ลูกค้าขอเปลี่ยนโปรฯ", value: "ลูกค้าขอเปลี่ยนโปรฯ" },
    { label: "พนักงานกดผิด", value: "พนักงานกดผิด" },
    { label: "อื่นๆ", value: "อื่นๆ" },
  ];
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
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                disabled
                className="border border-purple-500 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">ถึง :</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled
               className="border border-purple-500 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium mb-1">ค้นหาเบอร์โทร :</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="ระบุเบอร์โทร"
              onChange={handleChange}
              className="rounded-md px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium mb-1">ค้นหาเลขที่บิล :</label>
            <input
              type="text"
              name="billNo"
              value={formData.billNo}
              placeholder="ระบุเลขที่บิล"
              onChange={handleChange}
              className="rounded-md px-3 py-2 border border-gray-300 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
        <div className="w-3/5 flex gap-4">
          <div className="w-1/2 flex flex-col">
            <div className="bg-orange-400 rounded-tl-md rounded-tr-md flex items-center justify-center gap-2 px-4 py-4">
              <Checkbox
                id="cut-in-card"
                checked={cutInCard}
                onCheckedChange={(checked) => setCutInCard(!!checked)}
              />
              <label
                htmlFor="cut-in-card"
                className="text-white text-xl font-bold leading-none"
              >
                ตัดยอดใน Card
              </label>
            </div>
            <div className="flex flex-col bg-white px-4 py-4">
              <div>หมายเลขบัตร</div>
              <input
                  type="text"
                  placeholder="Card No"
                  className="text-3xl text-purple-600 text-center py-3 w-full outline-none rounded"
                  maxLength={10}
                  onChange={(e) =>
                    setCardData(e.target.value)
                  }
                  value={cardData}
                 
                  
                />
            </div>
            <div className="flex bg-white px-4 pt-2 pb-4">
              <div className="w-1/2">
                <div>eCoin</div>
                <div className="text-3xl text-purple-600 text-center">{coin}</div>
              </div>
              <div className="w-1/2">
                <div>eBonus</div>
                <div className="text-3xl text-purple-600 text-center">{bonus}</div>
              </div>
            </div>
            <div className="flex bg-white">
              <button
                type="button"
                className="w-full border  border-[#5834ED] bg-[#5834ED] text-white rounded py-2 text-center text-2xl"
                onClick={checkCard}
              >
                Check Card
              </button>
            </div>
          </div>
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-md">
            <label className="text-red-600 font-semibold text-sm">
              *เหตุผลในการยกเลิก
            </label>

            <Select
              value={reason}
              onValueChange={(val) => {
                setReason(val);
                setIsOther(val === "อื่นๆ");
              }}
            >
              <SelectTrigger
                className="w-full mt-3 border-2 rounded-md px-3 py-2 min-h-[44px] text-black text-md
               placeholder-gray-400 border-purple-500 focus:ring-2 focus:ring-purple-400"
              >
                <SelectValue placeholder="เลือกเหตุผล" />
              </SelectTrigger>
              <SelectContent>
                {cancelReasons.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <input
              type="text"
              placeholder="อื่นๆ (โปรดระบุเหตุผล)"
              disabled={!isOther}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className={`w-full mt-3 border-2 rounded-md px-3 py-2 text-black 
          placeholder-gray-400 
          ${
            isOther
              ? "border-purple-500 focus:ring-2 focus:ring-purple-400"
              : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleVoid}
                className="flex-1 bg-[#5834ED] text-white font-bold py-2 rounded"
              >
                Void
              </button>
              <button
                disabled
                className="flex-1 bg-gray-300 text-white font-bold py-2 rounded cursor-not-allowed"
              >
                Re-print
              </button>
            </div>
          </div>
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
          <div className="w-full h-10 bg-white min-h-32 mb-4">
            <Tables rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}
