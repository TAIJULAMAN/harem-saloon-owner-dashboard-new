"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Grid } from "lucide-react";

export default function ViewGiftCardPage() {
  const params = useParams();
  const id = params.id as string;
  // const cardId = params.cardId as string;

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-24 animate-in fade-in duration-300">

      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/clients/${id}`}
            className="text-[#635BFF] hover:bg-[#EEF2FF] transition-colors p-1 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[1.05rem] font-bold text-[#1E293B] font-manrope">View Gift Card</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 border border-[#E2E8F0] rounded-lg">
            <Grid className="w-4 h-4 text-[#94A3B8]" />
          </div>
          <span className="text-[#94A3B8] font-bold">/</span>
          <div className="bg-[#EEF2FF] text-[#635BFF] px-3 py-1.5 rounded-lg text-[12px] font-bold">Clients</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Read-only Details Panel */}
        <div className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-8">
          <h2 className="text-[16px] font-bold text-[#1E293B] mb-8">Gift Card Details</h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">How many gift cards do you want to create?</p>
                <p className="text-[14px] font-bold text-[#1E293B]">1</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Amount</p>
                <div className="flex items-center gap-3">
                  <p className="text-[14px] font-bold text-[#1E293B]">€ 200</p>
                  <span className="text-[10px] font-bold text-[#F43F5E] bg-[#FFE4E6] px-2 py-0.5 rounded border border-[#F43F5E]/20">Hidden</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Salon Name</p>
                <p className="text-[14px] font-bold text-[#1E293B]">CEU HAREM ACCONCIATURE</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Website</p>
                <p className="text-[14px] font-bold text-[#1E293B]">www.degradepartenassafra.it</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Address</p>
              <p className="text-[14px] font-bold text-[#1E293B]">Via Rodipuglia 44/A - MASSAFRA (TA)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Date of issue</p>
                <p className="text-[14px] font-bold text-[#1E293B]">02/09/2025</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Date of Expiration</p>
                <p className="text-[14px] font-bold text-[#1E293B]">02/20/2025</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Usage Limit</p>
              <p className="text-[14px] font-bold text-[#1E293B]">1</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#94A3B8] mb-2">Eligible Services</p>
              <div className="flex flex-wrap gap-2">
                {['Haircut', 'Haircut', 'Haircut', 'Haircut'].map((service, i) => (
                  <span key={i} className="bg-[#EEF2FF] text-[#635BFF] text-[12px] font-medium px-3 py-1.5 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Receiver Name</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Receiver Name</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Gifter Name</p>
                <p className="text-[14px] font-bold text-[#1E293B]">Gifter Name</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#94A3B8] mb-1">Message</p>
              <p className="text-[13px] text-[#334155] leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>

        {/* Static Preview Panel */}
        <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 sticky top-6">
          <h2 className="text-[14px] font-bold text-[#1E293B] mb-6">Preview</h2>

          <div className="space-y-6">
            {/* Front of Card */}
            <img src="/images/gift-card-blue-empty.png" alt="Gift Card Preview" className="w-full h-auto rounded-lg shadow-lg object-contain" />

            {/* Back of Card */}
            <img src="/boucher/giftCard.png" alt="Gift Card Preview" className="w-full h-auto rounded-lg shadow-lg object-contain" />
          </div>

        </div>

      </div>
    </div>
  );
}
