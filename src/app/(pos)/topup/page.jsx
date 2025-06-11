"use client";

import { useEffect, useState } from "react";
import NumericKeypad from "@/components/NumericKeypad";

export default function TopUpPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const handleConfirm = (val) => {
    console.log("Confirmed amount:", val);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>Enter Cash Received</h1>
      <div className='flex items-center justify-center'>
        <div className='w-1/4'>
          <NumericKeypad onConfirm={handleConfirm} />
        </div>
        <div className='w-3/4'></div>
      </div>
    </div>
  );
}
