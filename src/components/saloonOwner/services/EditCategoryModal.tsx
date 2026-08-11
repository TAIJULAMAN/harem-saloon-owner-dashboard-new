import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
  initialData?: any;
}

const colorThemes = [
  { label: "Purple (Category 1)", value: "bg-[#E0E7FF] text-[#635BFF]" },
  { label: "Cyan (Category 2)", value: "bg-[#CCFBF1] text-[#14B8A6]" },
  { label: "Green (Category 3)", value: "bg-[#DCFCE7] text-[#22C55E]" },
  { label: "Yellow (Category 4)", value: "bg-[#FEF9C3] text-[#EAB308]" },
  { label: "Pink (Category 5)", value: "bg-[#FCE7F3] text-[#EC4899]" },
  { label: "Gray (Category 6)", value: "bg-[#F1F5F9] text-[#64748B]" },
];

export default function EditCategoryModal({ isOpen, onClose, onSave, initialData }: EditCategoryModalProps) {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState(colorThemes[0].value);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setTheme(initialData.categoryStyle);
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    onSave({ ...initialData, name, categoryStyle: theme });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Category" maxWidth="max-w-md">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Color Theme</label>
          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
          >
            {colorThemes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
