"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Hourglass, Clock } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OnlinePayment() {
  const chartData = {
    labels: ["To Confirm", "Overdue"],
    datasets: [
      {
        data: [4, 4],
        backgroundColor: ["#635BFF", "#F43F5E"],
        borderWidth: 0,
        cutout: "85%",
        circumference: 180,
        rotation: 270,
        borderRadius: 30, // makes the ends rounded
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E293B",
        titleFont: { size: 13, family: "'Manrope', sans-serif" },
        bodyFont: { size: 12, family: "'Manrope', sans-serif" },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[16px] font-bold text-[#1E293B]">Online Payment</h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Last check on 25 february</p>
        </div>
        <button className="px-4 py-1.5 border border-[#635BFF] text-[#635BFF] rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors">
          View Payments
        </button>
      </div>

      {/* Chart Section */}
      <div className="relative flex-1 flex flex-col items-center justify-end mb-8">
        <div className="w-[240px] h-[120px] relative">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center justify-end text-center pb-2">
            <span className="text-[40px] font-bold text-[#1E293B] leading-none mb-1">8</span>
            <span className="text-[12px] font-medium text-[#94A3B8]">Payment management</span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-center gap-8 mt-4">

        {/* To Confirm */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#E0E7FF] flex items-center justify-center">
            <Hourglass className="w-5 h-5 text-[#635BFF]" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#1E293B]">4 payments</div>
            <div className="text-[12px] font-medium text-[#94A3B8]">To Confirm</div>
          </div>
        </div>

        {/* Overdue */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#FFE4E6] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#F43F5E]" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#1E293B]">4 payments</div>
            <div className="text-[12px] font-medium text-[#94A3B8]">Overdue</div>
          </div>
        </div>

      </div>
    </div>
  );
}
