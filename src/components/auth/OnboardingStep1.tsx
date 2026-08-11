"use client";

import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function OnboardingStep1({ onNext, onBack, updateData, data }: Props) {
  const [businessName, setBusinessName] = useState(data.businessName || "");

  const handleContinue = () => {
    if (businessName.trim()) {
      updateData({ businessName });
      onNext();
    }
  };

  return (
    <OnboardingLayout step={1} totalSteps={6}>
      <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
        What's your business name?
      </h2>
      <p className="text-[#64748B] mt-2 mb-8 font-manrope">
        Use the official name of your business. You can change this later if needed.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
            Business Name
          </label>
          <input
            type="text"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Enter your business name"
            className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-8 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-gray-50 transition-all font-manrope"
          >
            Close
          </button>
          <button
            onClick={handleContinue}
            disabled={!businessName.trim()}
            className="px-8 py-2.5 bg-[#635BFF] text-white rounded-lg font-semibold text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 disabled:opacity-50 disabled:cursor-not-allowed font-manrope"
          >
            Continue
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
