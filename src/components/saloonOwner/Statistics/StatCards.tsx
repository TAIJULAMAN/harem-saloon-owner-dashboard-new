import React from "react";
import { statCardsDemoData } from "@/data/dashboard";

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCardsDemoData.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.cardStyle} p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between min-h-[140px]`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${stat.iconBgColor} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <span className="font-semibold text-sm text-[#1E293B]">
              {stat.title}
            </span>
          </div>

          <div className="mt-4">
            <div className="text-[28px] font-bold text-[#1E293B]">
              {stat.value}
            </div>
            {stat.change && (
              <div className="text-[11px] font-semibold text-[#64748B] mt-1">{stat.change}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
