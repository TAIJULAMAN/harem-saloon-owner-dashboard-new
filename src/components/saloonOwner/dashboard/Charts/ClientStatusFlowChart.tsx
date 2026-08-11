"use client";

import React from "react";
import { Info, Users, Repeat, Star, UserMinus } from "lucide-react";

export default function ClientStatusFlowChart() {
  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Client Status Flow
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Focus on the drop-off between New and Returning. A follow-up text can save 20% of churned clients.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Journey of 1,000 newly acquired clients over 6 months</p>
        </div>
      </div>

      <div className="flex-1 w-full relative my-4 flex items-center justify-center min-h-[250px]">
        {/* Custom Flow Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl mx-auto gap-4 md:gap-0">
          
          {/* Node 1: New Clients */}
          <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
            <div className="w-full md:w-32 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-[#635BFF]" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">New Clients</span>
              <span className="text-[18px] font-extrabold text-[#635BFF] mt-1">1,000</span>
            </div>
            
            {/* Split Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 -right-16 w-16 h-[2px] bg-gray-200"></div>
            <div className="hidden md:block absolute top-[10px] -right-16 w-[2px] h-[calc(50%+40px)] bg-gray-200"></div>
            <div className="hidden md:block absolute bottom-[10px] -right-16 w-[2px] h-[calc(50%+40px)] bg-gray-200"></div>
          </div>

          <div className="md:hidden h-8 w-[2px] bg-gray-200"></div>

          {/* Node 2: The Split (Returning vs Churned) */}
          <div className="flex flex-col gap-8 w-full md:w-auto relative z-10">
            {/* Returning */}
            <div className="w-full md:w-32 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center text-center shadow-sm relative">
               {/* Line from New Clients to Returning */}
              <div className="hidden md:block absolute top-1/2 -left-16 w-16 h-[2px] bg-gray-200"></div>
              
              <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center mb-2">
                <Repeat className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Returning</span>
              <span className="text-[18px] font-extrabold text-[#10B981] mt-1">650</span>
              <div className="text-[11px] font-medium text-[#94A3B8] mt-1">65% Retained</div>

              {/* Line to VIP */}
              <div className="hidden md:block absolute top-1/2 -right-16 w-16 h-[2px] bg-gray-200"></div>
            </div>

            {/* Churned */}
            <div className="w-full md:w-32 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center text-center shadow-sm relative opacity-70">
              {/* Line from New Clients to Churned */}
              <div className="hidden md:block absolute top-1/2 -left-16 w-16 h-[2px] bg-gray-200"></div>

              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-2">
                <UserMinus className="w-5 h-5 text-[#EF4444]" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Churned</span>
              <span className="text-[18px] font-extrabold text-[#EF4444] mt-1">350</span>
              <div className="text-[11px] font-medium text-[#94A3B8] mt-1">35% Drop-off</div>
            </div>
          </div>

          <div className="md:hidden h-8 w-[2px] bg-gray-200"></div>

          {/* Node 3: VIP */}
          <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
            <div className="w-full md:w-32 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center text-center shadow-sm relative">
              {/* Line from Returning to VIP */}
              <div className="hidden md:block absolute top-1/2 -left-16 w-16 h-[2px] bg-gray-200"></div>

              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">VIP Status</span>
              <span className="text-[18px] font-extrabold text-[#F59E0B] mt-1">120</span>
              <div className="text-[11px] font-medium text-[#94A3B8] mt-1">12% of Total</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
