"use client";

import React, { useState } from "react";
import { ChevronDown, Download, Info, Calendar } from "lucide-react";
import ExportReportModal from "../ExportReportModal";
import CustomDateRangePicker from "./CustomDateRangePicker";

export default function PeakHoursHeatmap() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const availablePeriods = ["This Week", "Last Week", "This Month"];

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  // Determine days based on selected period
  let customDaysCount = 7;
  if (selectedPeriod === "Custom" && startDate && endDate) {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      const diff = Math.abs(d2.getTime() - d1.getTime());
      customDaysCount = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    }
  }

  const currentDays = selectedPeriod === "This Month" 
    ? Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    : selectedPeriod === "Custom"
    ? Array.from({ length: Math.min(customDaysCount, 30) }, (_, i) => `Day ${i + 1}`)
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const hours = ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p"];
  
  // Hardcoded mock data mapped by period
  const dataByPeriod: Record<string, number[][]> = {
    "This Week": [
      [2, 3, 1, 4, 3, 2, 1, 1, 4, 5, 4], // Mon
      [1, 2, 1, 5, 4, 2, 1, 2, 6, 5, 4], // Tue
      [3, 2, 3, 4, 4, 3, 2, 1, 5, 4, 5], // Wed
      [2, 3, 2, 5, 5, 1, 2, 2, 6, 6, 5], // Thu
      [3, 4, 5, 6, 5, 4, 3, 2, 7, 8, 9], // Fri
      [6, 7, 8, 9, 8, 7, 6, 5, 8, 7, 8], // Sat
      [5, 6, 7, 8, 7, 6, 5, 4, 6, 5, 5], // Sun
    ],
    "Last Week": [
      [1, 2, 1, 3, 2, 1, 1, 1, 3, 4, 3], // Mon
      [1, 1, 1, 4, 3, 1, 1, 2, 5, 4, 3], // Tue
      [2, 1, 2, 3, 3, 2, 1, 1, 4, 3, 4], // Wed
      [1, 2, 1, 4, 4, 1, 1, 1, 5, 5, 4], // Thu
      [2, 3, 4, 5, 4, 3, 2, 1, 6, 7, 8], // Fri
      [5, 6, 7, 8, 7, 6, 5, 4, 7, 6, 7], // Sat
      [4, 5, 6, 7, 6, 5, 4, 3, 5, 4, 4], // Sun
    ],
    "This Month": Array.from({ length: 30 }, (_, i) => {
      // Deterministic pattern generation based on the day of the month
      const weekDayIndex = i % 7;
      const basePattern = [
        [3, 4, 2, 5, 4, 3, 2, 2, 5, 6, 5], // Mon
        [2, 3, 2, 6, 5, 3, 2, 3, 7, 6, 5], // Tue
        [4, 3, 4, 5, 5, 4, 3, 2, 6, 5, 6], // Wed
        [3, 4, 3, 6, 6, 2, 3, 3, 7, 7, 6], // Thu
        [4, 5, 6, 7, 6, 5, 4, 3, 8, 9, 10], // Fri
        [7, 8, 9, 10, 9, 8, 7, 6, 9, 8, 9], // Sat
        [6, 7, 8, 9, 8, 7, 6, 5, 7, 6, 6], // Sun
      ][weekDayIndex];
      // Add slight deterministic variation
      return basePattern.map((val, j) => Math.min(10, Math.max(0, val + ((i + j) % 3) - 1)));
    }),
    "Custom": Array.from({ length: 30 }, (_, i) => {
      const weekDayIndex = (i + 3) % 7;
      const basePattern = [
        [3, 4, 2, 5, 4, 3, 2, 2, 5, 6, 5], 
        [2, 3, 2, 6, 5, 3, 2, 3, 7, 6, 5], 
        [4, 3, 4, 5, 5, 4, 3, 2, 6, 5, 6], 
        [3, 4, 3, 6, 6, 2, 3, 3, 7, 7, 6], 
        [4, 5, 6, 7, 6, 5, 4, 3, 8, 9, 10], 
        [7, 8, 9, 10, 9, 8, 7, 6, 9, 8, 9], 
        [6, 7, 8, 9, 8, 7, 6, 5, 7, 6, 6], 
      ][weekDayIndex];
      return basePattern.map((val, j) => Math.min(10, Math.max(0, val + ((i + j) % 4) - 2)));
    })
  };

  const heatmapData = dataByPeriod[selectedPeriod] || dataByPeriod["This Week"];

  const getColor = (val: number) => {
    if (val === 0) return "bg-gray-50";
    if (val <= 3) return "bg-[#E0E7FF]";
    if (val <= 6) return "bg-[#A5B4FC]";
    if (val <= 8) return "bg-[#635BFF]/80";
    return "bg-[#635BFF]"; // Peak
  };

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Peak Hours Heatmap
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: Use this heatmap to optimize staff scheduling during dark purple blocks.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">
            Average weekly capacity for {selectedPeriod.toLowerCase()}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
            >
              <Calendar className="w-3 h-3 text-[#64748B]" />
              {selectedPeriod === "Custom" && startDate && endDate 
                ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                : selectedPeriod}
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            {isMenuOpen && (
              <div className="absolute left-0 sm:left-auto right-auto sm:right-0 top-full mt-2 w-[280px] sm:w-72 bg-white border border-[#E2E8F0] rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="border-b border-[#E2E8F0]">
                  <CustomDateRangePicker 
                    startDate={startDate}
                    endDate={endDate}
                    onRangeSelect={(start, end) => {
                      setStartDate(start);
                      setEndDate(end);
                      setSelectedPeriod("Custom");
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
                <div className="p-2 bg-gray-50 flex flex-col gap-1">
                  <div className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Quick Links</div>
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
              </div>
            )}
          </div>
          <button
            onClick={handleExport}
            className="p-1.5 border border-[#E2E8F0] text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="min-w-[450px]">
          {/* Header row (Hours) */}
          <div className="flex mb-2">
            <div className="w-8 shrink-0"></div>
            <div className="flex-1 grid grid-cols-11 gap-1">
              {hours.map(h => (
                <div key={h} className="text-center text-[10px] font-bold text-gray-400">{h}</div>
              ))}
            </div>
          </div>
          
          {/* Heatmap rows */}
          <div className={`flex flex-col gap-1 ${selectedPeriod === "This Month" || selectedPeriod === "Custom" ? "max-h-[300px] overflow-y-auto pr-2" : ""}`}>
            {currentDays.map((day, i) => (
              <div key={day} className="flex items-center">
                <div className="w-10 shrink-0 text-[10px] font-semibold text-gray-500">{day}</div>
                <div className="flex-1 grid grid-cols-11 gap-1">
                  {heatmapData[i].map((val, j) => (
                    <div 
                      key={j} 
                      className={`h-5 rounded-[4px] ${getColor(val)} transition-all hover:ring-2 hover:ring-indigo-300 cursor-pointer`}
                      title={`${day} ${hours[j]}: ${val * 10}% Capacity`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 text-[11px] font-medium text-gray-500">
        <span>Quiet</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-50 border border-gray-100"></div>
          <div className="w-3 h-3 rounded-sm bg-[#E0E7FF]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#A5B4FC]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#635BFF]/80"></div>
          <div className="w-3 h-3 rounded-sm bg-[#635BFF]"></div>
        </div>
        <span>Peak</span>
      </div>

      {isExportModalOpen && (
        <ExportReportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      )}
    </div>
  );
}
