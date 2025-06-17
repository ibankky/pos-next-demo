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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
  const [option, setOption] = useState("");

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

  return (
    <div className='max-w-xl mt-10 bg-white p-6 rounded-xl shadow space-y-6'>
      <h1 className='text-xl font-semibold text-center'>ตั้งค่าระบบ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Label htmlFor='name'>ชื่อ</Label>
          <Input id='name' {...register("name")} />
          {errors.name && (
            <p className='text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='email'>อีเมล</Label>
          <Input id='email' {...register("email")} />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <hr className="my-4 border-t border-gray-200" />
        <div>
          <Label>ธีม</Label>
          <Select
            onValueChange={(val) => setValue("theme", val)}
            defaultValue='light'
          >
            <SelectTrigger>
              <SelectValue placeholder='เลือกธีม' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>สว่าง</SelectItem>
              <SelectItem value='dark'>มืด</SelectItem>
            </SelectContent>
          </Select>
          {errors.theme && (
            <p className='text-sm text-red-500'>{errors.theme.message}</p>
          )}
        </div>
        <hr className="my-4 border-t border-gray-200" />
        <div>
        <Label>Radio </Label>
          <RadioGroup defaultValue='option-one' onValueChange={(val) => setValue("radioOption", val)}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='option-one' id='option-one' />
              <Label htmlFor='option-one' className="mt-2.5">Option One</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='option-two' id='option-two' />
              <Label htmlFor='option-two' className="mt-2.5">Option Two</Label>
            </div>
          </RadioGroup>
        </div>
        <hr className="my-4 border-t border-gray-200" />
        <div>
        <Label>Switch On/Off</Label>
        <Switch checked={watch("isActive")} onCheckedChange={(val) => setValue("isActive", val)} />
        </div>
        <hr className="my-4 border-t border-gray-200" />
        <div>
        <Label>Select With Search</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'
              >
                {option
                  ? frameworks.find((framework) => framework.value === option)
                      ?.label
                  : "Select framework..."}
                <ChevronsDownUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search framework...' />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setOption(currentValue === option ? "" : currentValue)
                          setValue("framework", currentValue === option ? "" : currentValue) // ✅ เพิ่มตรงนี้
                          setOpen(false)
                        }}
                      >
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <hr className="my-4 border-t border-gray-200" />
        <Label className="mb-2">Checkbox</Label>
        <div className="flex items-center space-x-1 mb-0">
          <Checkbox id="check1" checked={watch("check1")} onCheckedChange={(val) => setValue("check1", val)} />
          <Label htmlFor="check1" className="mt-2.5">check1</Label>
        </div>
        <div className="flex items-center space-x-1 mb-0">
        <Checkbox id="check2" checked={watch("check2")} onCheckedChange={(val) => setValue("check2", val)} />
          <Label htmlFor="check1" className="mt-2.5">check2</Label>
        </div>
        <hr className="my-4 border-t border-gray-200" />
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
