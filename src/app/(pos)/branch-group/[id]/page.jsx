"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import SelectWithController from "@/components/SelectWithController";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import "@/styles/loading.css";

export default function BranchGroupDetailPage() {
  const [isLoading, setLoading] = useState(false);
  const [branchGroup, setBranchGroup] = useState({});
  const [branchList, setBranchList] = useState([]);
  const params = useParams();
  const id = params?.id;

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      group_name: "",
      is_active: false,
      sub_location_codes: [],
    },
  });

  useEffect(() => {
    const fetchBranchGroupsById = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/branch-group/${id}`);
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setBranchGroup(json.data || []);
        reset({
          group_name: json.data.group_name || "",
          is_active: json.data.is_active || false,
          sub_location_codes: json.data.sub_location_codes || [],
        });
        setLoading(false)  
      } catch (err) {
        setLoading(false)  
        console.error("Error loading GroupBranches:", err);
      }
    };

    const fetchBranch = async () => {
      try {
        const res = await fetch(`/api/branch`);
        if (!res.ok) throw new Error("Failed to fetch branches");
        const json = await res.json();
        setBranchList(json.data || []);
      } catch (err) {
        console.error("Error loading Branches:", err);
      }
    };

    fetchBranchGroupsById();
    fetchBranch();
  }, [id, reset]);

  const onSubmit = (formData) => {
    console.log("Save:", formData);
    // TODO: POST/PUT to API
  };

  const locationOptions = (branchList || []).map((branch) => ({
    label: branch.branch_name,
    value: branch.branch_code,
  }));

  return (
    <>
      
      <div>Branch Group ID: {id}</div>
      {isLoading && (
          <div className='fixed inset-0 flex items-center justify-center bg-white/70 z-10'>
            <div className='loader' />
          </div>
        )}
      <div className='flex w-1/2 gap-4 mt-10 bg-white p-6 rounded-xl shadow '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 w-full'
        >
          <div>
            <label className='block text-sm font-medium'>Group Name</label>
            <input
              type='text'
              {...register("group_name")}
              className='w-full border rounded px-3 py-2'
            />
          </div>

          <SelectWithController
            name='sub_location_codes'
            control={control}
            options={locationOptions}
            isMulti
          />

<div>
            <Controller
              name='is_active'
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <div>
                  <Label>Active</Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={field.value ? "bg-green-500" : "bg-gray-300"}
                  />
                </div>
              )}
            />
          </div>

          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
