"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string;
  buttonClassName?: string;
  align?: "left" | "right";
}

export function CustomSelect({ 
  value, 
  onChange, 
  options,
  className = "",
  buttonClassName = "",
  align = "right"
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-[12px] font-bold text-[#1E293B] border border-[#E2E8F0] pl-3 pr-3 py-1.5 rounded-lg outline-none bg-white hover:bg-slate-50 transition-colors cursor-pointer ${buttonClassName}`}
      >
        <span className="truncate flex-1 text-left">{value}</span>
        <ChevronDown className={`w-3 h-3 shrink-0 text-[#64748B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute ${align === "left" ? "left-0" : "right-0"} top-full mt-1 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden z-20 max-h-60 overflow-y-auto custom-scrollbar`}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F8FAFC] ${
                value === opt ? "text-[#635BFF] bg-[#EEF2FF]" : "text-[#1E293B]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
