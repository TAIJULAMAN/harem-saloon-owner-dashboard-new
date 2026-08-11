import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function EditCategoryModal({ isOpen, onClose, onSave, initialData }: EditCategoryModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    relatedProducts: 0
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Category" maxWidth="max-w-sm">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
          />
        </div>
        <div className="flex items-center gap-3 w-full pt-6">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
