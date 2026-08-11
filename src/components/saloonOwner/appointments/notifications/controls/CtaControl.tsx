"use client";

import React from "react";

interface CtaControlProps {
  ctaActive: boolean;
  setCtaActive: (val: boolean) => void;
  ctaText: string;
  setCtaText: (val: string) => void;
}

export default function CtaControl({
  ctaActive,
  setCtaActive,
  ctaText,
  setCtaText,
}: CtaControlProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-[#475569]">
          Call To Action Button Content *
        </span>
        <button
          onClick={() => setCtaActive(!ctaActive)}
          className={`w-11 h-6 rounded-lg p-0.5 transition-colors focus:outline-none flex items-center ${
            ctaActive ? "bg-[#E0E7FF]" : "bg-[#E2E8F0]"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-[6px] transition-transform duration-200 ${
              ctaActive
                ? "bg-[#635BFF] translate-x-5"
                : "bg-[#94A3B8] translate-x-0"
            }`}
          />
        </button>
      </div>

      <input
        type="text"
        disabled={!ctaActive}
        value={ctaText}
        onChange={(e) => setCtaText(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] disabled:bg-[#F8FAFC] disabled:opacity-50 text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
      />
    </div>
  );
}
