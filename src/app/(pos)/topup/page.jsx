"use client";

import { useEffect, useState } from "react";
import NumericKeypad from "@/components/NumericKeypad";
import Tables from "@/components/Tables";

export default function TopUpPage() {
  const [loading, setLoading] = useState(true);

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
  ]

  /* if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  } */

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>Enter Cash Received</h1>
      <div className='flex items-start justify-center gap-x-6'>
        <div className='w-1/4'>
          <NumericKeypad onConfirm={handleConfirm} />
        </div>
        <div className='w-3/4'>
          <Tables rows={rows}/>
        </div>
      </div>
    </div>
  );
}
