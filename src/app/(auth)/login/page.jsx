'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store'; 

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Spinner from '@/components/ui/spin';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  // ✅ ใช้ action จาก store
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  async function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      // ✅ เก็บ token / user ลงใน Zustand
      setToken(data.token);
      setUser(data.user);

      // ✅ เปลี่ยน route ไปหน้าอื่น
      router.push('/topup');
    } else {
      setError(data.message || 'Login failed');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className='text-gray-700'>Username</label>
            <input type="text" name="username" className="w-full border px-2 py-1 text-gray-700" required />
          </div>
          <div>
            <label htmlFor="password" className='text-gray-700'>Password</label>
            <input type="password" name="password" className="w-full border px-2 py-1 text-gray-700" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
         {/*  <Button variant="default" size="sm">
            <Spinner  /> New
          </Button> */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}
