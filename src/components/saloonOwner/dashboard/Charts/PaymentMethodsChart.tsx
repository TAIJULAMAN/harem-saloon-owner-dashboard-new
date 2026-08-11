"use client";

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
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
    labels: ["Credit Card", "Cash", "Online Payment", "Gift Card"],
    datasets: [
      {
        data: [55, 20, 15, 10],
        backgroundColor: [
          "#635BFF", // Credit Card
          "#2DD4BF", // Cash
          "#F59E0B", // Online Payment
          "#EC4899", // Gift Card
        ],
        borderWidth: 0,
        hoverOffset: 4,
      }
    ],
  },
  "Last Month": {
    labels: ["Credit Card", "Cash", "Online Payment", "Gift Card"],
    datasets: [
      {
        data: [50, 25, 15, 10],
        backgroundColor: [
          "#635BFF",
          "#2DD4BF",
          "#F59E0B",
          "#EC4899",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      }
    ],
  }
};

export default function PaymentMethodsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPeriod[selectedPeriod as keyof typeof demoDataByPeriod] || demoDataByPeriod["This Month"];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
            Payment Methods
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Push online payments to reduce no-shows. If credit card share is high, renegotiate processing fees.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Transaction volume by payment type</p>
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

      <div className="flex-1 min-h-[250px] w-full relative my-4 flex items-center justify-center">
        <div className="h-[220px] w-full relative">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
