"use client";

import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function OnboardingStep4({ onNext, onBack, updateData, data }: Props) {
  const [businessDisplayName, setBusinessDisplayName] = useState(data.businessDisplayName || data.businessName || "");
  const [brandColor, setBrandColor] = useState(data.brandColor || "#7C3AED");
  const [tagline, setTagline] = useState(data.tagline || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [email, setEmail] = useState(data.email || "");

  const handleContinue = () => {
    updateData({ businessDisplayName, brandColor, tagline, phone, email });
    onNext();
  };

  return (
    <OnboardingLayout step={4} totalSteps={6}>
      <h2 className="text-[32px] font-bold text-[#1E293B] font-manrope leading-tight">
        Set up your salon branding
      </h2>
      <p className="text-[#64748B] mt-2 mb-8 font-manrope">
        Upload your logo and choose a brand color for your dashboard and client booking page.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
            Logo
          </label>
          <div className="w-full border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 flex flex-col items-center justify-center bg-[#F8FAFC]">
            <div className="w-10 h-10 bg-[#E0E7FF] rounded-full flex items-center justify-center mb-3 text-[#635BFF]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            </div>
            <p className="text-sm font-semibold text-[#635BFF] font-manrope cursor-pointer hover:underline">
              Upload salon logo
            </p>
            <p className="text-xs text-[#64748B] mt-1 font-manrope">
              Supported formats: PNG, JPG, SVG
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
              Business display name
            </label>
            <input
              type="text"
              value={businessDisplayName}
              onChange={(e) => setBusinessDisplayName(e.target.value)}
              placeholder="Bella Vista Salon"
              className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
              Tagline (Optional)
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Elevated experience"
              className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
              Phone number (Optional)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2 font-manrope">
              Contact email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@salon.com"
              className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all"
            />
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
            className="px-8 py-2.5 bg-[#635BFF] text-white rounded-lg font-semibold text-sm hover:bg-[#534dfd] transition-all shadow-lg shadow-[#635BFF]/20 font-manrope"
          >
            Continue
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
