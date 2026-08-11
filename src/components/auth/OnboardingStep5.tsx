"use client";

import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function OnboardingStep5({ onNext, onBack, updateData, data }: Props) {
  const [subdomain, setSubdomain] = useState(data.subdomain || "");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleCheckAvailability = () => {
    // Simulate API check
    if (subdomain.trim().length > 2) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  const handleConfirm = () => {
    if (subdomain.trim()) {
      updateData({ subdomain });
      onNext();
    }
  };

  return (
    <OnboardingLayout step={5} totalSteps={6}>
      <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
        Set up your salon website address
      </h2>
      <p className="text-[#64748B] mt-2 mb-8 font-manrope">
        Your clients will use this link to view your salon page and book appointments.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
            Choose your subdomain
          </label>
          <div className="flex gap-2 mb-2">
            <div className="flex flex-1 rounded-lg overflow-hidden border border-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#635BFF] focus-within:border-transparent transition-all">
              <input
                type="text"
                value={subdomain}
                onChange={(e) => {
                  setSubdomain(e.target.value);
                  setIsAvailable(null);
                }}
                placeholder="bellavista"
                className="w-full px-4 py-3 focus:outline-none"
              />
              <div className="bg-[#F8FAFC] px-4 py-3 border-l border-[#E2E8F0] text-[#64748B] font-medium text-sm flex items-center shrink-0">
                .platform.com
              </div>
            </div>
            <button
              onClick={handleCheckAvailability}
              className="px-6 py-3 bg-[#EEF2F6] text-[#635BFF] font-semibold text-sm rounded-lg hover:bg-[#E2E8F0] transition-all whitespace-nowrap"
            >
              Check Availability
            </button>
          </div>

          {isAvailable === true && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#10B981] font-manrope">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              This subdomain is available.
            </div>
          )}
          {isAvailable === false && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#EF4444] font-manrope">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
              This subdomain is unavailable. Please try another.
            </div>
          )}
        </div>

        <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
          <p className="text-xs text-[#64748B] font-semibold font-manrope mb-1">Your public URL will be:</p>
          <p className="text-[#635BFF] font-medium font-manrope break-all">
            https://{subdomain || "your-salon"}.platform.com
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-8 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-gray-50 transition-all font-manrope"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={!subdomain.trim() || isAvailable === false}
            className="px-8 py-2.5 bg-[#635BFF] text-white rounded-lg font-semibold text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 disabled:opacity-50 disabled:cursor-not-allowed font-manrope"
          >
            Confirm Subdomain
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
