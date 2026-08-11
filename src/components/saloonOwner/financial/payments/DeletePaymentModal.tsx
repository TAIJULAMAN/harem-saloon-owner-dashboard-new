import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface DeletePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeletePaymentModal({ isOpen, onClose, onConfirm }: DeletePaymentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Payment" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center pt-4">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-2">Are you sure?</h3>
        <p className="text-[13px] text-[#64748B] mb-8 px-4">
          This action cannot be undone. This payment record will be permanently removed.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm shadow-[#EF4444]/20"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
