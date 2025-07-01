"use client";

import { useState } from "react";
import { Delete, Plus, Minus, Dot, PlusCircle } from "lucide-react";
import clsx from "clsx";

export default function NumericKeypad({ onConfirm }) {
  const [value, setValue] = useState("1000"); // ตั้งค่า default ตามภาพ

  const handlePress = (key) => {
    if (key === "←") return setValue((prev) => prev.slice(0, -1));
    if (key === ".") {
      if (value.includes(".")) return;
      return setValue((prev) => prev + ".");
    }
    if (key === "C") return setValue("");
    setValue((prev) => prev + key);
  };

  return (
    <div className="inline-block bg-gray-100 p-4 rounded-lg space-y-4 w-full">
      {/* Display */}
      <div className="text-3xl font-bold text-purple-600 text-center border-2 border-purple-500 rounded-lg py-2 px-4">
      {value ? Number(value).toLocaleString() : '0'}
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-2">
        {[
          "1",
          "2",
          "3",
          "←",
          "4",
          "5",
          "6",
          "+",
          "7",
          "8",
          "9",
          "-",
          "0",
          "Add",
        ].map((key) => (
          <button
              key={key}
              onClick={() => {
                if (key === "Add") return onConfirm(value);
                handlePress(key);
              }}
              className={clsx(
                "py-4 rounded-lg font-bold text-xl flex items-center justify-center",
                {
                  "bg-violet-600 text-white col-span-2": key === "Add",
                  "bg-white text-black col-span-2": key === "0",
                  "bg-white text-black": key !== "Add" && key !== "0",
                }
              )}
            >
            {/* 🔁 แสดง icon แทนตัวอักษร */}
            {{
              "←": <Delete size={24} />,
              "+": <Plus size={24} />,
              "-": <Minus size={24} />,
            }[key] || key}
          </button>
        ))}
      </div>
    </div>
  );
}
