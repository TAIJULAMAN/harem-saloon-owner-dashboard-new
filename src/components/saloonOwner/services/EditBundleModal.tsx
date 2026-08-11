import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface EditBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bundle: any) => void;
  initialData?: any;
}

const categories = [
  { label: "Category 1", value: "Category 1", style: "bg-[#E0E7FF] text-[#635BFF]" },
  { label: "Category 2", value: "Category 2", style: "bg-[#CCFBF1] text-[#14B8A6]" },
  { label: "Category 3", value: "Category 3", style: "bg-[#DCFCE7] text-[#22C55E]" },
  { label: "Category 4", value: "Category 4", style: "bg-[#FEF9C3] text-[#EAB308]" },
  { label: "Category 5", value: "Category 5", style: "bg-[#FCE7F3] text-[#EC4899]" },
  { label: "Category 6", value: "Category 6", style: "bg-[#F1F5F9] text-[#64748B]" },
];

export default function EditBundleModal({ isOpen, onClose, onSave, initialData }: EditBundleModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].value);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    const selectedCat = categories.find(c => c.value === category);
    onSave({ ...initialData, name, category: selectedCat?.value, categoryStyle: selectedCat?.style });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Bundle" maxWidth="max-w-md">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Bundle Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
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
