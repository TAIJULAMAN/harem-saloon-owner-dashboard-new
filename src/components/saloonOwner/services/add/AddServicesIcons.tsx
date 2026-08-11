import React from "react";
import Image from "next/image";

interface AddServicesIconsProps {
  availableIcons: string[];
  selectedIcon: number;
  setSelectedIcon: (index: number) => void;
}

export function AddServicesIcons({ availableIcons, selectedIcon, setSelectedIcon }: AddServicesIconsProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
      <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Icon</h2>

      <div className="flex flex-wrap gap-4">
        {availableIcons.map((iconPath, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIcon(idx)}
            className={`w-[60px] h-[60px] rounded-[14px] flex items-center justify-center transition-all duration-200 overflow-hidden ${
              selectedIcon === idx
                ? "ring-2 ring-offset-2 ring-[#635BFF] scale-105 shadow-md"
                : "opacity-80 hover:opacity-100 hover:scale-105"
            }`}
          >
            <Image 
              src={iconPath} 
              alt={`Icon ${idx}`} 
              width={60} 
              height={60} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
