import React from "react";
import * as LucideIcons from "lucide-react";
import { MacroCategoryFormData } from "./modals/AddMacroCategoryModal";

interface MacroCategorySidebarProps {
  macroCategories: MacroCategoryFormData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function MacroCategorySidebar({ macroCategories, selectedId, onSelect }: MacroCategorySidebarProps) {
  return (
    <div className="w-full md:w-64 bg-white shrink-0 flex flex-col h-full overflow-y-auto pr-2 sm:pr-6 md:border-r md:border-[#E2E8F0] p-5">
      <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Macro-categories</h3>

      <div className="space-y-1">
        {macroCategories.map((mc) => {
          const IconComponent = (LucideIcons as any)[mc.icon] || LucideIcons.Tag;
          const isSelected = selectedId === mc.id;

          return (
            <button
              key={mc.id}
              onClick={() => onSelect(mc.id!)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${isSelected ? "bg-[#F8FAFC]" : "hover:bg-[#F8FAFC]"
                }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: mc.color }}
              >
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <span className={`text-[13px] ${isSelected ? "font-bold text-[#1E293B]" : "font-semibold text-[#1E293B]"}`}>
                {mc.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
