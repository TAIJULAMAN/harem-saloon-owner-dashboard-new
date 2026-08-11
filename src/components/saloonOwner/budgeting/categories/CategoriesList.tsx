import React, { useState, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { MoreVertical, Edit2, PlusSquare, Trash2, CornerDownRight } from "lucide-react";
import { MacroCategoryFormData } from "./modals/AddMacroCategoryModal";
import { CategoryFormData } from "./modals/AddCategoryModal";

interface CategoriesListProps {
  macroCategory: MacroCategoryFormData;
  categories: CategoryFormData[];
  onEditMacroCategory: (mc: MacroCategoryFormData) => void;
  onDeleteMacroCategory: (id: string) => void;
  onAddCategory: () => void;
  onEditCategory: (c: CategoryFormData) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoriesList({
  macroCategory,
  categories,
  onEditMacroCategory,
  onDeleteMacroCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: CategoriesListProps) {

  const MacroIconComponent = (LucideIcons as any)[macroCategory.icon] || LucideIcons.Tag;

  const [macroMenuOpen, setMacroMenuOpen] = useState(false);
  const macroMenuRef = useRef<HTMLDivElement>(null);

  const [categoryMenuOpenId, setCategoryMenuOpenId] = useState<string | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (macroMenuRef.current && !macroMenuRef.current.contains(event.target as Node)) {
        setMacroMenuOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setCategoryMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 bg-white h-full overflow-y-auto">
      <div className="bg-white rounded-lg p-5 mb-5">

        {/* Macro Category Header */}
        <div className="flex items-center justify-between relative p-5 bg-[#F1F5F9] mb-5" ref={macroMenuRef}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: macroCategory.color }}
            >
              <MacroIconComponent className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-[14px] font-bold text-[#1E293B]">{macroCategory.name}</h2>
          </div>

          <button
            onClick={() => setMacroMenuOpen(!macroMenuOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {macroMenuOpen && (
            <div className="absolute right-0 top-12 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-lg py-1 z-10">
              <button
                onClick={() => { setMacroMenuOpen(false); onEditMacroCategory(macroCategory); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#64748B] hover:text-[#635BFF] hover:bg-[#EEF2FF] transition-colors text-left"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => { setMacroMenuOpen(false); onAddCategory(); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#64748B] hover:text-[#22C55E] hover:bg-[#F0FDF4] transition-colors text-left"
              >
                <PlusSquare className="w-3.5 h-3.5" />
                Add category
              </button>
              <button
                onClick={() => { setMacroMenuOpen(false); onDeleteMacroCategory(macroCategory.id!); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Categories List */}
        <div className="space-y-2 relative" ref={categoryMenuRef}>
          {categories.length === 0 ? (
            <div className="text-[13px] text-[#94A3B8] py-4 pl-12 text-center md:text-left">
              No categories added yet. Click on the 3 dots to add one.
            </div>
          ) : (
            categories.map((cat, index) => {
              const CatIconComponent = (LucideIcons as any)[cat.icon] || LucideIcons.Tag;
              const isMenuOpen = categoryMenuOpenId === cat.id;

              return (
                <div key={cat.id} className="flex items-center justify-between group py-2 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-6 flex justify-end text-[#CBD5E1]">
                      <CornerDownRight className="w-4 h-4" />
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: cat.color }}
                    >
                      <CatIconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[13px] font-bold text-[#1E293B]">{cat.name}</span>
                  </div>

                  <button
                    onClick={() => setCategoryMenuOpenId(isMenuOpen ? null : cat.id!)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-10 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-lg py-1 z-20">
                      <button
                        onClick={() => { setCategoryMenuOpenId(null); onEditCategory(cat); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#64748B] hover:text-[#635BFF] hover:bg-[#EEF2FF] transition-colors text-left"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => { setCategoryMenuOpenId(null); onDeleteCategory(cat.id!); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
