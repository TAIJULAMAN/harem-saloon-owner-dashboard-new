import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ColorPickerProps {
  value: string; // The hex or tailwind class for the color
  onChange: (color: string) => void;
  error?: string;
}

export const CATEGORY_COLORS = [
  { name: "Purple", value: "#635BFF" },
  { name: "Green", value: "#22C55E" },
  { name: "Turquoise", value: "#06B6D4" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Red", value: "#EF4444" },
  { name: "Dark", value: "#1E293B" },
  { name: "Slate/Gray", value: "#64748B" },
  { name: "Light Slate", value: "#94A3B8" },
];

export default function ColorPicker({ value, onChange, error }: ColorPickerProps) {
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

  const selectedColorObj = CATEGORY_COLORS.find(c => c.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Color <span className="text-[#EF4444]">*</span></label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border ${error ? "border-[#EF4444]" : "border-[#E2E8F0]"
          } rounded-lg text-[14px] focus:outline-none focus:border-[#635BFF] transition-colors`}
      >
        <div className="flex items-center gap-3">
          {selectedColorObj ? (
            <>
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColorObj.value }} />
              <span className="text-[#1E293B]">{selectedColorObj.name}</span>
            </>
          ) : (
            <span className="text-[#94A3B8]">Select a color</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-[#94A3B8] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-2">
          {CATEGORY_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
              <span className={`text-[13px] ${value === color.value ? "font-bold text-[#1E293B]" : "text-[#64748B]"}`}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-[13px] text-[#EF4444]">{error}</p>}
    </div>
  );
}
