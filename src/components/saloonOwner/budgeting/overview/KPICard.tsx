import React from "react";

export function KPICard({ title, value, trend, icon, bgColor, iconBg }: any) {
  return (
    <div className={`${bgColor} rounded-lg p-5 flex flex-col h-full gap-4 shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div className="text-[13px] font-semibold text-[#1E293B] leading-tight">
          {title}
        </div>
      </div>
      <div>
        <div className="text-[28px] font-bold text-[#1E293B] mb-1 leading-none">{value}</div>
        <div className="text-[13px] font-medium text-[#64748B] flex items-center gap-1">
          {trend}
        </div>
      </div>
    </div>
  );
}
