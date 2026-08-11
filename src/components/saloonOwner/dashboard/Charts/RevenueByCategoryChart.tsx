"use client";

import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, Info } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const demoDataByPeriod = {
  "This Month": {
    labels: ["Haircuts", "Coloring", "Nails", "Spa & Massage", "Retail"],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          "#635BFF", // Haircuts
          "#EC4899", // Coloring
          "#2DD4BF", // Nails
          "#F59E0B", // Spa
          "#10B981", // Retail
        ],
        borderWidth: 0,
        hoverOffset: 4,
      }
    ],
  },
  "Last Month": {
    labels: ["Haircuts", "Coloring", "Nails", "Spa & Massage", "Retail"],
    datasets: [
      {
        data: [40, 20, 15, 15, 10],
        backgroundColor: [
          "#635BFF",
          "#EC4899",
          "#2DD4BF",
          "#F59E0B",
          "#10B981",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      }
    ],
  }
};

export default function RevenueByCategoryChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPeriod[selectedPeriod as keyof typeof demoDataByPeriod] || demoDataByPeriod["This Month"];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: "'Manrope', sans-serif", size: 12 },
          padding: 20,
        }
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

  const availablePeriods = ["This Month", "Last Month"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Revenue by Service Category
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Identify your most profitable segments. Consider reallocating staff to high-demand categories.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Percentage breakdown of total sales</p>
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

      <div className="flex-1 min-h-[280px] w-full relative my-4 flex items-center justify-center">
        <div className="h-[250px] w-full relative">
          <Doughnut data={chartData} options={options} />
          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pr-[120px]">
            <span className="text-[#94A3B8] text-[12px] font-medium">Total</span>
            <span className="text-[#1E293B] text-[24px] font-bold">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
