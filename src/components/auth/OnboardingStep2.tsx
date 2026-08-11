"use client";

import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function OnboardingStep2({ onNext, onBack, updateData, data }: Props) {
  const categories = ["Salon", "Barbershop", "Clinic / Medical", "Spa / Wellness", "Other"];
  const [selected, setSelected] = useState(data.businessType || "");

  const handleContinue = () => {
    if (selected) {
      updateData({ businessType: selected });
      onNext();
    }
  };

  return (
    <OnboardingLayout step={2} totalSteps={6}>
      <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
        What best describes your business?
      </h2>
      <p className="text-[#64748B] mt-2 mb-8 font-manrope">
        This helps us tailor the experience to your business needs.
      </p>

      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold text-[#1E293B] mb-4 font-manrope">Select one option to continue</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-6 py-3 rounded-lg border font-semibold text-sm transition-all font-manrope ${selected === cat
                    ? "bg-[#635BFF] text-white border-[#635BFF] shadow-lg shadow-[#635BFF]/20"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#635BFF] hover:text-[#635BFF]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-8 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-gray-50 transition-all font-manrope"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="px-8 py-2.5 bg-[#635BFF] text-white rounded-lg font-semibold text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 disabled:opacity-50 disabled:cursor-not-allowed font-manrope"
          >
            Continue
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
