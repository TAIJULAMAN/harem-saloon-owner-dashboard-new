import React from "react";

export function ReportItem({ icon, iconBg, title, currAmount, prevAmount }: any) {
  return (
    <div className="flex items-center border border-[#E2E8F0] p-4 rounded-lg">
      <div className="flex items-center gap-4 flex-1">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="font-bold text-sm">{title}</div>
      </div>
      <div className="w-32 text-right text-sm font-bold text-[#64748B] shrink-0">{currAmount}</div>
      <div className="w-32 text-right text-sm font-bold text-[#64748B] shrink-0">{prevAmount}</div>
    </div>
  );
}
