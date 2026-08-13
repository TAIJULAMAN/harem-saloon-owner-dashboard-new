"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TIP_OPTIONS = [
  { label: "No Tip", pct: 0, amount: null },
  { label: "10%", pct: 10, amount: "€ 13,20" },
  { label: "18%", pct: 18, amount: "€ 23,76" },
  { label: "25%", pct: 25, amount: "€ 33" },
  { label: "35%", pct: 35, amount: "€ 46,20" },
  { label: "45%", pct: 45, amount: "€ 59,40" },
  { label: "Custom Tip", pct: -1, amount: null },
];

const EMPLOYEE_OPTIONS = ["Maria Rodriguez", "John Smith", "Sarah Lee"];
const DISCOUNT_TYPES = ["Percentage", "Fixed Amount"];

export default function SendTipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedTip, setSelectedTip] = useState(0);
  const [employee, setEmployee] = useState(EMPLOYEE_OPTIONS[0]);
  const [empOpen, setEmpOpen] = useState(false);

  // Custom tip fields
  const [tipType, setTipType] = useState(DISCOUNT_TYPES[0]);
  const [tipTypeOpen, setTipTypeOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const empRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  const isCustom = TIP_OPTIONS[selectedTip]?.pct === -1;

  // Computed total tip
  const totalTip = (() => {
    if (!isCustom || !customAmount) return 0;
    const val = parseFloat(customAmount);
    return isNaN(val) ? 0 : val;
  })();

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (empRef.current && !empRef.current.contains(e.target as Node))
        setEmpOpen(false);
      if (typeRef.current && !typeRef.current.contains(e.target as Node))
        setTipTypeOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-[698px] p-6 font-manrope">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#1A1A2E]">Send a Tip</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* â”€â”€ Employee dropdown â”€â”€ */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
            Employee <span className="text-[#29343D]">*</span>
          </label>
          <div ref={empRef} className="relative">
            <button
              onClick={() => setEmpOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3.5 border border-[#E0E6EB] rounded-[4px] text-sm hover:border-[#635BFF] transition-colors cursor-pointer bg-white"
            >
              <span className="text-[#29343D]">{employee}</span>
              <ChevronDown
                size={18}
                className={`text-[#98A4AE] transition-transform duration-200 ${empOpen ? "rotate-180" : ""}`}
              />
            </button>
            {empOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                {EMPLOYEE_OPTIONS.map((emp) => (
                  <button
                    key={emp}
                    onClick={() => {
                      setEmployee(emp);
                      setEmpOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      employee === emp
                        ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                        : "text-[#29343D] hover:bg-gray-50"
                    }`}
                  >
                    {emp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* â”€â”€ Amount label â”€â”€ */}
        <label className="block text-sm font-semibold text-[#1A1A2E] mb-4">
          Ammount <span className="text-[#29343D]">*</span>
        </label>

        {/* â”€â”€ Tip grid â”€â”€ */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {TIP_OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedTip(i)}
              className={`flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer py-8 ${
                selectedTip === i
                  ? "border border-[#635BFF] bg-[#F0EEFF]"
                  : "border-0 bg-[#F4F6FA] hover:bg-[#EEEEFF]"
              }`}
            >
              <span className="text-2xl font-semibold text-[#29343D]">
                {opt.label}
              </span>
              {opt.amount && (
                <span className="text-sm text-[#526B7A] mt-1 font-normal">
                  {opt.amount}
                </span>
              )}
            </button>
          ))}
        </div>

        {isCustom && (
          <div className="mb-6 pt-2">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Type dropdown */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Type <span className="text-[#526B7A]">*</span>
                </label>
                <div ref={typeRef} className="relative">
                  <button
                    onClick={() => setTipTypeOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[4px] text-sm hover:border-[#635BFF] transition-colors cursor-pointer bg-white"
                  >
                    <span className="text-[#29343D]">{tipType}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#98A4AE] transition-transform duration-200 ${tipTypeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {tipTypeOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                      {DISCOUNT_TYPES.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setTipType(t);
                            setTipTypeOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                            tipType === t
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
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
                />
              </div>
            </div>

            {/* Total Tip */}
            <p className="text-sm font-semibold bg-[#ECFDFD] w-fit text-[#16CDC7] leading-6 px-3 py-1 rounded-2xl">
              Total Tip: € {totalTip}
            </p>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
