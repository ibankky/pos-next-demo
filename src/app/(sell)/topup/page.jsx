"use client";

import { useEffect, useState } from "react";
import NumericKeypad from "@/components/NumericKeypad";
import Tables from "@/components/Tables";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import DataTable from "@/components/DataTable";
import { usePosStore } from "@/store";
import Swal from "sweetalert2";
import PaymentPopup from "@/components/PaymentPopup";

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
  const [topupMenu, setTopupMenu] = useState({});
  const [payments, setPayments] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const {
    addItem,
    selectedItems,
    totalAmount,
    clearItems,
    cardDataStore,
    memberTelephone,
    clearCardData,
    clearTelePhone,
  } = usePosStore();
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
    fetchMasterPayment();
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
      const res = await fetch(`/api/pos-menu/sale-all`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const json = await res.json();
      setTopupMenu(json.data);
      //setMenuData(json.data.result);
    } catch (err) {
      console.error("Error loading menuDataList:", err);
    }
  };

  const paymentMetaMap = {
    Cash: { color: "#BEE0CF", icon: "/icon/pos.svg" },
    Transfer: { color: "#FEE0A8", icon: "/icon/pos.svg" },
    "Shopee Pay": { color: "#F3B0A8", icon: "/icon/pos.svg" },
    "Credit Card": { color: "#F9DEE8", icon: "/icon/pos.svg" },
    Voucher: { color: "#D3B8D8", icon: "/icon/pos.svg" },
  };

  const fetchMasterPayment = async () => {
    try {
      const res = await fetch(`/api/master/payment`);
      if (!res.ok) throw new Error("Failed to fetch master payment");
      const json = await res.json();
      const paymentData = json.data.map((item) => ({
        ...item,
        ...(paymentMetaMap[item.name] || {
          color: "#ccc", // fallback
          icon: "/icon/pos.svg",
        }),
      }));
      setPayments(paymentData);
    } catch (err) {
      console.error("Error loading master payment:", err);
    }
  };

  const handleConfirm = (val) => {
    const topupNew = {
      ...topupMenu, // copy properties จาก topupMenu
      price: Number(val),
      group_menu_name: "เติมเงิน",
      menu_id: topupMenu.id,
      menu_name: topupMenu.description,
    };
    addItem(topupNew);
  };

  const handleConfirmCash = () => {
    setIsOpen(false)
    const cashMethod = payments.find((p) => p.name === "Cash");
    if (cashMethod) {
      topUpTocard(cashMethod);
    }
  }

  const handleSelectedItem = (newItem) => {
    addItem(newItem);
  };

  const handlePaymentClick = (method) => {
    
    if (!memberTelephone) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกเบอร์โทร",
        text: "ต้องกรอกเบอร์สมาชิกก่อนดำเนินการ",
      });
      return;
    }

    if (!cardDataStore?.card_no || !cardDataStore?.card_type) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลบัตรไม่ครบ",
        text: "กรุณาระบุข้อมูลบัตรให้ครบถ้วน",
      });
      return;
    }

    if (!selectedItems.length) {
      Swal.fire({
        icon: "info",
        title: "ยังไม่มีสินค้า",
        text: "กรุณาเลือกรายการสินค้าอย่างน้อย 1 รายการ",
      });
      return;
    }

    
    if (method.name === 'Cash') {
      setIsOpen(true)
    } else {
      topUpTocard(method);
      // default action
    }
  };

  const topUpTocard = async (method) => {
    const payload = {
      bank_detail: method.name,
      bill_location: "CCB", //Location get from user login
      bill_payment_id: method.id,
      cachier: "admin", //name from user login
      card_no: cardDataStore?.card_no,
      card_type_id: "d96dca64-e075-416f-a8df-c9423093087c", // find from card type
      free_point: 0,
      from_channel: "POS",
      is_active: true,
      member_tel: memberTelephone,
      pos_id: "POS001", // from max addrss search
      pos_menu_id: 101,
      pos_type: "topup",
      products: selectedItems.map((item) => ({
        product_id: item.menu_id,
        quantity:
          item.menu_id === 1
            ? Math.round(item.totalprice ?? 0) // ใช้ totalprice ถ้าเป็น menu_id 1
            : item.qty ?? 1, // ปกติใช้ qty
      })),
    };

    console.log(payload);

    try {
      const res = await fetch("/api/card/topup-pos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Topup failed:", error);
        return;
      }

      const data = await res.json();
      console.log("Topup success:", data);
      Swal.fire({
        icon: "success",
        title: "เติมเงินสำเร็จ",
        text: "เติมเงินสำเร็จ",
      }).then(() => {
        clearItems();
        clearCardData();
        clearTelePhone();
      });
    } catch (err) {
      console.error("Topup error:", err);
    }
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

  const rows = selectedItems.map((item, index) => ({
    name: `รายการที่ ${index + 1} ${
      "[ " + item.group_menu_name + " ]" ?? "-"
    } ${item.menu_name ?? item.code}`,
    qty: item.qty ?? 1,
    price: item.price ?? 0,
    ecoin: item.e_coin ?? 0,
    ebonus: item.e_bonus ?? 0,
    totalprice: (item.price ?? 0) * item.qty,
    totalecoin: (item.e_coin ?? 0) * item.qty,
    totalebonus: (item.e_bonus ?? 0) * item.qty,
    menu_id: item.menu_id,
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
          <div className="mt-2 bg-white min-h-80 overflow-auto max-h-80">
            <div className="min-w-full">
              <DataTable
                columns={columns}
                data={menuData}
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
          {payments.map((method) => (
            <div
              key={method.id}
              className="w-36 h-30 flex flex-col items-center justify-center rounded-md"
              style={{ backgroundColor: method.color }}
              onClick={() => handlePaymentClick(method)}
            >
              <Image
                src="/icon/pos.svg"
                alt="POS Icon"
                width={30}
                height={30}
                className="rounded"
              />
              <div className="mt-2 text-xl">{method.name}</div>
            </div>
          ))}
        </div>
      </div>
      <PaymentPopup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmCash}
      />
    </div>
  );
}
