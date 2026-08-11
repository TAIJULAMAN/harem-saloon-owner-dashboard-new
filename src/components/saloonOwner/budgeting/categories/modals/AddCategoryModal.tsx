import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import ColorPicker from "@/components/saloonOwner/common/ColorPicker";
import IconPicker from "@/components/saloonOwner/common/IconPicker";

export interface CategoryFormData {
  id?: string;
  name: string;
  color: string;
  icon: string;
  nature: string;
  macroCategoryId?: string;
  isHidden?: boolean;
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  initialData?: CategoryFormData;
  macroCategoryId?: string;
}

export function AddCategoryModal({ isOpen, onClose, onSave, initialData, macroCategoryId }: AddCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    color: "",
    icon: "",
    nature: "Fixed",
    macroCategoryId: macroCategoryId || "",
    isHidden: false,
  });

  const [natureOpen, setNatureOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        color: "",
        icon: "",
        nature: "Fixed",
        macroCategoryId: macroCategoryId || "",
        isHidden: false,
      });
    }
  }, [initialData, macroCategoryId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isFormValid = formData.name && formData.color && formData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
      <div className="bg-white rounded-lg w-full max-w-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-[18px] font-bold text-[#1E293B]">
            {initialData ? "Edit category" : "Add category"}
          </h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Name <span className="text-[#EF4444]">*</span></label>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[14px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>

            {/* Color */}
            <ColorPicker
              value={formData.color}
              onChange={(c) => setFormData({ ...formData, color: c })}
            />

            {/* Icon */}
            <div className="sm:col-span-2">
              <IconPicker
                value={formData.icon}
                onChange={(i) => setFormData({ ...formData, icon: i })}
              />
            </div>

            {/* Nature of spending */}
            <div className="relative sm:col-span-2">
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Nature of spending <span className="text-[#EF4444]">*</span></label>
              <button
                type="button"
                onClick={() => setNatureOpen(!natureOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[14px] focus:outline-none focus:border-[#635BFF] transition-colors text-[#1E293B]"
              >
                {formData.nature || "Select"}
                <ChevronDown className={`w-5 h-5 text-[#94A3B8] transition-transform ${natureOpen ? "rotate-180" : ""}`} />
              </button>
              {natureOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1">
                  {["Fixed", "Variable"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setFormData({ ...formData, nature: opt }); setNatureOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-[13px] font-medium text-[#1E293B]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hide toggle */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              role="switch"
              aria-checked={formData.isHidden}
              onClick={() => setFormData({ ...formData, isHidden: !formData.isHidden })}
              className={`relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-[6px] border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.isHidden ? "bg-[#635BFF]" : "bg-[#E2E8F0]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-[4px] bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  formData.isHidden ? "translate-x-[16px]" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-[14px] font-medium text-[#475569]">Hide</span>
          </div>

          {/* Footer / Actions */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-[#5249ea] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
