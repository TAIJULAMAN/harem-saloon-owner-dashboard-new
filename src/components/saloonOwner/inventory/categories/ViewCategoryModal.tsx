import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface ViewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryData?: any;
}

export default function ViewCategoryModal({ isOpen, onClose, categoryData }: ViewCategoryModalProps) {
  if (!categoryData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Category Details" maxWidth="max-w-sm">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Category Name</label>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
            {categoryData.name}
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Related Products</label>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
            {categoryData.relatedProducts}
          </div>
        </div>
        <div className="flex items-center gap-3 w-full pt-6">
          <button 
            onClick={onClose} 
            className="w-full px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
