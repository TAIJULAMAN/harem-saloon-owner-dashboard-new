import React from "react";

interface TextareaGroupProps {
  label: string;
  placeholder: string;
}

export function TextareaGroup({ label, placeholder }: TextareaGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-bold text-[#1E293B]">{label}</label>
      <textarea
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors placeholder:text-[#94A3B8] min-h-[100px] resize-y"
      />
    </div>
  );
}
