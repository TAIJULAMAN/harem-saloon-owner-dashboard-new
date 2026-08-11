import React from "react";
import { Check } from "lucide-react";

interface CustomCheckboxProps {
  label?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <div
        className={`w-4 h-4 rounded transition-colors flex items-center justify-center shrink-0 ${
          checked
            ? "bg-[#635BFF]"
            : "border border-[#CBD5E1] bg-white group-hover:border-[#635BFF]"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      {label && <span className="text-[13px] font-medium text-[#475569]">{label}</span>}
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};
