"use client";

import NumericKeypad from "@/components/NumericKeypad";

export default function TopUpPage() {
  const handleConfirm = (val) => {
    console.log("Confirmed amount:", val);
  };
  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>Enter Cash Received</h1>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-1/4'>
          <NumericKeypad onConfirm={handleConfirm} />
        </div>
        <div className='w-3/4'></div>
      </div>
    </div>
  );
}
