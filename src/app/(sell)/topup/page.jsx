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
    fetchMenuDataList();
  }, [selectedId]);

  const fetchMenuDataList = async () => {
    try {
      const res = await fetch(`/api/pos-menu/sale/list?location=ccb&groupMenuId=${selectedId}`);
      console.log(res.json)
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

  const rows = [
    {
      date: "05/12/2024 11:59",
      number: "JB-67-241200234",
      card: "DD241D69",
      member: "0000000000",
      price: 80,
      credit: 80,
    },
    {
      date: "05/12/2024 11:58",
      number: "JB-67-241200233",
      card: "9751B04E",
      member: "0807067977",
      price: 500,
      credit: 500,
    },
  ];

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
            
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Tables rows={rows} />
      </div>
    </div>
  );
}
