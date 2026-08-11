import React, { useState } from "react";
import { X, ChevronDown, AlertCircle } from "lucide-react";

interface Payment {
  id: string;
  date: string;
  client: { name: string; email: string };
  teamMember: { name: string; email: string };
  method: string;
  status: string;
  receiptStatus: string;
}

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  onIssueRefund: () => void;
}

export default function RefundModal({ isOpen, onClose, payment, onIssueRefund }: RefundModalProps) {
  const [amount, setAmount] = useState<string>("€ 170");
  const [givenBy, setGivenBy] = useState("Maria Rodriguez");
  const [reason, setReason] = useState("");
  const [isGivenByOpen, setIsGivenByOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);

  if (!isOpen || !payment) return null;

  // Assuming a max refund of 170 for demonstration as per screenshot
  const maxAmount = 170;
  const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ""));
  const isError = numAmount > maxAmount;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleIssueRefund = () => {
    if (!isError) {
      onIssueRefund();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] w-full max-w-[650px] shadow-xl p-8 relative animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-[20px] font-bold text-[#1E293B] mb-2 font-manrope">Refund</h2>
            <div className="text-[13px] text-[#475569] flex items-center gap-1.5">
              <span>ID: <span className="text-[#635BFF] font-medium">{payment.id}</span></span>
              <span>•</span>
              <span>{payment.date}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Refund Method */}
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Refund Method *</label>
            <input
              type="text"
              value={payment.method === "Gift Card" ? "Gift Card" : payment.method}
              disabled
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#94A3B8] font-medium outline-none cursor-not-allowed"
            />
          </div>

          {/* Refund Amount */}
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Refund Amount (Max € {maxAmount}) *</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full bg-white border ${isError ? 'border-[#F43F5E] text-[#F43F5E]' : 'border-[#E2E8F0] text-[#475569]'} rounded-lg px-4 py-3 text-[13px] font-medium outline-none focus:border-[#635BFF] transition-colors`}
            />
            {isError && (
              <div className="flex items-center gap-1.5 mt-2 text-[#F43F5E] text-[11px] font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                The value exceeds the maximum
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {/* Cash Refund Given By */}
          <div className="relative">
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">
              {payment.method === "Cash" ? "Cash Refund Given By *" : "Refund Given By *"}
            </label>
            <button
              onClick={() => { setIsGivenByOpen(!isGivenByOpen); setIsReasonOpen(false); }}
              className="w-full flex items-center justify-between bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] text-[#94A3B8] font-medium hover:bg-[#F8FAFC] transition-colors"
            >
              <span className={givenBy ? "text-[#475569]" : "text-[#94A3B8]"}>{givenBy || "Select team member"}</span>
              <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
            </button>

            {isGivenByOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-2">
                {["Maria Rodriguez", "John Doe", "Jane Smith"].map((name) => (
                  <div
                    key={name}
                    onClick={() => { setGivenBy(name); setIsGivenByOpen(false); }}
                    className="px-4 py-2.5 text-[13px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#635BFF] cursor-pointer transition-colors"
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reason for Refund */}
          <div className="relative">
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Reason for Refund *</label>
            <button
              onClick={() => { setIsReasonOpen(!isReasonOpen); setIsGivenByOpen(false); }}
              className="w-full flex items-center justify-between bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium hover:bg-[#F8FAFC] transition-colors"
            >
              <span className={reason ? "text-[#475569]" : "text-[#94A3B8]"}>{reason || "Choose a reason for refund"}</span>
              <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
            </button>

            {isReasonOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                {[
                  "Client cancelled service related to payment",
                  "Incorrect amount",
                  "Duplicate transaction",
                  "Client's request",
                  "Other"
                ].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => { setReason(opt); setIsReasonOpen(false); }}
                    className="px-5 py-2.5 text-[13.5px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#635BFF] cursor-pointer transition-colors"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleIssueRefund}
            disabled={isError}
            className={`px-6 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${isError
                ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                : 'bg-[#635BFF] hover:bg-[#524be0] text-white shadow-sm'
              }`}
          >
            Issue Refund
          </button>
        </div>

      </div>
    </div>
  );
}
