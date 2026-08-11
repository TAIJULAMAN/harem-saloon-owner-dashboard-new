"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[] | string[];
  disabled?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );

  const selectedOption =
    formattedOptions.find((opt) => opt.value === value) || formattedOptions[0];

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white outline-none flex items-center justify-between text-[13px] font-semibold text-[#1E293B] cursor-pointer hover:border-[#635BFF] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? "border-[#635BFF] ring-2 ring-[#635BFF]/10" : ""
        }`}
      >
        <span className="truncate">{selectedOption?.label || ""}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#635BFF]" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.06)] py-1 z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-100">
          {formattedOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-[13px] font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                opt.value === value
                  ? "bg-[#EEF2FF] text-[#635BFF]"
                  : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && (
                <Check className="w-4 h-4 text-[#635BFF]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
