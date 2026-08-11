import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface AttachReceiptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function AttachReceiptsModal({ isOpen, onClose, onSave }: AttachReceiptsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
      <div className="bg-white rounded-lg w-full max-w-2xl flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <h2 className="text-[18px] font-bold text-[#1E293B]">Attach receipts/invoices</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-[12px] font-bold text-[#1E293B]">Attach files *</label>
            <div className="border border-dashed border-[#635BFF] rounded-lg p-12 flex flex-col items-center justify-center gap-3 bg-white cursor-pointer hover:bg-[#F8FAFC] transition-colors">
              <Image width={40} height={40} src="/upload.svg" alt="Upload" />

              <div className="text-[13px] font-bold text-[#635BFF]">
                Drop here or click to browse
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={onSave}
            className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#5249ea] transition-colors"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
