import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData?: any;
}

export default function ViewReceiptModal({ isOpen, onClose, receiptData }: ViewReceiptModalProps) {
  if (!receiptData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receipt Details" maxWidth="max-w-2xl">
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Client</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              <div>{receiptData.clientName}</div>
              <div className="text-[11px] text-[#64748B] font-medium">{receiptData.clientEmail}</div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Amount</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              € {receiptData.amount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Date</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {receiptData.date}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Method</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {receiptData.method}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Status</label>
            <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B]">
              {receiptData.status}
            </div>
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
