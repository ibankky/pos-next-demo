"use client";

import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";

// 👉 import แบบ dynamic และปิด SSR ไปเลย
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

export default function SelectWithController({
  name,
  control,
  options = [],
  getOptionLabel = (opt) => opt.label,
  getOptionValue = (opt) => opt.value,
  placeholder = "Select...",
  isMulti = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectOptions = options.map((opt) => ({
          label: getOptionLabel(opt),
          value: getOptionValue(opt),
        }));

        const selectedValue = isMulti
          ? selectOptions.filter((opt) => field.value?.includes(opt.value))
          : selectOptions.find((opt) => opt.value === field.value);

        const handleChange = (val) => {
          const selected = isMulti
            ? val?.map((v) => v.value)
            : val?.value;
          field.onChange(selected);
        };

        return (
          <Select
            options={selectOptions}
            value={selectedValue}
            onChange={handleChange}
            isMulti={isMulti}
            placeholder={placeholder}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
          />
        );
      }}
    />
  );
}
