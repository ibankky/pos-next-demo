"use client";

import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { usePosStore } from "@/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MemberSidebar() {
  const totalAmount = usePosStore((state) => state.totalAmount);
  const totalecoin = usePosStore((state) => state.totalecoin);
  const totalebonus = usePosStore((state) => state.totalebonus);
  const cardDataStore = usePosStore((state) => state.cardDataStore);
  const setCardData = usePosStore((state) => state.setCardData);
  const clearCardDataStore = usePosStore((state) => state.clearCardData);
  const member = usePosStore((state) => state.member);
  const setMember = usePosStore((state) => state.setMember);
  const clearMember = usePosStore((state) => state.clearMember);
  const [phone, setPhone] = useState("");
  const [cardNo, setCardNo] = useState("");
  const router = useRouter();

  const checkCardTelephone = async () => {
    try {
      const res = await fetch(`/api/card/tel/${member.phone}`);
      console.log(res.status);
      if (res.status !== 200) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบหมายเลขสมาชิก",
          text: "ไม่พบหมายเลขสมาชิก กรุณาลองใหม่อีกครั้ง",
        });
        return;
      }
      const json = await res.json();
      const updatedMember = {
        phone: json.data.tel,
        name: `${json.data.m_name} ${json.data.s_name}`,
      };
      setMember(updatedMember);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: `คุณ ${updatedMember.name}`,
      });
      return;
    } catch (err) {
      console.error("Error loading card by tel:", err);
    }
  };

  const checkCardNo = async () => {
    console.log("check card");
    console.log(cardDataStore);
    try {
      const res = await fetch(`/api/card/check/${cardDataStore.card_no}`);
      if (!res.ok) throw new Error("Failed to fetch card by Id");
      const json = await res.json();

      if (json.data.card_no) {
        setCardData(json.data);
        setCardData({
          card_no: json.data.card_no,
          card_type: json.data.card_type,
          e_coin: json.data.e_coin,
          e_bonus: json.data.e_bonus,
        });
      }
    } catch (err) {
      console.error("Error loading card by tel:", err);
    }
  };

  const handleClearTelephone = () => {
    setPhone("");
    clearMember();
  };

  return (
    <div className="flex flex-col h-[95%] w-64 p-4 bg-white justify-between mt-1">
      {/* ส่วนบน */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="bg-[#F96C20] text-white text-xl text-center rounded-t-xl justify-center items-center py-4">
            member
          </div>
          <div className="border border-gray-300 text-2xl text-gray-800 text-center py-3">
            <input
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์"
              className="text-2xl text-gray-800 text-center py-3 w-full outline-none rounded"
              maxLength={10}
              value={member.phone}
              onChange={(e) =>
                setMember({
                  ...member,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
          <div className="border border-gray-300 text-md text-gray-800 text-center py-3">
            {member.name ? member.name : "ลูกค้าทั่วไป"}
          </div>
          <Button
            className="w-full bg-[#5834ED] text-white h-10 p-6"
            onClick={() => checkCardTelephone()}
          >
            <div className="flex items-center justify-center  text-2xl">
              ค้นหาสมากชิก
            </div>
          </Button>
        </div>
        <div>
          <Button
            className="w-full border border-[#F96C20] text-[#F96C20] bg-white h-10 p-6"
            onClick={handleClearTelephone}
          >
            <div className="flex items-center justify-center  text-2xl">
              Clear
            </div>
          </Button>
        </div>
        <div>
          <div className="border rounded-md  shadow-md  text-center">
            <div className="p-2 border-b">
              <div className="text-sm font-semibold ">Card :</div>
              <div className="text-xl text-purple-600 font-bold text-center">
                <input
                  type="text"
                  placeholder="Card No"
                  className="text-2xl text-gray-800 text-center py-3 w-full outline-none rounded"
                  maxLength={10}
                  value={cardDataStore?.card_no}
                  onChange={(e) =>
                    setCardData({
                      ...cardDataStore,
                      card_no: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="p-2 border-b flex justify-center items-center">
              <div className="w-1/2">
                <div className="text-sm font-semibold ">eCoin :</div>
                <div className="text-xl text-purple-600 font-bold text-center">
                  <span>{cardDataStore?.e_coin ?? 0}</span>
                </div>
              </div>
              <div className="w-1/2">
                <div className="p-2 border-b">
                  <div className="text-sm font-semibold">eBonus :</div>
                  <div className="text-xl text-purple-600 font-bold text-center">
                    <span>{cardDataStore?.e_bonus ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-2  bg-violet-600 text-white font-bold rounded-md border-2 shadow h-16 text-xl"
              onClick={() => checkCardNo()}
            >
              Check Card
            </Button>
          </div>
        </div>
        <div>
          <div className="rounded-md text-center">
            <div className="p-2 border-2 border-purple-500 rounded-xl m-2">
              <div className="text-sm font-semibold">ราคา :</div>
              <div className="text-3xl font-extrabold text-purple-600">
                {totalAmount ? Number(totalAmount).toLocaleString() : "0"}
              </div>
            </div>

            <div className="p-2 border flex justify-center items-center">
              <div className="w-1/2">
              <div className="text-sm font-semibold">ecoin :</div>
              <div className="flex justify-center gap-6 mt-1 text-purple-600 font-bold text-xl">
                <span>
                  {totalecoin ? Number(totalecoin).toLocaleString() : "0"}
                </span>
              </div>
              </div>
              <div className="w-1/2">
              <div className="text-sm font-semibold">ebonus :</div>
              <div className="text-purple-600 font-bold text-xl">
                {totalebonus ? Number(totalebonus).toLocaleString() : "0"}
              </div></div>
              
            </div>

            <div className="p-2 border">
              <div className="text-sm font-semibold">Free Point :</div>
              <div className="text-purple-600 font-bold text-xl">0</div>
            </div>
          </div>
        </div>
        <div>
          <Button
            className="w-full bg-red-600 text-white h-12"
            onClick={() => router.push("/main")}
          >
            <div className="flex items-center justify-center gap-2 text-2xl">
              <X className="w-20 h-20" />
              ปิด
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
