"use client";

import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";

export default function MemberSidebar() {
  return (
    <div className='flex flex-col h-[95%] w-64 p-4 bg-white justify-between mt-1'>
      {/* ส่วนบน */}
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <div className='bg-[#F96C20] text-white text-xl text-center rounded-t-xl justify-center items-center py-4'>
            member
          </div>
          <div className='border border-gray-300 text-3xl text-gray-800 text-center py-3'>
            000000
          </div>
          <div className='border border-gray-300 text-xl text-gray-800 text-center py-3'>
            ลูกค้าทั่วไป
          </div>
          <Button
            className='w-full bg-[#5834ED] text-white h-10 p-6'
            onClick={() => console.log("Logging out...")}
          >
            <div className='flex items-center justify-center  text-2xl'>
              ค้นหาสมากชิก
            </div>
          </Button>
        </div>
        <div>
          <Button
            className='w-full border border-[#F96C20] text-[#F96C20] bg-white h-10 p-6'
            onClick={() => console.log("Logging out...")}
          >
            <div className='flex items-center justify-center  text-2xl'>
              Clear
            </div>
          </Button>
        </div>
        <div>
          <div class='border rounded-md  shadow-md'>
            <div class='p-2 border-b'>
              <div class='text-sm font-semibold '>Card :</div>
              <div class='text-xl text-purple-600 font-bold text-center'>
                Card ID
              </div>
            </div>

            <div class='p-2 border-b'>
              <div class='text-sm font-semibold'>ecoin :</div>
              <div class='flex justify-center gap-4 mt-1 text-purple-600 font-bold text-xl'>
                <span>0</span>
                <span>0</span>
              </div>
            </div>
            <button class='w-full py-2  bg-violet-600 text-white font-bold rounded-md border-2 border-cyan-400 shadow'>
              Check
            </button>
          </div>
        </div>
        <div>
          <div class='rounded-md text-center'>
            <div class='p-2 border-2 border-purple-500 rounded-xl m-2'>
              <div class='text-sm font-semibold'>ราคา :</div>
              <div class='text-3xl font-extrabold text-purple-600'>0</div>
            </div>

            <div class='p-2 border'>
              <div class='text-sm font-semibold'>ecoin :</div>
              <div class='flex justify-center gap-6 mt-1 text-purple-600 font-bold text-xl'>
                <span>0</span>
                <span>0</span>
              </div>
            </div>

            <div class='p-2 border'>
              <div class='text-sm font-semibold'>Token :</div>
              <div class='text-purple-600 font-bold text-xl'>0</div>
            </div>

            <div class='p-2 border'>
              <div class='text-sm font-semibold'>Free Point :</div>
              <div class='text-purple-600 font-bold text-xl'>0</div>
            </div>
          </div>
        </div>
        <div>
          <Button
            className='w-full bg-red-600 text-white h-12'
            onClick={() => console.log("Logging out...")}
          >
            <div className='flex items-center justify-center gap-2 text-2xl'>
              <X className='w-20 h-20' />
              ปิด
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
