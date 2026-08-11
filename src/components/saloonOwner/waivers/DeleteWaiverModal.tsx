import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface DeleteWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  waiver: any;
  onConfirm: () => void;
}

export default function DeleteWaiverModal({ isOpen, onClose, waiver, onConfirm }: DeleteWaiverModalProps) {
  if (!waiver) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Waiver">
      <div className="space-y-4 text-center pb-2">
        <h3 className="text-xl font-bold text-[#1E293B] font-manrope">Are you absolutely sure?</h3>
        <p className="text-[13px] text-[#64748B] px-2 font-medium leading-relaxed">
          This action cannot be undone. This will permanently delete the waiver <span className="font-bold text-[#1E293B]">{waiver.name}</span>.
        </p>
      </div>

      <div className="pt-6 flex justify-center gap-3">
        <button
          onClick={onClose}
          className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2.5 text-sm font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-lg transition-colors shadow-sm shadow-[#EF4444]/20"
        >
          Yes, delete it
        </button>
      </div>
    </Modal>
  );
}
