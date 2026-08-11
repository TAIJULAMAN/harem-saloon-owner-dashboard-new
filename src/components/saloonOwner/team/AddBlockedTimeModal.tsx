import React from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface AddBlockedTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AddBlockedTimeModal({ isOpen, onClose, onSave }: AddBlockedTimeModalProps) {
  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Blocked Time" maxWidth="max-w-md">
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Team Member</label>
          <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors">
            <option value="">Select a member</option>
            <option value="1">Maria Rodriguez</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Date</label>
          <input 
            type="date" 
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Start Time</label>
            <input 
              type="time" 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">End Time</label>
            <input 
              type="time" 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors"
          >
            Block Time
          </button>
        </div>
      </div>
    </Modal>
  );
}
