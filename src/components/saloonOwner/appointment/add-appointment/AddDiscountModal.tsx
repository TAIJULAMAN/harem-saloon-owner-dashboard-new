"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DISCOUNT_TYPES = ["Percentage", "Fixed Amount"];

export default function AddDiscountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [discountType, setDiscountType] = useState("Percentage");
  const [typeOpen, setTypeOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const typeRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node))
        setTypeOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Live total after discount
  const totalAfter = amount ? `€ ${parseFloat(amount) || 0}` : "€ 0";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[698px] px-8 py-7 font-manrope">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-[#1A1A2E]">
              Add Cart Discount
            </h3>
            <p className="text-sm text-[#98A4AE] mt-1">
              Taxes will be recalculated after the discount has been applied.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-7 mb-7">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
              Type <span className="text-[#29343D]">*</span>
            </label>
            <div ref={typeRef} className="relative">
              <button
                onClick={() => setTypeOpen((o) => !o)}
                className={`w-full flex items-center justify-between px-4 py-3.5 border rounded-[4px] text-sm transition-colors cursor-pointer bg-white ${
                  typeOpen
                    ? "border-[#635BFF]"
                    : "border-[#E0E6EB] hover:border-[#B0BAC5]"
                }`}
              >
                <span className="text-[#98A4AE]">{discountType}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#98A4AE] transition-transform duration-200 ${typeOpen ? "rotate-180" : ""}`}
                />
              </button>

              {typeOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E0E6EB] rounded-xl shadow-lg z-10 py-1.5 overflow-hidden">
                  {DISCOUNT_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setDiscountType(t);
                        setTypeOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        discountType === t
                          ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                          : "text-[#29343D] hover:bg-gray-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
              Ammount (%) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter percentage"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3.5 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#16CDC7] bg-[#ECFDFD] px-4 py-2 rounded-full">
            Total After Discount: {totalAfter}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-3 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            Add Discount
          </button>
        </div>
      </div>
    </div>
  );
}
