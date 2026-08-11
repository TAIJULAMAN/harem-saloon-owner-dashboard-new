import React from "react";
import { X, Trash2 } from "lucide-react";

interface DeleteExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteExpenseModal({ isOpen, onClose, onConfirm }: DeleteExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 font-manrope">
      <div className="bg-white rounded-lg w-full max-w-[480px] flex flex-col shadow-xl text-center relative overflow-hidden">

        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header & Icon */}
        <div className="pt-12 pb-6 flex justify-center">
          <div className="w-20 h-20 bg-[#FFF1F2] rounded-full flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-[#FB7185]" />
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-4">
          <h2 className="text-[20px] font-bold text-[#1E293B]">Delete Expense</h2>
          <p className="text-[14px] font-medium text-[#94A3B8] leading-relaxed pb-4">
            Are you sure you want to delete this expense? This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#EEF2FF] text-[#635BFF] rounded-lg text-[13px] font-bold hover:bg-[#E0E7FF] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-[#FB7185] text-white rounded-lg text-[13px] font-bold hover:bg-[#e11d48] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
