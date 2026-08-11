import React, { useState, useEffect } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight } from "lucide-react";

interface EditStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function EditStockModal({ isOpen, onClose, onSave, initialData }: EditStockModalProps) {
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    type: "In",
    sku: "",
    productName: "",
    quantity: 1,
    status: "In Stock",
    price: 0
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Movement" maxWidth="max-w-2xl">
      <div className="space-y-4 pt-2">
        {/* Product Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#F8FAFF] border border-[#E2E8F0] p-4 rounded-lg">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-200" />
          <div>
            <h4 className="text-[14px] font-bold text-[#1E293B] mb-1">{formData.productName || "Curology Face wash"}</h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-[#64748B]">
              <span>SKU: <span className="font-bold text-[#475569]">{formData.sku || "PSKUROD-2025-001"}</span></span>
              <span>Barcode: <span className="font-bold text-[#475569]">7891234567895</span></span>
              <span>Brand: <span className="font-bold text-[#475569]">Curology</span></span>
            </div>
          </div>
        </div>

        {/* Stock Preview */}
        <div className="flex items-center justify-center gap-8 py-6 border border-[#E2E8F0] rounded-lg bg-[#FAFAFA]">
          <div className="text-center">
            <p className="text-[11px] font-bold text-[#94A3B8] mb-1">Current Stock</p>
            <p className="text-3xl font-bold text-[#1E293B]">45</p>
          </div>
          <div className="text-[#E2E8F0]">
            <ChevronRight className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-bold text-[#94A3B8] mb-1">
              New Stock <span className={formData.type === "In" ? "text-[#10B981] ml-1" : "text-[#F43F5E] ml-1"}>
                {formData.type === "In" ? "+" : "-"}{formData.quantity || 0}
              </span>
            </p>
            <p className="text-3xl font-bold text-[#635BFF]">
              {formData.type === "In" ? 45 + (formData.quantity || 0) : 45 - (formData.quantity || 0)}
            </p>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="flex items-center gap-4 py-2">
          <div
            onClick={() => setFormData({ ...formData, type: "In" })}
            className={`flex-1 p-6 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${formData.type === "In" ? "bg-[#F0FDF4] border-[#22C55E]" : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${formData.type === "In" ? "bg-[#22C55E]" : "bg-[#94A3B8]"
              }`}>
              <ArrowDown className="w-5 h-5 text-white" />
            </div>
            <span className={`text-[13px] font-bold ${formData.type === "In" ? "text-[#22C55E]" : "text-[#94A3B8]"
              }`}>Stock In</span>
          </div>

          <div
            onClick={() => setFormData({ ...formData, type: "Out" })}
            className={`flex-1 p-6 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${formData.type === "Out" ? "bg-[#FFF1F2] border-[#F43F5E]" : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${formData.type === "Out" ? "bg-[#F43F5E]" : "bg-[#94A3B8]"
              }`}>
              <ArrowUp className="w-5 h-5 text-white" />
            </div>
            <span className={`text-[13px] font-bold ${formData.type === "Out" ? "text-[#F43F5E]" : "text-[#94A3B8]"
              }`}>Stock Out</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Quantity *</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={formData.quantity || ''}
              onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Responsible user *</label>
            <div className="relative">
              <select
                className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-3 text-[13px] text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none cursor-pointer"
              >
                <option value="">Select staff</option>
                <option value="1">Maria Rodriguez</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Note (Optional)</label>
            <textarea
              placeholder="Enter a note"
              rows={3}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 pb-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-[13px] font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
