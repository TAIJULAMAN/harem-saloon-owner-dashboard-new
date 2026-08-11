"use client";

import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { ChevronDown, Info } from "lucide-react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const demoDataByPlatform = {
  "Instagram": {
    datasets: [
      {
        label: 'High Engagement (>5%)',
        data: [
          { x: 9, y: 450 }, { x: 12, y: 620 }, { x: 18, y: 850 }, { x: 19, y: 920 }, { x: 20, y: 780 }
        ],
        backgroundColor: '#635BFF',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Low Engagement (<5%)',
        data: [
          { x: 6, y: 120 }, { x: 8, y: 200 }, { x: 14, y: 250 }, { x: 15, y: 180 }, { x: 23, y: 150 }
        ],
        backgroundColor: '#CBD5E1',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ],
  },
  "Facebook": {
    datasets: [
      {
        label: 'High Engagement (>5%)',
        data: [
          { x: 10, y: 350 }, { x: 11, y: 420 }, { x: 16, y: 550 }, { x: 17, y: 620 }
        ],
        backgroundColor: '#3B82F6',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        label: 'Low Engagement (<5%)',
        data: [
          { x: 7, y: 90 }, { x: 13, y: 150 }, { x: 21, y: 120 }
        ],
        backgroundColor: '#CBD5E1',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ],
  }
};

export default function PostPerformanceChart() {
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chartData = demoDataByPlatform[selectedPlatform as keyof typeof demoDataByPlatform] || demoDataByPlatform["Instagram"];

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
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const time = context.raw.x;
            const formattedTime = time > 12 ? `${time - 12} PM` : (time === 12 ? "12 PM" : `${time} AM`);
            return ` ${formattedTime} - ${context.raw.y} Interactions`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day (24h)',
          color: '#94A3B8',
          font: { family: "'Manrope', sans-serif", size: 11 }
        },
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } },
        min: 6,
        max: 24,
      },
      y: {
        title: {
          display: true,
          text: 'Total Interactions',
          color: '#94A3B8',
          font: { family: "'Manrope', sans-serif", size: 11 }
        },
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } },
        beginAtZero: true
      },
    },
  };

  const availablePlatforms = ["Instagram", "Facebook"];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Post Performance by Time
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Cluster your social media posts around the times with the highest interaction dots.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Interactions plotted against hour of the day</p>
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
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
}
