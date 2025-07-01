'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function NumericPopup() {
  const [open, setOpen] = useState(false)
  const [activeField, setActiveField] = useState<'price' | 'receive' | 'withdraw'>('price')
  const [values, setValues] = useState({ price: "0", receive: "0", withdraw: "0" })

  const handleKeyPress = (key) => {
    setValues(prev => {
      const current = prev[activeField] || ""
      if (key === "C") return { ...prev, [activeField]: "0" }
      if (key === "←") return { ...prev, [activeField]: current.slice(0, -1) || "0" }
      if (key === "." && current.includes(".")) return prev
      const newValue = current === "0" ? key : current + key
      return { ...prev, [activeField]: newValue }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>เปิดป้อนตัวเลข</Button>
      </DialogTrigger>
      <DialogContent className="w-[360px]">
        {/* Tab Selector */}
        <div className="flex justify-between mb-4">
          {["ราคา", "รับเงิน", "เงินถอน"].map((label, i) => {
            const key = i === 0 ? 'price' : i === 1 ? 'receive' : 'withdraw'
            return (
              <div
                key={key}
                onClick={() => setActiveField(key)}
                className={`flex-1 text-center py-2 rounded cursor-pointer font-bold
                  ${activeField === key ? 'border-2 border-purple-500 text-purple-600 bg-purple-100' : 'bg-gray-200'}
                `}
              >
                {label} <div className="text-2xl">{values[key]}</div>
              </div>
            )
          })}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {["1","2","3","←","4","5","6","+","7","8","9","-","0",".","C"].map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="bg-white py-4 rounded text-xl font-bold"
            >
              {key}
            </button>
          ))}
        </div>

        <Button
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          onClick={() => {
            console.log("ยืนยันค่าทั้งหมด", values)
            setOpen(false)
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}