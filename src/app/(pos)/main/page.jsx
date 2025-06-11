"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function TopUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
      <div className='flex items-center justify-center space-x-10'>
        <div className='bg-gray-100 w-96 h-auto flex flex-col items-center justify-center py-10 rounded-2xl'  onClick={() => router.push('/topup')}>
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={100}
            height={100}
            className='rounded'
          />
          <div className='text-3xl text-gray-700 mt-6'>POS</div>
        </div>
        <div className='bg-gray-100 w-96 h-auto flex flex-col items-center justify-center py-10 rounded-2xl'>
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={100}
            height={100}
            className='rounded'
          />
          <div className='text-3xl text-gray-700 mt-6'>Customer</div>
        </div>
        <div className='bg-gray-100 w-96 h-auto flex flex-col items-center justify-center py-10 rounded-2xl'>
          <Image
            src='/icon/pos.svg'
            alt='POS Icon'
            width={100}
            height={100}
            className='rounded'
          />
          <div className='text-3xl text-gray-700 mt-6'>JReader</div>
        </div>
      </div>
    </div>
  );
}
