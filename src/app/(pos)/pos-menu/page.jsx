"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { ChevronsDownUp, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from 'sonner';
import SelectWithController from "@/components/SelectWithController";
import DateTimeInput from "@/components/DateTimeInput";
import { toast } from "sonner";

const formSchema = z.object({
  code: z.string().min(1, "กรุณากรอก code"),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  group_menu_id: z.string().min(1, "กรุณาเลือก Menu Group"),
  card_type_id: z.string().min(1, "กรุณาเลือก Card Type"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .gt(1, { message: "Price must be greater than 1" }),
  branch_group_id: z
    .string()
    .min(1, "กรุณาเลือก Branch Group")
    .transform((val) => Number(val)), // ถ้าต้องการแปลงเป็น number ภายหลัง
  branch_list: z.array(z.string()).nonempty("กรุณาเลือกสาขา"),
  limit_time: z
    .number({ invalid_type_error: "กรุณาใส่ตัวเลข" })
    .min(0, "ต้องมากกว่าหรือเท่ากับ 0") // 👈 0 ผ่านได้
    .optional(), // 👈 ไม่กรอกก็ไม่เป็นไร
  e_coin: z
    .string()
    .min(1, "กรุณากรอก eCoin")
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "eCoin ต้องมากกว่า 0",
    }),
  e_bonus: z
    .string()
    .min(1, "กรุณากรอก eBonus")
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "eBonus ต้องมากกว่า 0",
    }),
  start_date: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  end_date: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  card_expire_date: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

    is_active: z.boolean().default(true),  
});

export default function PosMenu() {
  const [submittedData, setSubmittedData] = useState(null);
  const [openBranchGroups, setOpenBranchGroups] = useState(false);
  const [openBranches, setOpenBranches] = useState(false);
  const [openGroupsMenus, setOpenGroupMenus] = useState(false);
  const [openCardTypes, setOpenCardTypes] = useState(false);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchGroups, setBranchGroups] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);
  const [groupMenus, setGroupMenus] = useState([]);
  const [selectedGroupMenu, setSelectedGroupMenu] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");
  const [selectedBranchGroup, setSelectedBranchGroups] = useState("");
  const [expireType, setExpireType] = useState("days");
  const [expireDate, setExpireDate] = useState(null);
  const [dayCount, setDayCount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await fetch("/api/branch");
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setBranches(json.data || []); // สมมุติ data เป็น array
      } catch (err) {
        console.error("Error loading branches:", err);
      }
    };
    const fetchBranchGroups = async () => {
      try {
        const res = await fetch("/api/branch-group");
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setBranchGroups(json.data || []);
      } catch (err) {
        console.error("Error loading GroupBranches:", err);
      }
    };

    const fetchCardType = async () => {
      try {
        const res = await fetch("/api/card-type");
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setCardTypes(json.data || []);
      } catch (err) {
        console.error("Error loading GroupBranches:", err);
      }
    };

    const fetchGroupMenu = async () => {
      try {
        const res = await fetch("/api/group-menu");
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setGroupMenus(json.data || []);
      } catch (err) {
        console.error("Error loading GroupBranches:", err);
      }
    };

    fetchBranches();
    fetchBranchGroups();
    fetchCardType();
    fetchGroupMenu();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      description: "",
      group_menu_id: "",
      card_type_id: "",
      price: 0,
      branch_group_id: "",
      branch_list: [],
      limit_time: 0,
      e_coin: 0,
      e_bonus: 0,
      start_date: null,
      end_date: null,
      card_expire_date: null,
      is_active : true,
    },
    shouldUnregister: false,
  });

  const radioOption = useWatch({
    control,
    name: "radioOption",
    defaultValue: "days",
  });

  const  onSubmit = async (data) => {
    let expireDateString = null
    let startDateString = startDate ? startDate.toISOString() : null;
    let endDateString = endDate ? endDate.toISOString() : null;
    if (radioOption === "fixed-day") {
        if(expireDate){
            expireDateString = expireDate.toISOString();
        }else{
            expireDateString = null
        }
     
    }else if (radioOption === "day"){
        if(dayCount){
            const now = new Date();
            now.setDate(now.getDate() + Number(dayCount));
            expireDateString = now.toISOString();
        }else{
            expireDateString = null
        }
      
    }
    const formData = {
      ...data,
      card_expire_date: expireDateString,
      start_date: startDateString,
      end_date: endDateString,
      bonus_expire_date: null,
      machine_group_id: null,
    };
    setSubmittedData(formData);
    try {
        const res = await fetch("/api/pos-menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // ใส่ข้อมูลที่ต้องการส่ง
        });
      
        if (!res.ok) throw new Error("Failed to save pos menu");
      
        const result = await res.json();
      
        toast("บันทึกสำเร็จ", {
            className: "bg-green-100 text-green-900 border border-green-400",
            description: "ระบบได้บันทึกเรียบร้อยแล้ว",
            iconTheme: {
              primary: "#22c55e", // สีเขียว
              secondary: "#bbf7d0",
            },
          });
      } catch (err) {
        toast.error("เกิดข้อผิดพลาด");
      }
  };

  return (
    <div className='max-w-xl mt-10 bg-white p-6 rounded-xl shadow space-y-6'>
      <h1 className='text-xl font-semibold text-center'>Pos menu</h1>
      <form
        onSubmit={handleSubmit(onSubmit, (err) => {
          console.log("❌ Validation Error:", err);
        })}
        className='space-y-4'
      >
        <div>
          <Label htmlFor='code'>Menu Code</Label>
          <Input id='code' {...register("code")} placeholder='code' />
          {errors.code && (
            <p className='text-sm text-red-500'>{errors.code.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='description'>Menu Description</Label>
          <Input
            id='description'
            {...register("description")}
            placeholder='description'
          />
          {errors.description && (
            <p className='text-sm text-red-500'>{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label>Menu Group</Label>
          <SelectWithController
            name='group_menu_id'
            control={control}
            options={groupMenus}
            getOptionLabel={(g) => g.name}
            getOptionValue={(g) => g.id}
          />
          {errors.group_menu_id && (
            <p className='text-sm text-red-500'>
              {errors.group_menu_id.message}
            </p>
          )}
        </div>

        <div>
          <Label>Card Type</Label>
          <SelectWithController
            name='card_type_id'
            control={control}
            options={cardTypes}
            getOptionLabel={(g) => g.name}
            getOptionValue={(g) => g.id}
          />
          {errors.card_type_id && (
            <p className='text-sm text-red-500'>
              {errors.card_type_id.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='price'>Price</Label>
          <Input
            id='price'
            type='number'
            step='any'
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className='text-sm text-red-500'>{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='eCoin'>eCoin</Label>
          <Input
            id='eCoin'
            type='number'
            step='any'
            {...register("e_coin")}
            placeholder='eCoin'
          />
          {errors.e_coin && (
            <p className='text-sm text-red-500'>{errors.e_coin.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='eBonus'>eBonus</Label>
          <Input
            id='eBonus'
            type='number'
            step='any'
            {...register("e_bonus")}
            placeholder='eBonus'
          />
          {errors.e_bonus && (
            <p className='text-sm text-red-500'>{errors.e_bonus.message}</p>
          )}
        </div>

        <div className='flex gap-4'>
          <div className='w-1/2'>
            <Label htmlFor='eBonusExpire'>eBonus Expire</Label>
            <RadioGroup
              defaultValue='days'
              onValueChange={(val) => setValue("radioOption", val)}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='days' id='days' />
                <Label htmlFor='days' className='mt-2.5'>
                  จำนวนวัน
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='fixed-day' id='fixed-day' />
                <Label htmlFor='fixed-day' className='mt-2.5'>
                  ระบุวัน
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className='w-1/2'>
            {radioOption === "days" && (
              <div>
                <Label htmlFor='dayCount'>จำนวนวัน</Label>
                <Input
                  id='dayCount'
                  type='number'
                  value={dayCount}
                  onChange={(e) => setDayCount(e.target.value)}
                />
              </div>
            )}

            {radioOption === "fixed-day" && (
              <div>
                <DateTimeInput
                  value={expireDate}
                  onChange={setExpireDate}
                  label='เลือกวันเวลาหมดอายุ'
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='playTime'>Play Times</Label>
          <Input
            id='playTime'
            type='number'
            step='any'
            {...register("limit_time", { valueAsNumber: true })}
            placeholder='จำนวนครั้ง'
          />
          {errors.limit_time && (
            <p className='text-sm text-red-500'>{errors.limit_time.message}</p>
          )}
        </div>

        <div>
          <Label>BranchGroup</Label>
          <SelectWithController
            name='branch_group_id'
            control={control}
            options={branchGroups}
            getOptionLabel={(b) => b.group_name}
            getOptionValue={(b) => b.id.toString()}
          />
          {errors.branch_group_id && (
            <p className='text-sm text-red-500'>
              {errors.branch_group_id.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='eBonusExpire'>สาขาที่เล่นได้</Label>
          <SelectWithController
            name='branch_list'
            control={control}
            options={branches}
            getOptionLabel={(b) => b.branch_name}
            getOptionValue={(b) => b.branch_code}
            isMulti
          />
          {errors.branch_list && (
            <p className='text-sm text-red-500'>{errors.branch_list.message}</p>
          )}
        </div>
        <div>
          <DateTimeInput
            value={startDate}
            onChange={setStartDate}
            label='Start Date'
          />
        </div>
        <div>
          <DateTimeInput
            value={endDate}
            onChange={setEndDate}
            label='End Date'
          />
        </div>
        <div>
        <Controller
            name="is_active"
            control={control}
            defaultValue={true}
            render={({ field }) => (
                <div>
                <Label>Active</Label>
                <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
                </div>
            )}
            />
        </div>

        <hr className='my-4 border-t border-gray-200' />
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
