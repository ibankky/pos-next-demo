"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ChevronsDownUp, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const items = [
  { label: "Playport", value: "playport" },
  { label: "Service", value: "service" },
  { label: "Card", value: "card" },
  { label: "Token", value: "token" },
  { label: "Sell", value: "sell" },
  { label: "Gift Voucher", value: "gift-voucher" },
];

const formSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  theme: z.enum(["light", "dark"], {
    required_error: "กรุณาเลือกธีม",
  }),
  radioOption: z.enum(["option-one", "option-two"], {
    required_error: "กรุณาเลือกตัวเลือก",
  }),
  isActive: z.boolean().optional(),
  framework: z.string().min(1, "กรุณาเลือก framework"),  // หรือใช้ z.enum([...]) ถ้าจำกัดตัวเลือก
  check1: z.boolean().optional(),
  check2: z.boolean().optional(),
});

export default function SettingsPage() {
  const [submittedData, setSubmittedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [option, setOption] = useState("");
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      theme: "light",
      radioOption: "option-one",
      isActive: false,
      framework: "",
      check1: false,
      check2: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setSubmittedData(data);
  };

  const toggleSelect = (value) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const selectedLabels = items
    .filter((item) => selected.includes(item.value))
    .map((item) => item.label)
    .join(", ");

  return (
    <div className='max-w-xl mt-10 bg-white p-6 rounded-xl shadow space-y-6'>
      <h1 className='text-xl font-semibold text-center'>ตั้งค่าระบบ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        
        <div>
        <Select options={items} />
        </div>
        <Button type='submit' className='w-full'>
          บันทึกการตั้งค่า
        </Button>
      </form>

      {submittedData && (
        <pre className='text-xs bg-gray-100 p-2 rounded mt-4'>
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      )}
    </div>
  );
}
