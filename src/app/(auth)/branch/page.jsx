'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store'; 

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Spinner from '@/components/ui/spin';
import dynamic from 'next/dynamic'
import selectStyles from '@/styles/selectStyle';

const Select = dynamic(() => import('react-select'), { ssr: false })

const options = [
  { value: '1', label: 'สาขา 001' },
  { value: '2', label: 'สาขา 002' },
  { value: '3', label: 'สาขา 003' },
  { value: '4', label: 'สาขา 004' },
  { value: '5', label: 'สาขา 005' },
]

export default function LoginPage() {
  const [error, setError] = useState('');
  const [category, setCategory] = useState('')
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (category) {
      console.log('go to next page');
      router.push('/topup');
    } else {
      setError(data.message || 'Please Select Branch');
    }
  }

  const handleChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
    setCategory(selectedOption?.value)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4 w-2/5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">เลือกสาขา</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="branch" className='flex py-1 text-gray-700 items-center gap-1'>
              <User className='w-4 h-4'/>สาขา
            </label>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลือกสาขา
              </label>
              <Select
                options={options}
                onChange={handleChange}
                placeholder="เลือกสาขา..."
                styles={selectStyles}
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Log In
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}
