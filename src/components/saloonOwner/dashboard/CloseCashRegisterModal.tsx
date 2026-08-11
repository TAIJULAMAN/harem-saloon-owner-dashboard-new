import React from "react";
import { Briefcase } from "lucide-react";
import Modal from "@/components/saloonOwner/common/Modal";

interface CloseCashRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CloseCashRegisterModal({ isOpen, onClose, onConfirm }: CloseCashRegisterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Close Cash Register" maxWidth="max-w-2xl">
      <div className="pt-2 pb-2">
        {/* Header Icon */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-[#635BFF]" />
            <div className="absolute font-bold text-[#635BFF] text-[10px] mt-1">$</div>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#1E293B]">Are you sure you want to close today's cash register?</h3>
            <p className="text-[13px] text-[#94A3B8] font-medium mt-1">Please review the information before proceeding.</p>
          </div>
        </div>

        {/* Three Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#635BFF] rounded-lg p-4 shadow-sm shadow-[#635BFF]/20 flex flex-col justify-center">
            <div className="text-[18px] font-bold text-white mb-0.5">€ 2,300</div>
            <div className="text-[11px] font-medium text-white/90">Total received</div>
          </div>
          <div className="bg-[#22C55E] rounded-lg p-4 shadow-sm shadow-[#22C55E]/20 flex flex-col justify-center">
            <div className="text-[18px] font-bold text-white mb-0.5">+ € 1,300</div>
            <div className="text-[11px] font-medium text-white/90 leading-snug">Registered at the "Agenzia delle<br/>entrate"</div>
          </div>
          <div className="bg-[#14B8A6] rounded-lg p-4 shadow-sm shadow-[#14B8A6]/20 flex flex-col justify-center">
            <div className="text-[18px] font-bold text-white mb-0.5">12</div>
            <div className="text-[11px] font-medium text-white/90">Total receipts issued</div>
          </div>
        </div>

        {/* Revenue per Payment Method */}
        <div className="border border-[#E2E8F0] rounded-xl p-6 mb-6 bg-white relative">
          <h4 className="text-[13px] font-bold text-[#1E293B] mb-2">Revenue per Payment Method</h4>
          
          <div className="relative w-[260px] h-[130px] mx-auto overflow-hidden mt-6">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              <g transform="rotate(180 100 100)">
                {/* Purple */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#635BFF" strokeWidth="12" strokeDasharray="80 502.65" strokeDashoffset="0" strokeLinecap="round" />
                {/* Yellow */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#FBBF24" strokeWidth="12" strokeDasharray="30 502.65" strokeDashoffset="-90" strokeLinecap="round" />
                {/* Teal */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#06B6D4" strokeWidth="12" strokeDasharray="50 502.65" strokeDashoffset="-130" strokeLinecap="round" />
                {/* Green */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#22C55E" strokeWidth="12" strokeDasharray="61.32 502.65" strokeDashoffset="-190" strokeLinecap="round" />
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
              <div className="text-[24px] font-bold text-[#1E293B]">€ 2,300</div>
              <div className="text-[11px] text-[#94A3B8] font-medium">Total Received</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pb-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>
              <span className="text-[11px] font-medium text-[#64748B]">Direct Debit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FBBF24]"></div>
              <span className="text-[11px] font-medium text-[#64748B]">Bank Transfer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div>
              <span className="text-[11px] font-medium text-[#64748B]">Credit Card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
              <span className="text-[11px] font-medium text-[#64748B]">Cash</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
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
            Close Now
          </button>
        </div>
      </div>
    </Modal>
  );
}
