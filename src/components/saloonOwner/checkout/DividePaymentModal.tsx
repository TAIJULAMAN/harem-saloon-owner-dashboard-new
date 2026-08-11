"use client";

import React from "react";
import { X, Banknote, CreditCard, Ticket, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

interface DividePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  selectedMethods: string[];
}

export default function DividePaymentModal({ isOpen, onClose, totalAmount, selectedMethods }: DividePaymentModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case "Cash": return <Banknote className="w-5 h-5" />;
      case "Gift Card": return <Ticket className="w-5 h-5" />;
      case "Card Terminal": return <CreditCard className="w-5 h-5" />;
      case "QR Code": return <QrCode className="w-5 h-5" />;
      default: return <Banknote className="w-5 h-5" />;
    }
  };

  const handleConfirm = () => {
    onClose();
    router.push("/dashboard?receiptSuccess=true");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[600px] shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 mx-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[16px] font-bold text-[#1E293B]">Divide Payment</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Amount */}
        <div className="mb-6">
          <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Total Amount</label>
          <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] px-4 py-3 text-[14px] font-semibold text-[#94A3B8]">
            € {totalAmount}
          </div>
        </div>

        {/* Dynamic Payment Method Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {selectedMethods.map((method) => (
            <div key={method} className="border border-[#E2E8F0] rounded-[16px] p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center">
                  {getIcon(method)}
                </div>
                <span className="text-[14px] font-bold text-[#1E293B]">{method}</span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#1E293B]">€</span>
                <input
                  type="text"
                  defaultValue={100} // Mocking the default value as shown in the design
                  className="w-full border border-[#E2E8F0] rounded-[12px] pl-8 pr-4 py-2.5 text-[14px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Confirm Payment
          </button>
        </div>

      </div>
    </div>
  );
}
