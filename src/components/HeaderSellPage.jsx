'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store'; 
import { Button } from '@/components/ui/button';

export default function HeaderSellpage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout); 
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }); // ลบ cookie
    logout(); // ล้าง Zustand state
    router.push('/login'); // redirect
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="w-3/4">
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">👤 {user}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="text-sm text-gray-500 italic">Not logged in</div>
      )}
      </div>
      <div className="w-1/4 flex items-center justify-end">
        <Button className="bg-red-500 text-white" onClick={() => router.push('/void')}> Void</Button>
      </div>
      
    </header>
  );
}