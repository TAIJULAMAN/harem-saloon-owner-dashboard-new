"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReceiptSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiptSuccessModal({ isOpen, onClose }: ReceiptSuccessModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // Clean up query param
    router.replace("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200 mx-4 text-center">
        
        <div className="w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-[#10B981] stroke-[3]" />
        </div>

        <h2 className="text-[20px] font-bold text-[#1E293B] mb-2">Success!</h2>
        <p className="text-[13px] text-[#64748B] font-medium mb-8">
          Receipt has been created successfully.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button 
            onClick={handleClose}
            className="bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
          >
            Send to Email
          </button>
          <button 
            onClick={handleClose}
            className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Print Receipt
          </button>
        </div>

      </div>
    </div>
  );
}
