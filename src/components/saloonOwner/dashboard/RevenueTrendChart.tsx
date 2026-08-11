"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import ExportReportModal from "./ExportReportModal";

export default function RevenueTrendChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [32, 35, 38, 38, 32, 33, 35, 41, 38, 45, 50, 55],
  };

  const revenueData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Revenue",
        data: chartData.data,
        borderColor: "#2DD4BF",
        backgroundColor: "rgba(45, 212, 191, 0.0)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#2DD4BF",
        fill: false,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#FFFFFF",
        titleColor: "#1E293B",
        bodyColor: "#1E293B",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => `Revenue: € ${context.raw}K`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } }
      },
      y: {
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { size: 10, family: "'Manrope', sans-serif" },
          stepSize: 10,
          callback: (value: any) => value + "K"
        },
        min: 20,
        max: 70,
      },
    },
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const availablePeriods = ["Monthly", "Weekly", "Yearly"];

  return (
    <div className="flex-1 w-full bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-start mb-6">
        <div>
          <h2 className="text-[16px] font-bold text-[#1E293B]">Revenue Trend</h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Last 12 Months</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
            >
              {selectedPeriod} <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-24 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
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

          <button
            onClick={handleExport}
            className="px-4 py-1.5 border border-[#635BFF] text-[#635BFF] rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>
      <div className="h-[250px] relative mt-4">
        <Line data={revenueData} options={revenueOptions as any} />
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
