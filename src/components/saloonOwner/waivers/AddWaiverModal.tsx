import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface AddWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (waiverData: any) => void;
}

export default function AddWaiverModal({ isOpen, onClose, onSave }: AddWaiverModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    signers: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      signedCount: "0 times",
      lastUpdate: "Just now",
    });
    setFormData({ name: "", signers: 0 });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Waiver">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#1E293B]">Waiver Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Liability Waiver"
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all placeholder:text-[#94A3B8]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#1E293B]">Required Signers</label>
          <input
            required
            type="number"
            min="1"
            value={formData.signers}
            onChange={(e) => setFormData({ ...formData, signers: Number(e.target.value) })}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-[#64748B] hover:text-[#1E293B] bg-transparent hover:bg-[#F1F5F9] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#635BFF] hover:bg-[#524be0] rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save Waiver
          </button>
        </div>
      </form>
    </Modal>
  );
}
