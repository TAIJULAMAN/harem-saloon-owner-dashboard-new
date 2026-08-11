"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { ChevronDown, Info } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const demoDataByPeriod = {
  "This Year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: [15000, 16000, 15500, 18000, 17500, 19000, 21000, 22000, 21500, 23000, 24000, 28000],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Total Expenses",
        data: [11000, 11500, 11400, 12500, 12400, 12800, 13500, 14000, 14200, 15000, 15500, 17000],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ],
  },
  "Last Year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: [12000, 13000, 14000, 15000, 16000, 15500, 17000, 18000, 17500, 19000, 20000, 25000],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Total Expenses",
        data: [9000, 9500, 9800, 10000, 10500, 10400, 10800, 11000, 11200, 11800, 12000, 14000],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ],
  }
};

export default function RevenueVsExpensesChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPeriod[selectedPeriod as keyof typeof demoDataByPeriod] || demoDataByPeriod["This Year"];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: "'Manrope', sans-serif", size: 11 }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } },
      },
      y: {
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: { 
          color: "#94A3B8", 
          font: { size: 10, family: "'Manrope', sans-serif" },
          callback: (value: any) => "€" + (value / 1000) + "k"
        },
        beginAtZero: true
      },
    },
  };

  const availablePeriods = ["This Year", "Last Year"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Revenue vs. Expenses
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Watch the gap (profit margin) between revenue and expenses over time.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Month-over-month profitability tracking</p>
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

      <div className="flex-1 min-h-[280px] w-full relative my-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
