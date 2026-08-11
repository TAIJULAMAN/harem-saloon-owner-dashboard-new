import React from "react";
import { X, Eye, Download, FileText } from "lucide-react";
import { ExpensePill } from "../ExpensePill";

interface ViewExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseData: any; // The expense object to view
}

export function ViewExpenseModal({ isOpen, onClose, expenseData }: ViewExpenseModalProps) {
  if (!isOpen || !expenseData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">

        {/* Header Title */}
        <div className="flex items-center justify-between p-4 sm:p-6 pb-2 sm:pb-2">
          <h2 className="text-[18px] font-bold text-[#1E293B]">View Expense</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 flex-1">

          {/* Main Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-4 sm:p-6 space-y-5 sm:space-y-6">

            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="text-[15px] sm:text-[16px] font-bold text-[#1E293B]">{expenseData.date}</div>
              <div className="bg-[#F8FAFC] text-[#1E293B] px-3 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-bold">
                {expenseData.cost}
              </div>
            </div>

            {/* Grid Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4">
              <ViewField
                label="Macro-category"
                value={<ExpensePill text={expenseData.macroCategory.text} colorType={expenseData.macroCategory.colorType} variant="solid" />}
              />
              <ViewField
                label="Category"
                value={<ExpensePill text={expenseData.category.text} colorType={expenseData.category.colorType} variant="soft" />}
              />
              <ViewField
                label="Payment Method"
                value={<ExpensePill text={expenseData.paymentMethod.text} colorType={expenseData.paymentMethod.colorType} variant="soft" />}
              />
              <ViewField label="Supplier" value={expenseData.supplier} />
              <ViewField label="Warranty" value="None" />
              <ViewField label="Location" value="Lorem" />
              <ViewField label="Payee" value="Lorem Ipsum" />
            </div>

            {/* Note */}
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">Note</div>
              <div className="text-[13px] font-semibold text-[#1E293B]">{expenseData.note}</div>
            </div>

            {/* Attachments */}
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] mb-2">Attach receipts/invoices</div>
              <div className="border border-[#E2E8F0] rounded-lg p-3 sm:p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#635BFF] truncate">originalname.pdf</div>
                    <div className="text-[12px] font-medium text-[#94A3B8]">4.2 MB</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors shrink-0">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors shrink-0">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function ViewField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-bold text-[#94A3B8] mb-1.5">{label}</div>
      <div className="text-[13px] font-semibold text-[#1E293B]">{value}</div>
    </div>
  );
}
