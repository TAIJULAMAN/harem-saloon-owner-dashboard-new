import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AnalyticsMetric } from "../../data";

interface MetricCardProps {
  metric: AnalyticsMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isUp = metric.trend === "up";

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col justify-between h-[120px]">
      <h3 className="text-[12px] font-bold text-[#64748B]">{metric.title}</h3>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-[#1E293B] mb-2">{metric.value}</div>
          <div className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isUp ? 'bg-pink-100 text-pink-500' : 'bg-red-100 text-red-500'}`}>
              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            </div>
            <span className="text-[12px] font-bold text-[#94A3B8]">{metric.change}</span>
          </div>
        </div>

        {/* Mini Bar Chart */}
        <div className="flex items-end gap-1.5 h-12">
          {metric.chartData.map((val, idx) => {
            const isHighlight = idx === 3; // Hardcode highlight for visual match, or calculate max
            return (
              <div
                key={idx}
                className={`w-2.5 rounded-lg ${isHighlight ? 'bg-[#06B6D4]' : 'bg-[#E0F2FE]'}`}
                style={{ height: `${val}%` }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
