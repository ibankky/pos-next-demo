'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store'; 
import { Button } from '@/components/ui/button';
import { User } from "lucide-react";
import { usePosStore } from "@/store";

export default function HeaderSellpage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout); 
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }); // ลบ cookie
    logout(); // ล้าง Zustand state
    router.push('/login'); // redirect
  };
  const member = usePosStore((state) => state.member);
  return (
    <header className="flex justify-between items-center border-b-white border">
      <div className="w-1/4 flex items-center bg-gray-100 p-4 h-full">
      {/* วงกลมไอคอน */}
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mr-4">
        <User className="w-6 h-6 text-black" />
      </div>

      {/* ข้อมูล */}
      <div className="text-sm text-black space-y-1">
        <div>สาขา : XXXX</div>
        <div>ผู้เข้าใช้ : XXXXXXXX</div>
        <div>POS : POS006</div>
      </div>
    </div>
      <div className="w-3/4 p-4">
        <div className="flex">
            <div className="w-4/5">
                <div className="flex flex-col gap-2">
                    <div className="text-3xl">{member.phone ? member.phone : '0914182425'  }</div>
                    <div className="text-3xl">ทำรายการยกเลิกบิล</div>
                </div>
            </div>
            <div className="w-1/5"></div>
        </div>
      </div>
      
      
    </header>
  );
}