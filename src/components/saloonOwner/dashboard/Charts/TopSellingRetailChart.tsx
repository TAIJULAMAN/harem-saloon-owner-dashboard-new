"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, Info } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const demoDataByPeriod = {
  "This Month": {
    labels: ["Curology Face Wash", "Keratin Shampoo", "Argan Oil Serum", "Volumizing Spray", "Heat Protectant"],
    datasets: [
      {
        label: "Units Sold",
        data: [120, 95, 80, 65, 40],
        backgroundColor: "#635BFF",
        borderRadius: 4,
        barPercentage: 0.5,
      }
    ],
  },
  "Last Month": {
    labels: ["Curology Face Wash", "Keratin Shampoo", "Argan Oil Serum", "Volumizing Spray", "Heat Protectant"],
    datasets: [
      {
        label: "Units Sold",
        data: [100, 110, 75, 50, 45],
        backgroundColor: "#635BFF",
        borderRadius: 4,
        barPercentage: 0.5,
      }
    ],
  }
};

export default function TopSellingRetailChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPeriod[selectedPeriod as keyof typeof demoDataByPeriod] || demoDataByPeriod["This Month"];

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#1E293B", font: { size: 11, fontStyle: 'bold', family: "'Manrope', sans-serif" } },
      },
    },
  };

  const availablePeriods = ["This Month", "Last Month"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Top Selling Retail Products
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Ensure high-volume products are well-stocked. Use this data for brand negotiations.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Highest converting retail items by volume</p>
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

      <div className="flex-1 min-h-[250px] w-full relative my-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
