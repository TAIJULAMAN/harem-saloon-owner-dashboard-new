"use client";

import React, { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import ExportReportModal from "./ExportReportModal";

export default function AppointmentsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { completedData, cancelledData } = useMemo(() => {
    return {
      completedData: [70, 56, 80, 58, 28, 28, 28, 28, 28, 28, 28, 28],
      cancelledData: [28, 36, 48, 26, 48, 48, 48, 48, 48, 48, 48, 48],
    };
  }, []);

  const appointmentsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Completed",
        data: completedData,
        backgroundColor: "#635BFF",
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
      {
        label: "Cancelled",
        data: cancelledData,
        backgroundColor: "#F43F5E",
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  const appointmentsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" } }
      },
      y: {
        grid: { color: "#F1F5F9" },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { size: 10, family: "'Manrope', sans-serif" }, stepSize: 20 },
        min: 0,
        max: 100
      },
    },
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const availablePeriods = ["Monthly", "Weekly", "Yearly"];

  return (
    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-start mb-6">
        <div>
          <h2 className="text-[16px] font-bold text-[#1E293B]">Appointments</h2>
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

      <div className="flex-1 relative min-h-[250px]">
        <Bar data={appointmentsData} options={appointmentsOptions} />
      </div>

      <div className="flex items-center gap-6 mt-6">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#635BFF]"></div>
          Completed
        </div>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#64748B]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]"></div>
          Cancelled
        </div>
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
