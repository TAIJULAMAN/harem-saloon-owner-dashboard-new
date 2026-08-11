import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface OpenCashRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function OpenCashRegisterModal({ isOpen, onClose, onConfirm }: OpenCashRegisterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Open Cash Register" maxWidth="max-w-xl">
      <div className="pt-2 pb-2">
        <p className="text-[13px] text-[#94A3B8] font-medium mb-6">
          Enter the initial cash balance to start today's session.
        </p>

        {/* Opening Balance */}
        <div className="mb-6">
          <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Opening Balance (optional)</label>
          <input 
            type="text"
            className="w-full border border-[#E2E8F0] rounded-lg p-3.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors placeholder:text-[#94A3B8]"
            placeholder="Enter balance"
          />
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Notes (optional)</label>
          <textarea 
            className="w-full border border-[#E2E8F0] rounded-lg p-4 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none h-24 placeholder:text-[#94A3B8]"
            placeholder="Add a note"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] text-[13px] font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Open Cash Register
          </button>
        </div>
      </div>
    </Modal>
  );
}
