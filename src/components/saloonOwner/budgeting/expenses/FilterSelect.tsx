import React from "react";
import { ChevronDown, Calendar } from "lucide-react";

export interface FilterSelectProps {
  label: string;
  placeholder: string;
  hasCalendar?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function FilterSelect({ label, placeholder, hasCalendar = false, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-[11px] font-bold text-[#94A3B8] mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-lg py-2 pl-4 pr-10 text-[13px] font-semibold text-[#1E293B] outline-none cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <option value="">{placeholder}</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        {hasCalendar ? (
          <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
        ) : (
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
        )}
      </div>
    </div>
  );
}
