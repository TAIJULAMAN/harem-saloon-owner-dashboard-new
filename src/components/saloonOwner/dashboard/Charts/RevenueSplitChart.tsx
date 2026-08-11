"use client";

import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChevronDown, Info } from "lucide-react";

export default function RevenueSplitChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const availablePeriods = ["This Month", "Last Month", "This Year"];

  // Mock data varying by selected period
  const dataByPeriod: Record<string, { percentages: number[], total: string }> = {
    "This Month": { percentages: [45, 20, 15, 20], total: "€ 42k" },
    "Last Month": { percentages: [40, 25, 10, 25], total: "€ 38k" },
    "This Year":  { percentages: [50, 15, 20, 15], total: "€ 480k" }
  };

  const currentData = dataByPeriod[selectedPeriod] || dataByPeriod["This Month"];

  // Chart structure
  const chartData = {
    labels: ["Hair Services", "Nail Services", "Spa & Massage", "Retail Products"],
    datasets: [
      {
        data: currentData.percentages,
        backgroundColor: [
          "#635BFF", // Deep Indigo
          "#2DD4BF", // Teal
          "#F8C209", // Yellow
          "#EC4899", // Pink
        ],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return ` ${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Revenue by Category
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl text-center z-10">
                Actionable Insight: High-performing salons aim for 20-30% retail sales. Consider training staff on upselling.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Service vs. Product breakdown</p>
        </div>
        
        <div className="relative w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          >
            {selectedPeriod} <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-32 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
              {availablePeriods.map(period => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[12px] hover:bg-[#F8FAFC] transition-colors ${selectedPeriod === period ? 'text-[#635BFF] font-bold' : 'text-[#64748B] font-medium'}`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[250px] w-full flex items-center justify-center relative my-4">
        <Doughnut data={chartData} options={options} />
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[28px] font-bold text-[#1E293B]">{currentData.total}</span>
          <span className="text-[11px] font-semibold text-[#64748B]">Total Revenue</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
        {chartData.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm shrink-0" 
              style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#64748B]">{label}</span>
              <span className="text-[13px] font-bold text-[#1E293B]">{chartData.datasets[0].data[index]}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
