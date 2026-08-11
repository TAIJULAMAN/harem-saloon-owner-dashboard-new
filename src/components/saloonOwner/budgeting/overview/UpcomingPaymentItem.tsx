import React from "react";
import { Eye, Check, Bell } from "lucide-react";

export function UpcomingPaymentItem({ company, category, amount, date }: any) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-2 group gap-3 sm:gap-0 border-b sm:border-b-0 border-[#E2E8F0] last:border-b-0">

      {/* Left Section: Company Info */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-0.5 h-10 bg-[#FBBF24] rounded-full hidden sm:block"></div>
        <div className="w-10 h-10 bg-[#FFFBEB] text-[#FBBF24] rounded-full flex shrink-0 items-center justify-center">
          <Bell className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-[14px] text-[#1E293B]">{company}</div>
          <div className="text-[12px] font-medium text-[#64748B]">{category}</div>
        </div>
      </div>

      {/* Right Section: Amount, Date, Actions */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pl-[52px] sm:pl-0">

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="bg-[#FFF1F2] text-[#FB7185] px-2 py-1 rounded-lg text-[11px] font-bold shrink-0">
            {amount}
          </div>
          <div className="text-[12px] font-medium text-[#64748B] shrink-0">
            {date}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button className="w-9 h-9 rounded-lg bg-[#F4F5FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E5E7FF] transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#F0FAFB] text-[#13D0B4] flex items-center justify-center hover:bg-[#D4F4F1] transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
