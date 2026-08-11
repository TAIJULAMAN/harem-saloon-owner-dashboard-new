"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, LayoutPanelLeft, UploadCloud, Check, ChevronDown, Monitor, Ban, Settings, MousePointerClick } from "lucide-react";
import LogoIcon from "@/components/svg/LogoIcon";

export default function AddGiftCardPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedLogo, setSelectedLogo] = useState(2); // Main Logo
  const [hideAmount, setHideAmount] = useState(false);
  const [amount, setAmount] = useState("");
  const [numCards, setNumCards] = useState("1");

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0 pb-24 animate-in fade-in duration-300">

      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/clients/${id}`}
            className="text-[#635BFF] hover:bg-[#EEF2FF] transition-colors p-1 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[1.05rem] font-bold text-[#1E293B] font-manrope">Add Gift Card</h1>
        </div>

        <div className="flex items-center gap-2">
          <LayoutPanelLeft className="w-5 h-5 text-[#94A3B8]" />
          <span className="text-[#94A3B8] font-bold mx-1">/</span>
          <div className="bg-[#EEF2FF] text-[#635BFF] px-4 py-1.5 rounded-lg text-[13px] font-bold">Clients</div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-8 animate-in slide-in-from-right-4 duration-300">
          <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Basic Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">How many gift cards do you want to create? *</label>
              <input
                type="number"
                value={numCards}
                onChange={(e) => setNumCards(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm transition-colors"
              />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-2">
                <label className="block text-[13px] font-bold text-[#1E293B]">Amount *</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={hideAmount}
                    onClick={() => setHideAmount(!hideAmount)}
                    className={`relative inline-flex h-[24px] w-[40px] items-center rounded-[6px] transition-colors duration-200 ease-in-out focus:outline-none ${hideAmount ? 'bg-[#635BFF]' : 'bg-[#E2E8F0]'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`inline-block h-[18px] w-[18px] transform rounded-[4px] bg-white shadow-sm transition duration-200 ease-in-out ${hideAmount ? 'translate-x-[19px]' : 'translate-x-[3px]'}`}
                    />
                  </button>
                  <span className="text-[14px] text-[#475569] font-medium">Hide amount</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={hideAmount}
                  className={`flex-1 border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-[#635BFF] shadow-sm transition-colors ${hideAmount ? 'bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed' : 'text-[#1E293B]'}`}
                />
                <div className="relative w-[5.5rem] flex-shrink-0">
                  <select
                    className="w-full appearance-none border border-[#E2E8F0] rounded-lg pl-4 pr-8 py-3 text-[14px] font-bold text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm bg-white cursor-pointer h-full"
                    defaultValue="EUR"
                  >
                    <option value="EUR">€ EUR</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Select Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Template 1 */}
            <div
              onClick={() => setSelectedTemplate(1)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === 1 ? 'border-[#635BFF] shadow-sm' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
            >
              <img src="/cards/c1.png" alt="Gift Card Template" className="w-full h-auto rounded-lg drop-shadow-md mb-4 object-contain" />
              <h3 className="text-[15px] font-bold text-[#1E293B] mb-2">Template Name</h3>
              <p className="text-[13px] text-[#94A3B8] font-medium leading-relaxed">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>

            {/* Template 2 */}
            <div
              onClick={() => setSelectedTemplate(2)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === 2 ? 'border-[#635BFF] shadow-sm' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'}`}
            >
              <img src="/cards/c3.png" alt="Gift Card Template" className="w-full h-auto rounded-lg drop-shadow-md mb-4 object-contain" />
              <h3 className="text-[15px] font-bold text-[#1E293B] mb-2">Template Name</h3>
              <p className="text-[13px] text-[#94A3B8] font-medium leading-relaxed">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>

            {/* Custom Upload */}
            <div className="border border-dashed border-[#635BFF] rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer group h-full min-h-[300px]">
              <div className="w-16 h-16 rounded-lg bg-[#EEF2FF] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <MousePointerClick className="w-8 h-8 text-[#635BFF]" />
              </div>
              <span className="text-[14px] font-bold text-[#635BFF]">Upload Custom Gift Card</span>
            </div>

          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setStep(2)}
            className="bg-[#635BFF] hover:bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg text-[14px] font-bold transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">

          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-8">
            <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Logo and Branding</h2>

            <label className="block text-[13px] font-bold text-[#1E293B] mb-4">Choose Logo</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { id: 1, label: "No logo", icon: <Ban className="w-6 h-6 mb-2 text-[#635BFF]" /> },
                { id: 2, label: "Main Logo", icon: <div className="w-6 h-6 mb-2 bg-[#635BFF] rounded-lg text-white flex items-center justify-center font-bold text-[10px]">M</div> },
                { id: 3, label: "Alternative Logo", icon: <div className="w-6 h-6 mb-2 bg-[#1E293B] rounded-lg text-white flex items-center justify-center font-bold text-[10px]">A</div> },
                { id: 4, label: "Minimal Logo", icon: <div className="w-6 h-6 mb-2 bg-[#635BFF] rounded-full text-white flex items-center justify-center font-bold text-[10px]">M</div> },
              ].map((logo) => (
                <div
                  key={logo.id}
                  onClick={() => setSelectedLogo(logo.id)}
                  className={`border rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-24 ${selectedLogo === logo.id ? 'border-[#635BFF] bg-[#F8F6FF]' : 'border-[#F1F5F9] bg-[#F8FAFC] hover:border-[#CBD5E1]'}`}
                >
                  <LogoIcon />
                  <span className={`text-[12px] font-bold ${selectedLogo === logo.id ? 'text-[#635BFF]' : 'text-[#64748B]'}`}>{logo.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="block text-[13px] font-bold text-[#1E293B]">Template Colors</label>
              <button className="flex items-center justify-center gap-2 bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2 rounded-lg text-[12px] font-bold transition-colors w-full sm:w-auto">
                <Settings className="w-4 h-4" />
                Customize Logo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-8">
              <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Gift Card Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Salon Name *</label>
                  <input type="text" placeholder="Enter salon name" defaultValue="CEU HAREM ACCONCIATURE" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Website *</label>
                  <input type="text" placeholder="Enter website" defaultValue="www.degradepartenassafra.it" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Address *</label>
                <input type="text" placeholder="Enter address" defaultValue="Via Rodipuglia 44/A - MASSAFRA (TA)" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Date of Issue *</label>
                  <input type="text" placeholder="Enter date" defaultValue="02/09/2025" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Date of Expiration *</label>
                  <input type="text" placeholder="Enter date" defaultValue="02/20/2025" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Usage Limit *</label>
                  <input type="text" placeholder="Enter limit" defaultValue="1" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Eligible Services *</label>
                  <div className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer bg-[#F8FAFC]">
                    <span className="text-[14px] text-[#1E293B]">All Services</span>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Receiver Name *</label>
                  <input type="text" placeholder="Enter receiver name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Gifter Name (optional)</label>
                  <input type="text" placeholder="Enter gifter name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Personal Message (Optional)</label>
                <textarea rows={4} placeholder="Enter a description" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] shadow-sm resize-none"></textarea>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <button
                  onClick={() => setStep(1)}
                  className="text-[#64748B] hover:text-[#1E293B] font-bold text-[14px] transition-colors w-full sm:w-auto py-2.5 sm:py-0"
                >
                  Back
                </button>
                <button
                  onClick={() => router.push(`/dashboard/clients/${id}`)}
                  className="bg-[#635BFF] hover:bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg text-[14px] font-bold transition-colors shadow-sm w-full sm:w-auto"
                >
                  Save & Create
                </button>
              </div>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6 sticky top-6">
              <h2 className="text-[14px] font-bold text-[#1E293B] mb-6">Live Preview</h2>

              <div className="space-y-6">
                {/* Front of Card */}
                <img src="/images/gift-card-blue-empty.png" alt="Gift Card Preview" className="w-full h-auto rounded-lg shadow-lg object-contain" />
                <img src="/boucher/giftCard.png" alt="Gift Card Preview" className="w-full h-auto rounded-lg shadow-lg object-contain" />

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
