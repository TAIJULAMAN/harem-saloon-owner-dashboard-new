import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[460px] mx-4 shadow-2xl overflow-hidden p-6 relative animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#1E293B]">Export Report</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          <label className="block text-[13px] font-bold text-[#1E293B] mb-2">
            Range <span className="text-[#1E293B]">*</span>
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#94A3B8] font-medium outline-none focus:border-[#635BFF] transition-colors cursor-pointer">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4 sm:mt-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-2.5 rounded-lg font-bold text-[14px] transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Export
          </button>
        </div>

      </div>
    </div>
  );
}
