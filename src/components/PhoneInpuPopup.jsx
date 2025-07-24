'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle , DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

export default function PhoneInputModal({ open, onClose, onSubmit}) {
  const [phone, setPhone] = useState("");

  const handleKeyPress = (num) => {
    if (phone.length >= 10) return;
    setPhone((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhone((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  };

  const handleSubmit = () => {
    if (phone.length === 10) {
      onSubmit(phone);
      setPhone("")        // ส่งค่าออก
      onClose();              // ปิด modal
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      <DialogContent className="bg-gray-100 p-10 max-w-sm w-full rounded-xl">
        <div className="text-center text-3xl font-semibold border-2 border-purple-500 rounded-xl py-2 text-purple-600 mb-4 min-h-[50px]"
       >
          {phone}
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {[..."123456789"].map((num) => (
            <Button
              key={num}
              variant="ghost"
              className="text-2xl py-6 bg-gray-200"
              onClick={() => handleKeyPress(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="py-6 bg-red-300"
            onClick={handleDelete}
          >
            <Delete />
          </Button>
          <Button
            variant="ghost"
            className="text-2xl py-6 bg-gray-200"
            onClick={() => handleKeyPress("0")}
          >
            0
          </Button>
          <div className="col-span-1" />
          <Button
            className="col-span-3 row-span-4 bg-purple-600 text-white text-md py-6"
            onClick={() => {
              console.log("เบอร์โทร:", phone);
              handleSubmit();
              // ใส่ logic เช่น set เบอร์เข้า state หรือปิด modal
            }}
          >
            ค้นหา
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}