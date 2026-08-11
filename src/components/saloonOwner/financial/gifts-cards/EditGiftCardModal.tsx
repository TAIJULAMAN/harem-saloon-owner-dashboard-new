import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface EditGiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function EditGiftCardModal({ isOpen, onClose, onSave, initialData }: EditGiftCardModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    issueDate: "",
    expirationDate: "",
    amount: "",
    eligibleServices: "All",
    usageLimit: "1",
    status: "No-Used",
    subStatus: "Active"
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        id: initialData.id,
        issueDate: initialData.issueDate,
        expirationDate: initialData.expirationDate,
        amount: initialData.amount.toString(),
        eligibleServices: initialData.eligibleServices,
        usageLimit: initialData.usageLimit.toString(),
        status: initialData.status,
        subStatus: initialData.subStatus || "Active"
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    onSave({
      id: formData.id,
      issueDate: formData.issueDate,
      expirationDate: formData.expirationDate,
      amount: Number(formData.amount) || 0,
      eligibleServices: formData.eligibleServices,
      usageLimit: Number(formData.usageLimit) || 1,
      status: formData.status,
      subStatus: formData.status === "No-Used" ? formData.subStatus : undefined
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Gift Card" maxWidth="max-w-2xl">
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Amount (€)</label>
            <input 
              type="number" 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Usage Limit</label>
            <input 
              type="number" 
              value={formData.usageLimit} 
              onChange={e => setFormData({...formData, usageLimit: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Expiration Date</label>
            <input 
              type="text" 
              value={formData.expirationDate} 
              onChange={e => setFormData({...formData, expirationDate: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Eligible Services</label>
            <select 
              value={formData.eligibleServices} 
              onChange={e => setFormData({...formData, eligibleServices: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
            >
              <option value="All">All Services</option>
              <option value="Haircuts">Haircuts Only</option>
              <option value="Coloring">Coloring Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({...formData, status: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
            >
              <option value="Used">Used</option>
              <option value="No-Used">No-Used</option>
            </select>
          </div>
          {formData.status === "No-Used" && (
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Sub Status</label>
              <select 
                value={formData.subStatus} 
                onChange={e => setFormData({...formData, subStatus: e.target.value})} 
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full pt-6">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
