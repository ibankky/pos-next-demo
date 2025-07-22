"use client";

import { useEffect, useState } from "react";
import { User, Star, CircleDollarSign } from "lucide-react";
import Tables from "@/components/TableClaimAmount";
import TablesClaim from "@/components/TableClaim";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import { usePosStore } from "@/store";
import { calculateBonus } from "@/app/lib/calculateBonus";
export default function ClaimPage() {
  const [loading, setLoading] = useState(true);
  const [bonusSetting, setBonusSetting] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalEstamp , setTotalEstamp] = useState(0)
  const [memberData, setMemberData] = useState({});
  const [memberTel , setMemberTel] = useState("")
  const [bonusData , setBonusData] = useState({})
  useEffect(() => {
    const fetchSettingConfig = async () => {
      try {
        const res = await fetch("/api/pos/bonus-setting");
        if (!res.ok) throw new Error("Failed to fetch bonus-setting");

        const json = await res.json();
        setBonusSetting(json.data);
      } catch (err) {
        console.error("Error loading bonus-setting:", err);
      }
    };

    fetchSettingConfig();
   
    //checkCardTelephone();
  }, []);

  useEffect(() => {
    if (totalAmount && totalEstamp && bonusSetting?.ReturnPersent) {
      const result = calculateBonus({
        totSpending: totalAmount,
        memberEstamp: totalEstamp,
        persent: bonusSetting.ReturnPersent,
        priceToPoint: bonusSetting.PricePoint,
        minPrize: bonusSetting.MinPrize,
        maxPrize: bonusSetting.MaxPrize,
      });
      setBonusData(result);
    }
  }, [totalAmount, totalEstamp, bonusSetting]);

  const fetchmeterRecord = async (phone) => {
    try {
      const res = await fetch(`/api/pos/meter-record/${phone}`);
      if (!res.ok) throw new Error("Failed to fetch meter-record");

      const json = await res.json();
      const meterRecord = json.data.result;
      const expensesData = meterRecord.map((item) => ({
        date: dayjs(item.date).format("DD-MM-YYYY"),
        bill: `#${item.machine_asset}`,
        branch: item.location,
        matchine : item.machine_name,
        ecoin: item.used_ecoin,
        ebonus: item.used_bonus

      }));
      const totalAmount = expensesData.reduce(
        (sum, item) => sum + Number(item.ecoin ?? 0),
        0
      );
      setTotalAmount(totalAmount);
      setExpenses(expensesData);
    } catch (err) {
      console.error("Error loading meter-record:", err);
    }
  };

  const fetchstampHouse = async (phone) => {
    try {
      const res = await fetch(`/api/pos/stamp-house/${phone}`);
      if (!res.ok) throw new Error("Failed to fetch stamp-house");

      const json = await res.json();
      const stampHouseData = json.data.result;
      const playingData = stampHouseData.map((item) => ({
        date: dayjs(item.date).format("DD-MM-YYYY"),
        eStamp: item.e_stamp,
        branch: item.location,
      }));
      const totalAmount = stampHouseData.reduce(
        (sum, item) => sum + Number(item.e_stamp ?? 0),
        0
      );
      setTotalEstamp(totalAmount)
      setPlaying(playingData);
    } catch (err) {
      console.error("Error loading stamp-house:", err);
    }
  };

  const checkCardTelephone = async () => {
    const phone = memberTel;
    if(phone.length === 10) {
        try {
            const res = await fetch(`/api/card/tel/${phone}`);
            if (res.status !== 200) {
              Swal.fire({
                icon: "warning",
                title: "ไม่พบหมายเลขสมาชิก",
                text: "ไม่พบหมายเลขสมาชิก กรุณาลองใหม่อีกครั้ง",
              });
              clearMember();
              return;
            }
            const json = await res.json();
            setMemberData(json.data);
            fetchmeterRecord(json.data.tel);
            fetchstampHouse(json.data.tel);
            
            return;
          } catch (err) {
            console.error("Error loading card by tel:", err);
          }
          
    }
    
  };

  const clearMember = async () => {
    setMemberData({});
    setMemberTel("");
    setExpenses([]);
    setPlaying([]);
    setTotalAmount();
    setBonusData({});
  }

  const handleChangeMember = (e) => {
    const phone = e.target.value.replace(/\D/g, ""); // ลบทุกตัวที่ไม่ใช่เลข
    setMemberTel(phone); // อัปเดต state
    if (phone.length <= 10) {
        
    
        if (phone.length === 10) {
          console.log("เบอร์โทรครบ 10 หลักแล้ว:", phone);
    
          // 🔁 เรียกฟังก์ชันอื่นต่อได้เลย เช่น ค้นหาสมาชิก
          //checkCardTelephone()
        }
      }
  };

  const handleClaim = async () => {

    if(memberTel && bonusData.estampBaht){
        const payload = {
            "branch": "CUB", // สาขา
            "cachier": "admin", // ชื่อคนทำรายการ
            "estamp_baht": parseFloat(bonusData.estampBaht), 
            "extra": parseFloat(bonusData.extraBaht),
            "final_point": parseFloat(bonusData.finalPoint),
            "joylicoin_return": parseFloat(bonusData.joylicoinCal),
            "member_ecoin": parseFloat(memberData.ecoin),
            "member_joylicoin": parseFloat(memberData.bonus),
            "member_point": parseFloat(memberData.total_point),
            "member_tel": memberTel,
            "persent": bonusSetting.ReturnPersent,
            "pos_id": "127", // pos_id
            "price_to_point": bonusSetting.PricePoint,
            "total_spend": totalAmount
          }
    
        
        try {
            const res = await fetch("/api/pos/claim", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
            if(res.ok){
                console.log('success case');
                checkCardTelephone()
                setBonusData({});
            }
            return;
          } catch (err) {
            console.error("Error loading card by tel:", err);
          } 
    }

     
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <div className="w-2/5 bg-[#E9E7F5] rounded-xl shadow-md max-w-md flex flex-col justify-between h-full">
          <div className="flex flex-col flex-grow p-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3 pt-2">
              Member Profile
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="tel"
                placeholder="ค้นหาหมายเลขสมาชิก"
                value={memberTel}
                inputMode="numeric"
                maxLength={10}
                onChange={handleChangeMember}
                className="flex-1 border border-purple-500 rounded-md px-3 py-2 placeholder-gray-400"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => checkCardTelephone()}
              >
                Search
              </button>
            </div>
            <div className="flex items-center gap-3 text-gray-800 mb-2 mt-2">
              <div className="bg-white p-3 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-semibold">{`${
                  memberData.tel ? memberData.tel : ""
                }`}</div>
                <div className="text-sm">
                  {`${memberData.m_name ? memberData.m_name : ""}-${
                    memberData.s_name ? memberData.s_name : ""
                  }`}{" "}
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm font-bold">Point</div>
                  <div className="text-2xl text-purple-600 font-extrabold">
                    {`${
                      memberData.total_point
                        ? memberData.total_point.toLocaleString()
                        : 0
                    }`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full">
                  <CircleDollarSign className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm font-bold">Joyli Coins</div>
                  <div className="text-2xl text-purple-600 font-extrabold">
                    {`${
                      memberData.bonus ? memberData.bonus.toLocaleString() : 0
                    }`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-purple-600 text-white font-bold w-full rounded-xl py-2 text-lg" 
            onClick={() => clearMember()}
          >
            Clear
          </button>
        </div>
        <div className="w-3/5 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-2/5 text-center">
              <h2 className="bg-[#F96C20] p-4 rounded-t-xl text-white">
                ยอดค่าใช้จ่าย
              </h2>
              <div className="bg-white rounded-b-xl py-8 h-[138px]">
                <h2 className="text-4xl text-purple-600">
                  {" "}
                  {totalAmount ? Number(totalAmount).toLocaleString() : "0"}
                </h2>
                <p className="text-gray-300">บาท</p>
              </div>
            </div>
            <div className="w-3/5">
              <div className="w-full text-center">
                <h2 className="bg-[#F96C20] p-4 rounded-t-xl text-white">
                  มูลค่าของสมนาคุณ
                </h2>
                <div className="flex">
                  <div className="bg-white rounded-bl-xl py-4 px-2 w-1/3 border border-r-gray-100">
                    <p className="h-13">ของสะสมที่ระลึก</p>
                    <h2 className="text-xl text-purple-600">{bonusData.estampBaht ? Number(bonusData.estampBaht).toLocaleString()  : 0}</h2>
                    <p className="text-gray-300">บาท</p>
                  </div>
                  <div className="bg-white py-4 px-2 w-1/3  border border-r-gray-100">
                    <p className="h-13">JoyliCoin</p>
                    <h2 className="text-xl text-purple-600">{bonusData.joylicoinCal ? Number(bonusData.joylicoinCal).toLocaleString()  : 0}</h2>
                    <p className="text-gray-300">Coins</p>
                  </div>
                  <div className="bg-white rounded-br-xl py-4 px-2 w-1/3">
                    <p className="h-13">โปรโมชั่นส่วนลดพิเศษ</p>
                    <h2 className="text-xl text-purple-600">{bonusData.extraBaht ? Number(bonusData.extraBaht).toLocaleString() : 0}</h2>
                    <p className="text-gray-300">บาท</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col gap-4">
            <div className="w-full text-center">
              <h2 className="bg-[#F96C20] p-4 rounded-t-xl text-white">
                มูลค่าของสมนาคุณ
              </h2>
            </div>
            <div className="w-full text-center flex">
              <div className="bg-white rounded-bl-xl py-4 px-2 w-1/2 border border-r-gray-100">
              <h2 className="text-2xl text-purple-600">
                ของสมนาคุณที่ระลึก{" "}
                {bonusData.estampBaht
                    ? (Number(bonusData.estampBaht) + Number(bonusData.extraBaht)).toLocaleString()
                    : 0}
                </h2>
                <p className="text-gray-300">บาท</p>
              </div>
              <div className="bg-white rounded-br-xl py-4 px-2 w-1/2">
                <h2 className="text-2xl text-purple-600">JoyliCoin {bonusData.joylicoinCal ? Number(bonusData.joylicoinCal).toLocaleString()  : 0}</h2>
                <p className="text-gray-300">บาท</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/2 flex-col">
          <h2 className="text-center bg-gray-200 py-2 rounded-t-xl">
            ยอดค่าใช้จ่าย
          </h2>
          <TablesClaim rows={expenses}></TablesClaim>
        </div>
        <div className="w-1/2">
          <h2 className="text-center bg-gray-200 py-2 rounded-t-xl">
            คะแนนสถิติการเล่น
          </h2>
          <TablesClaim rows={playing}></TablesClaim>
        </div>
      </div>
      <div className="flex justify-end">
      <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold w-1/3"
                onClick={() => handleClaim()}
              >
                Get
              </button>
      </div>
    </div>
  );
}
