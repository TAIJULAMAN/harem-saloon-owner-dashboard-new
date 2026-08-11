import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function AddReceiptModal({ isOpen, onClose, onSave }: AddReceiptModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    clientName: "",
    clientEmail: "",
    amount: "",
    method: "Cash",
    status: "Issued"
  });

  const handleSubmit = () => {
    onSave({
      id: "#" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      date: formData.date,
      clientName: formData.clientName || "New Client",
      clientEmail: formData.clientEmail,
      amount: Number(formData.amount) || 0,
      method: formData.method,
      status: formData.status
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Receipt" maxWidth="max-w-2xl">
      <div className="space-y-4 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Client Name</label>
            <input 
              type="text" 
              value={formData.clientName} 
              onChange={e => setFormData({...formData, clientName: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
              placeholder="e.g. Maria Rodriguez"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Client Email</label>
            <input 
              type="email" 
              value={formData.clientEmail} 
              onChange={e => setFormData({...formData, clientEmail: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
              placeholder="maria@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Amount (€)</label>
            <input 
              type="number" 
              value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors" 
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Method</label>
            <select 
              value={formData.method} 
              onChange={e => setFormData({...formData, method: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
            >
              <option value="Cash">Cash</option>
              <option value="Card Terminal">Card Terminal</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Online Payment">Online Payment</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] mb-1.5 uppercase tracking-wide">Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({...formData, status: e.target.value})} 
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
            >
              <option value="Issued">Issued</option>
              <option value="Draft">Draft</option>
              <option value="Canceled">Canceled</option>
            </select>
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
            onClick={handleSubmit} 
            className="flex-1 px-4 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save Receipt
          </button>
        </div>
      </div>
    </Modal>
  );
}
