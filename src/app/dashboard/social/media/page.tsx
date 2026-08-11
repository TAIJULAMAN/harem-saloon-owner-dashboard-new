import MediaManagement from "@/components/saloonOwner/social/media/MediaManagement";
import React from "react";
import { socialStatCardsData } from "./analyticsData";
import TrafficSourcesChart from "@/components/saloonOwner/dashboard/Charts/TrafficSourcesChart";
import PostPerformanceChart from "@/components/saloonOwner/dashboard/Charts/PostPerformanceChart";

export default function MediaPage() {
  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Analytics Overview Section */}
      <div className="mb-2 mt-2">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {socialStatCardsData.map((card) => (
            <div key={card.id} className={`p-6 rounded-lg border border-[#E2E8F0] shadow-sm relative overflow-hidden ${card.cardStyle}`}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBgColor} ${card.iconShadowColor}`}>
                  {card.icon}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#64748B] text-[13px] font-semibold mb-1">{card.title}</h3>
                <div className="flex items-end gap-3">
                  <span className="text-[#1E293B] text-[24px] font-bold">{card.value}</span>
                </div>
                {card.change && (
                  <div className="text-[11px] font-bold text-[#10B981] mt-2">
                    {card.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-8">
          <TrafficSourcesChart />
          <PostPerformanceChart />
        </div>
      </div>

      <MediaManagement />
    </div>
  );
}
