import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { Delete, Plus, Minus } from "lucide-react";
import { usePosStore } from "@/store";
import Swal from "sweetalert2";

export default function PaymentPopup({ open, onClose, onConfirm }) {
  const totalAmount = usePosStore((state) => state.totalAmount);
  const [price, setPrice] = useState("0");
  const [receive, setReceive] = useState("0");
  const [change, setChange] = useState("0");
  const [isError , setIsError] = useState(false)

  useEffect(() => {
    const received = parseFloat(receive) || 0;
    const total = parseFloat(totalAmount) || 0;
    const diff = received - total;

    setChange(diff.toFixed(2));
  }, [receive, totalAmount]);

  const handlePress = (key) => {
    if (key === "←") return setReceive((prev) => prev.slice(0, -1));
    if (key === "C") return setReceive("");
    const numericKeys = {
      "1,000": 1000,
      500: 500,
      100: 100,
      10: 10,
    };

    if (key in numericKeys) {
      return setReceive((prev) => {
        const prevNumber = parseFloat(prev) || 0;
        return String(prevNumber + numericKeys[key]);
      });
    }
    setReceive((prev) => prev + key);
  };

  const spanTwoCols = ["1,000", "500", "100", "10"];

  const buttons = [
    ["1", "2", "3", "1,000", "←"],
    ["4", "5", "6", "500", "C"],
    ["7", "8", "9", "100", "+"],
    ["0", "10", "-"],
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-md w-full rounded-xl shadow-xl z-[50]">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>ชำระเงิน</DialogTitle>
        </DialogHeader>

        {/* ตัวเลข: ราคา / รับเงิน / เงินทอน */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-violet-100 rounded-xl p-2 text-center">
            <div className="text-sm">ราคา</div>
            <div className="text-3xl font-bold text-violet-600">
              {totalAmount ? Number(totalAmount).toLocaleString() : "0"}
            </div>
          </div>
          <div className="bg-violet-100 rounded-xl p-2 text-center">
            <div className="text-sm">รับเงิน</div>
            <div className="text-3xl font-bold text-violet-600">
              {receive ? Number(receive).toLocaleString() : "0"}
            </div>
          </div>
          <div className="bg-violet-100 rounded-xl p-2 text-center">
            <div className="text-sm">เงินทอน</div>
            <div
              className={clsx(
                "text-3xl font-bold text-center",
                parseFloat(change) < 0 ? "text-red-500" : "text-violet-600"
              )}
            >
              {Number(change).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-6 gap-2 p-4 bg-gray-100 rounded-xl">
          {buttons.flat().map((label, index) =>
            label ? (
              <button
                key={index}
                onClick={() => handlePress(label)}
                className={clsx(
                  "text-2xl font-bold py-4 bg-white rounded-lg shadow text-black hover:bg-purple-100 active:scale-95 transition flex items-center justify-center",
                  label === "0"
                    ? "col-span-3"
                    : spanTwoCols.includes(label)
                    ? "col-span-2"
                    : ""
                )}
              >
                {{
                  "←": <Delete size={24} />,
                  "+": <Plus size={24} />,
                  "-": <Minus size={24} />,
                }[label] || label}
              </button>
            ) : (
              <div key={index} />
            )
          )}
        </div>
        {/* OK Button */}
        {isError && (<>
          <div className="text-xl text-red-500"> กรุณารับเงินให้ครบก่อนกดยืนยัน</div>
        </>)}
        <Button
          className="w-full bg-violet-600 text-white text-xl font-bold rounded-xl h-16"
          onClick={() => {
            const received = parseFloat(receive) || 0;
            const total = parseFloat(totalAmount) || 0;
        
            if (received < total) {
              setIsError(true)
              return;
            }
        
            onConfirm(); // ส่งค่าไปใช้ต่อ เช่น บันทึกยอด หรือส่ง API
            setReceive("0");     // reset ถ้าต้องการ
            setChange("0");      // reset ถ้าต้องการ
            onClose();           // ปิด popup
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
