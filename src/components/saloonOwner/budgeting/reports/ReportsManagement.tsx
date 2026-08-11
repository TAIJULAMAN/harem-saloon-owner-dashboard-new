"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { DownloadIcon } from "../overview/DownloadIcon";
import { SpendingTrendsChart } from "./charts/SpendingTrendsChart";
import { MacroCategoriesChart } from "./charts/MacroCategoriesChart";
import { CategoriesChart } from "./charts/CategoriesChart";
import { SupplierChart } from "./charts/SupplierChart";

export function ReportsManagement() {
  const handleExport = () => {
    const content = "PDF Export\n\nReports and Statistics Data";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports_and_statistics.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-lg shrink-0">
        <h1 className="text-[16px] sm:text-[18px] font-bold text-[#1E293B]">Reports and Statistics</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#EEF2FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#E0E7FF] transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-6">
        {/* Top Row: Spending Trends */}
        <div className="w-full">
          <SpendingTrendsChart />
        </div>

        {/* Middle Row: Donut and Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
          <div className="w-full">
            <MacroCategoriesChart />
          </div>
          <div className="w-full">
            <CategoriesChart />
          </div>
        </div>

        {/* Bottom Row: Supplier Chart */}
        <div className="w-full">
          <SupplierChart />
        </div>
      </div>
    </div>
  );
}
