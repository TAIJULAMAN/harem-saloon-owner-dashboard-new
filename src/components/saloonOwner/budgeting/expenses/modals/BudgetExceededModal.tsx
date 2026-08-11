import React from "react";
import { X, AlertCircle } from "lucide-react";

interface BudgetExceededModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function BudgetExceededModal({ isOpen, onClose, onConfirm }: BudgetExceededModalProps) {
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
          <div className="w-24 h-24 bg-[#FFF1F2] rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white border-2 border-[#FB7185] rounded-full flex items-center justify-center">
              <span className="text-[32px] font-bold text-[#FB7185] mb-1">!</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-4">
          <h2 className="text-[20px] font-bold text-[#1E293B]">Budget exceeded!</h2>
          <p className="text-[14px] font-medium text-[#94A3B8] leading-relaxed">
            Adding this expense will increase the "Marketing" category budget by R$120.00.
          </p>
          <p className="text-[14px] font-medium text-[#94A3B8] pb-4">
            Do you still want to continue?
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
              className="px-6 py-2.5 bg-[#635BFF] text-white rounded-lg text-[13px] font-bold hover:bg-[#5249ea] transition-colors"
            >
              Save Expense
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
