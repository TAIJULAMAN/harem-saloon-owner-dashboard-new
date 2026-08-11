import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSave }: AddCategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = () => {
    onSave({ 
      name: formData.name, 
      categoryStyle: "bg-[#E0E7FF] text-[#635BFF]", 
      relatedServices: 0 
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Category" maxWidth="max-w-2xl">
      <div className="space-y-6 pt-2">
        <div>
          <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Category Name *</label>
          <input 
            type="text" 
            placeholder="Enter category name"
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
          />
        </div>
        
        <div>
          <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Description (Optional)</label>
          <textarea 
            placeholder="Enter a description"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors min-h-[120px] resize-y"
          />
        </div>

        <div className="flex justify-end pt-2 pb-2">
          <button 
            onClick={handleSubmit} 
            className="px-8 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
