"use client";

import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronDown, Info } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const demoDataByComparison = {
  "Top Stylists": {
    labels: ["Speed", "Client Retention", "Upselling", "Retail Sales", "Punctuality", "Client Satisfaction"],
    datasets: [
      {
        label: "Sarah J.",
        data: [90, 85, 95, 80, 70, 95],
        backgroundColor: "rgba(99, 91, 255, 0.2)",
        borderColor: "#635BFF",
        pointBackgroundColor: "#635BFF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#635BFF",
        borderWidth: 2,
      },
      {
        label: "Michael T.",
        data: [75, 90, 70, 85, 95, 85],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10B981",
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10B981",
        borderWidth: 2,
      }
    ],
  },
  "Locations": {
    labels: ["Speed", "Client Retention", "Upselling", "Retail Sales", "Punctuality", "Client Satisfaction"],
    datasets: [
      {
        label: "Downtown Branch",
        data: [85, 80, 90, 75, 85, 90],
        backgroundColor: "rgba(99, 91, 255, 0.2)",
        borderColor: "#635BFF",
        pointBackgroundColor: "#635BFF",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#635BFF",
        borderWidth: 2,
      },
      {
        label: "Uptown Branch",
        data: [80, 85, 75, 90, 80, 85],
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        borderColor: "#EC4899",
        pointBackgroundColor: "#EC4899",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#EC4899",
        borderWidth: 2,
      }
    ],
  }
};

export default function PerformanceRadarChart() {
  const [selectedComparison, setSelectedComparison] = useState("Top Stylists");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByComparison[selectedComparison as keyof typeof demoDataByComparison] || demoDataByComparison["Top Stylists"];

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
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: {
          font: { family: "'Manrope', sans-serif", size: 10, weight: 'bold' as const },
          color: '#64748B'
        },
        ticks: { display: false, min: 0, max: 100 }
      }
    }
  };

  const availableComparisons = ["Top Stylists", "Locations"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Performance by Category
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Identify skill gaps. If a top stylist is low on upselling, provide retail training.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Comparing metrics across staff or locations</p>
        </div>
        
        <div className="relative w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
          >
            {selectedComparison} <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 left-0 sm:left-auto top-full mt-2 w-full sm:w-32 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
              {availableComparisons.map(comparison => (
                <button
                  key={comparison}
                  onClick={() => {
                    setSelectedComparison(comparison);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[12px] hover:bg-[#F8FAFC] transition-colors ${selectedComparison === comparison ? 'text-[#635BFF] font-bold' : 'text-[#64748B] font-medium'}`}
                >
                  {comparison}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full relative my-4 flex items-center justify-center">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
