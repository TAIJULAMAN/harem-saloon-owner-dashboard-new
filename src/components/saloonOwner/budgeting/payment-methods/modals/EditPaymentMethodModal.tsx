"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { MOCK_PAYMENT_METHODS } from "../../data";

interface EditPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  methodId: string | null;
}

export function EditPaymentMethodModal({ isOpen, onClose, onSave, methodId }: EditPaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    accountType: "",
    initialValue: ""
  });
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);

  useEffect(() => {
    if (isOpen && methodId) {
      const method = MOCK_PAYMENT_METHODS.find(m => m.id === methodId);
      if (method) {
        setFormData({
          name: method.name,
          accountType: method.accountType,
          initialValue: method.initialValue
        });
      }
    } else {
      setFormData({ name: "", accountType: "", initialValue: "" });
    }
  }, [isOpen, methodId]);

  if (!isOpen) return null;

  const accountTypes = ["Credit Card", "Cash", "Direct debit", "Bank transfer"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
          <h2 className="text-xl font-bold text-[#1E293B]">Edit Payment Method</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[14px] font-bold text-[#1E293B] mb-2">
                Name *
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <label className="block text-[14px] font-bold text-[#1E293B] mb-2">
                Account Type *
              </label>
              <button
                onClick={() => setIsAccountTypeOpen(!isAccountTypeOpen)}
                className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors flex items-center justify-between text-left"
              >
                <span className={formData.accountType ? "text-[#1E293B]" : "text-[#94A3B8]"}>
                  {formData.accountType || "Select account type"}
                </span>
                <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
              </button>

              {isAccountTypeOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-2">
                  {accountTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setFormData({ ...formData, accountType: type });
                        setIsAccountTypeOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-sm text-[#1E293B]"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#1E293B] mb-2">
              Initial Value *
            </label>
            <input
              type="text"
              placeholder="Enter initial value"
              className="w-full h-12 px-4 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors"
              value={formData.initialValue}
              onChange={(e) => setFormData({ ...formData, initialValue: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#F1F5F9] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] font-bold text-sm hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2.5 rounded-lg bg-[#635BFF] text-white font-bold text-sm hover:bg-[#5249EC] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
