"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

import { User , Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spin";
import dynamic from "next/dynamic";
import selectStyles from "@/styles/selectStyle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { value: "1", label: "สาขา 001" },
  { value: "2", label: "สาขา 002" },
  { value: "3", label: "สาขา 003" },
  { value: "4", label: "สาขา 004" },
  { value: "5", label: "สาขา 005" },
];

export default function LoginPage() {
  const [error, setError] = useState("");
  const [branch, setBranch] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('branch');
    console.log(branch);
    if (branch) {
      console.log("go to next page");
      router.push("/main");
    } else {
      setError(data.message || "Please Select Branch");
    }
  }

  const handleChange = (selectedOption) => {
    console.log("Selected:", selectedOption);
    setBranch(selectedOption);
  };

  const handleClickBack = () => {
    console.log("click back");
    router.push("/login");
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-900 px-4 w-2/5'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6'>
        <h1 className='text-2xl font-bold text-center text-gray-800'>
          เลือกสาขา
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='branch'
              className='flex py-1 text-gray-700 items-center gap-1'
            >
              <Store className='w-4 h-4' />
              เลือกสาขา
            </label>
            <div className='w-full'>
              <Select value={branch} onValueChange={handleChange}>
                <SelectTrigger className='w-full rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800'>
                  <SelectValue placeholder='เลือกสาขา' />
                </SelectTrigger>
                <SelectContent className='bg-white rounded-md shadow-lg'>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className='cursor-pointer px-4 py-2 hover:bg-blue-100 data-[state=checked]:bg-blue-200'
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex gap-x-6'>
            <div className='w-1/2'>
              <button
                type='button'
                className='w-full border  border-gray-500 text-gray-700 rounded py-2'
                onClick={() => handleClickBack()}
              >
                ย้อนกลับ
              </button>
            </div>
            <div className='w-1/2'>
              <button
                type='submit'
                className='w-full  bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
              >
                เลือกสาขา
              </button>
            </div>
          </div>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        </form>
      </div>
    </main>
  );
}
