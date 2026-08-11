import React from "react";
import { Check } from "lucide-react";
import Modal from "@/components/saloonOwner/common/Modal";

interface CloseRegisterSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: () => void;
  onViewDashboard: () => void;
}

export default function CloseRegisterSuccessModal({ isOpen, onClose, onExport, onViewDashboard }: CloseRegisterSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} maxWidth="max-w-md">
      <div className="pt-8 pb-6 px-4 flex flex-col items-center justify-center text-center">
        {/* Success Icon */}
        <div className="w-[100px] h-[100px] rounded-full bg-[#E0F2FE]/50 bg-[#ECFEF6] flex items-center justify-center mb-6 shadow-sm">
          <div className="w-[80px] h-[80px] rounded-full bg-[#CCFBF1] flex items-center justify-center">
            <Check className="w-10 h-10 text-[#14B8A6] stroke-[3]" />
          </div>
        </div>
        
        <h3 className="text-[20px] font-bold text-[#1E293B] mb-2">Success!</h3>
        <p className="text-[13px] text-[#94A3B8] font-medium mb-8">Cash register closed successfully.</p>
        
        {/* Actions */}
        <div className="flex items-center justify-center gap-3 w-full px-4">
          <button 
            onClick={onExport}
            className="flex-1 py-2.5 bg-[#E0E7FF] hover:bg-[#c7d2fe] text-[#635BFF] text-[13px] font-bold rounded-lg transition-colors"
          >
            Export Report
          </button>
          <button 
            onClick={onViewDashboard}
            className="flex-1 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </Modal>
  );
}
