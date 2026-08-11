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

const demoDataByPlatform = {
  "All Platforms": {
    labels: ["Impressions", "Profile Views", "Link Clicks", "Appointments Booked"],
    datasets: [
      {
        label: "Funnel Volume",
        data: [15000, 4500, 850, 120],
        backgroundColor: [
          "#635BFF",
          "#8B5CF6",
          "#A78BFA",
          "#C4B5FD",
        ],
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ],
  },
  "Instagram": {
    labels: ["Impressions", "Profile Views", "Link Clicks", "Appointments Booked"],
    datasets: [
      {
        label: "Funnel Volume",
        data: [9000, 3000, 600, 95],
        backgroundColor: [
          "#EC4899",
          "#F472B6",
          "#F9A8D4",
          "#FBCFE8",
        ],
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ],
  }
};

export default function TrafficSourcesChart() {
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPlatform[selectedPlatform as keyof typeof demoDataByPlatform] || demoDataByPlatform["All Platforms"];

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return ` ${context.raw.toLocaleString()} Users`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#1E293B", font: { size: 11, fontStyle: 'bold', family: "'Manrope', sans-serif" } },
      },
    },
  };

  const availablePlatforms = ["All Platforms", "Instagram"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Traffic Sources Funnel
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Identify where you lose the most users. High impressions but low profile views? Improve post captions.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">From post view to confirmed appointment</p>
        </div>
        
        <div className="relative w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          >
            {selectedPlatform} <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-32 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
              {availablePlatforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => {
                    setSelectedPlatform(platform);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[12px] hover:bg-[#F8FAFC] transition-colors ${selectedPlatform === platform ? 'text-[#635BFF] font-bold' : 'text-[#64748B] font-medium'}`}
                >
                  {platform}
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
