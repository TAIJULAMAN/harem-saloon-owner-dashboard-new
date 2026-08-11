import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { AlertTriangle } from "lucide-react";

interface DeleteShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteShiftModal({ isOpen, onClose, onConfirm }: DeleteShiftModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Shift" maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-4">
        <h3 className="text-[18px] font-bold text-[#1E293B] mb-2">Delete Shift</h3>
        <p className="text-[14px] text-[#64748B] mb-8">
          Are you sure you want to delete this shift? This action cannot be undone.
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
            className="flex-1 px-4 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
