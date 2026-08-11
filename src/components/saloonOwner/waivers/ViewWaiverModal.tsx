import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { FileText, Clock, Users } from "lucide-react";

interface ViewWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  waiver: any;
}

export default function ViewWaiverModal({ isOpen, onClose, waiver }: ViewWaiverModalProps) {
  if (!waiver) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Waiver Details">
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          <div className="w-14 h-14 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 shadow-sm">
            <FileText className="w-7 h-7 text-[#635BFF]" />
          </div>
          <div>
            <h3 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope leading-tight">{waiver.name}</h3>
            <p className="text-[13px] font-medium text-[#64748B] mt-1">ID: {waiver.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#64748B]">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Signers Req.</span>
            </div>
            <p className="text-lg font-black text-[#1E293B]">{waiver.signers}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#64748B]">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Signed</span>
            </div>
            <p className="text-lg font-black text-[#1E293B]">{waiver.signedCount}</p>
          </div>
        </div>

        <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-[#64748B]">Last Update</span>
            <div className="flex items-center gap-2 text-[#1E293B] font-bold">
              <Clock className="w-4 h-4 text-[#94A3B8]" />
              {waiver.lastUpdate}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] font-bold text-sm rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
