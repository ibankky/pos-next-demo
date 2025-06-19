import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";

export default function DateTimeInput({ value, onChange, label = "วันหมดอายุ" }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <DatePicker
        id={label}
        selected={value}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText="dd/mm/yyyy hh:mm"
        className="w-full border rounded p-2"
      />
    </div>
  );
}