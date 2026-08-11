import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface EditWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  waiver: any;
  onSave: (waiverData: any) => void;
}

export default function EditWaiverModal({ isOpen, onClose, waiver, onSave }: EditWaiverModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    signers: 0,
  });

  useEffect(() => {
    if (waiver) {
      setFormData({
        name: waiver.name,
        signers: waiver.signers,
      });
    }
  }, [waiver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...waiver,
      ...formData,
      lastUpdate: "Just now",
    });
    onClose();
  };

  if (!waiver) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Waiver">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#1E293B]">Waiver Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
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
            className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 transition-all"
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
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors shadow-sm shadow-[#10B981]/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
