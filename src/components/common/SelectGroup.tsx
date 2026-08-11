"use client";

import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";

interface SelectGroupProps {
  label: string;
  placeholder: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectGroup({ label, placeholder, options = ["Option 1", "Option 2", "Option 3"], value, onChange }: SelectGroupProps) {
  const [internalValue, setInternalValue] = useState("");
  
  const displayValue = value !== undefined ? value : internalValue;
  
  const handleChange = (val: string) => {
    if (onChange) onChange(val);
    setInternalValue(val);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-bold text-[#1E293B]">{label}</label>
      <CustomSelect
        value={displayValue || placeholder}
        options={options}
        onChange={handleChange}
        className="w-full"
        buttonClassName={`w-full justify-between px-4 py-2.5 text-[13px] font-semibold ${displayValue ? 'text-[#1E293B]' : 'text-[#94A3B8]'}`}
        align="left"
      />
    </div>
  );
}
