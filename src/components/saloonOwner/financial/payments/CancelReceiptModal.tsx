import React from "react";

interface CancelReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelReceiptModal({ isOpen, onClose, onConfirm }: CancelReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] w-full max-w-[550px] shadow-xl p-8 relative animate-in zoom-in-95 duration-200">

        <h2 className="text-[22px] font-bold text-[#1E293B] mb-6 font-manrope">Cancel the receipt</h2>

        <p className="text-[14px] font-medium text-[#475569] mb-10">
          Do you want to cancel the receipt that was issued after payment?
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
          >
            No
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
          >
            Yes, cancel now
          </button>
        </div>

      </div>
    </div>
  );
}
