import React from "react";
import { Wallet, BriefcaseBusiness } from "lucide-react";

export function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#635BFF]/[0.13] to-[#fff]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-[#635BFF] flex items-center justify-center text-white shadow-sm">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-[12px] font-bold text-[#1E293B]">Total Money Spent</span>
        </div>
        <div className="text-[24px] font-bold text-[#1E293B]">€ 4,358</div>
      </div>

      <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#16CDC7]/[0.13] to-[#fff]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-[#2DD4BF] flex items-center justify-center text-white shadow-sm">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <span className="text-[12px] font-bold text-[#1E293B]">Average Spend Per Visit</span>
        </div>
        <div className="text-[24px] font-bold text-[#1E293B]">€ 258</div>
      </div>
    </div>
  );
}
