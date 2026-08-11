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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const demoDataByPeriod = {
  "This Year": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Acquired in Jan",
        data: [100, 85, 80, 75, 70, 68],
        borderColor: "#635BFF",
        backgroundColor: "rgba(99, 91, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Acquired in Feb",
        data: [0, 110, 95, 85, 80, 75],
        borderColor: "#2DD4BF",
        backgroundColor: "rgba(45, 212, 191, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Acquired in Mar",
        data: [0, 0, 90, 80, 75, 70],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4,
      }
    ],
  },
  "Last Year": {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Acquired in Jul",
        data: [120, 105, 100, 95, 90, 85],
        borderColor: "#635BFF",
        backgroundColor: "rgba(99, 91, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Acquired in Aug",
        data: [0, 130, 115, 105, 95, 90],
        borderColor: "#2DD4BF",
        backgroundColor: "rgba(45, 212, 191, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Acquired in Sep",
        data: [0, 0, 140, 120, 110, 105],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4,
      }
    ],
  }
};

export default function ClientRetentionChart() {
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
        stacked: true,
      },
      y: {
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } },
        stacked: true,
      },
    },
  };

  const availablePeriods = ["This Year", "Last Year"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Client Retention Cohorts
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Watch if newer cohorts drop off faster than older ones. It indicates changing service quality.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Active clients grouped by acquisition month</p>
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
