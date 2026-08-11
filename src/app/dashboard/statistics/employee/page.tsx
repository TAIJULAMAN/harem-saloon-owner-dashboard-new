"use client";

import React, { useState } from "react";
import { ChevronDown, Download, BriefcaseBusiness, Target, Award, Wallet, DollarSign, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EmployeeStatusDashboard() {
  const [teamSelection, setTeamSelection] = useState("All Team");

  // --- Daily Production (Monthly) Bar Chart Data ---
  const dailyProductionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Above Threshold",
        data: [1200, 2500, 800, 2800, 0, 2600, 2600],
        backgroundColor: "#2DD4BF", // Teal
        borderRadius: 20,
        barPercentage: 0.2,
      },
      {
        label: "Below Threshold",
        data: [-1800, -800, -1600, -1200, -1200, -1800, -1200],
        backgroundColor: "#F43F5E", // Pink
        borderRadius: 20,
        barPercentage: 0.2,
      },
    ],
  };

  const dailyProductionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#475569",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            return `  ${context.dataset.label}: € ${Math.abs(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        stacked: true,
        min: -3000,
        max: 3000,
        ticks: {
          stepSize: 1500,
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => {
            if (value === 0) return "0";
            return `€ ${Math.abs(value / 1000)}k`;
          },
        },
        grid: { color: "#F8FAFC" },
        border: { display: false },
      },
    },
  };

  // --- Production Trends (Yearly) Line Chart Data ---
  const thresholdValue = 2000;
  const productionTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Production",
        data: [1900, 2100, 2200, 1800, 1500, 1100, 1800, 2800, 2700, 2600, 2500, 2400],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
        segment: {
          borderColor: (ctx: any) => {
            // Color segments based on threshold
            return ctx.p1.parsed.y >= thresholdValue ? "#22C55E" : "#F43F5E";
          },
        },
      },
    ],
  };

  const productionTrendsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#475569",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `  € ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 3000,
        ticks: {
          stepSize: 1000,
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => {
            if (value === 0) return "0";
            return `€ ${value / 1000}k`;
          },
        },
        grid: { color: "#F8FAFC" },
        border: { display: false },
      },
    },
  };

  // --- Payments per Year Bar Chart Data ---
  const paymentsPerYearData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Payments",
        data: [1200, 1500, 1800, 1600, 3200, 3500],
        backgroundColor: "#635BFF", // Purple
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        barPercentage: 0.6,
      },
      {
        label: "Background", // Grey background columns
        data: [4500, 4500, 4500, 4500, 4500, 4500],
        backgroundColor: "#F8FAFC",
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        grouped: false,
        barPercentage: 0.6,
        order: 2, // Draw behind
      },
    ],
  };

  const paymentsPerYearOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        filter: (tooltipItem: any) => tooltipItem.datasetIndex === 0, // Only show for the actual data
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#475569",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `  Total: € ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 4500,
        ticks: {
          stepSize: 500,
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => `€ ${value}`,
        },
        grid: { display: false }, // Hide grid completely
        border: { display: false },
      },
    },
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-[16px] p-4 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-[16px] font-bold text-[#1E293B] font-manrope ml-2">Employee Status</h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative">
              <select
                value={teamSelection}
                onChange={(e) => setTeamSelection(e.target.value)}
                className="w-full appearance-none bg-[#EEF2FF] border-none text-[#635BFF] text-[13px] font-bold px-4 py-2.5 rounded-lg pr-10 outline-none cursor-pointer"
              >
                <option value="All Team">All Team</option>
                <option value="Sarah">Sarah</option>
                <option value="Michael">Michael</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center p-0.5">
                <ChevronDown className="w-4 h-4 text-[#635BFF]" />
              </div>
            </div>

            <button className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Statistics
            </button>
          </div>
        </div>
      </div>

      {/* --- Section 1: Production --- */}
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Production</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#F5F3FF] to-[#F5F3FF]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#635BFF] flex items-center justify-center text-white shadow-sm">
                <BriefcaseBusiness className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-[#1E293B]">Monthly Turnover</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">€ 8,500</div>
          </div>

          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#FEFCE8] to-[#FEFCE8]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#FBBF24] flex items-center justify-center text-white shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-[#1E293B]">Target Threshold</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">€ 6,400</div>
          </div>

          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#F0FDFA] to-[#F0FDFA]/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#2DD4BF] flex items-center justify-center text-white shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[12px] font-bold text-[#1E293B]">Performance</span>
              </div>
              <span className="bg-[#CCFBF1] text-[#0D9488] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">Goal Achieved</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">133%</div>
          </div>
        </div>

        {/* Daily Production (Monthly) Chart */}
        <div className="border border-[#E2E8F0] rounded-[16px] p-6 mb-8 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-[#1E293B] text-[14px]">Daily Production (Monthly)</h3>
              <div className="mt-4">
                <div className="text-[#64748B] text-[11px] font-bold mb-2">Production Status</div>
                <div className="bg-[#DCFCE7] text-[#22C55E] px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide inline-block">Above Threshold</div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <select className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#475569] outline-none mb-4">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
              <div className="text-right hidden sm:block">
                <div className="text-[#22C55E] font-black text-[16px]">€ 12,500</div>
                <div className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-wide mt-1">Threshold: € 5,000</div>
              </div>
            </div>
          </div>

          <div className="h-[300px] relative w-full">
            <Bar data={dailyProductionData} options={dailyProductionOptions} />
          </div>

          {/* Bottom Left Legend & Bottom Right Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
            <div className="text-[#94A3B8] text-[11px] font-medium leading-relaxed">
              <div>Threshold Calculation: Turnover x 0.2 = € 3,500</div>
              <div>Monthly Salary: € 4,000</div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] hover:bg-[#F8FAFC] transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#635BFF] hover:bg-[#EEF2FF] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Production Trends (Yearly) Chart */}
        <div className="border border-[#E2E8F0] rounded-[16px] p-6 mb-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1E293B] text-[14px]">Production Trends (Yearly)</h3>
            <select className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#475569] outline-none">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="h-[250px] relative w-full mb-6">
            <Line data={productionTrendsData} options={productionTrendsOptions} />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-[#22C55E]"></div>
              <span className="text-[12px] font-semibold text-[#64748B]">Above Threshold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-[4px] bg-[#F43F5E]"></div>
              <span className="text-[12px] font-semibold text-[#64748B]">Below Threshold</span>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#1E293B] text-[14px]">Performance Metrics (Last Month)</h3>
              <select className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#475569] outline-none bg-white">
                <option>Select Month</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Target Threshold</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 1,700</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Monthly Salary</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 3,200</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Threshold Calculation (20%)</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 1,700</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[13px] font-medium text-[#475569]">Performance Status</span>
                <span className="bg-[#CCFBF1] text-[#0D9488] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">Goal Achieved</span>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#1E293B] text-[14px]">Operation Statics</h3>
              <select className="border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#475569] outline-none bg-white">
                <option>Last Month</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Completed Appointments</span>
                <span className="text-[13px] font-bold text-[#1E293B]">38</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Revenue Appointment</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 223.68</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9] border-dashed">
                <span className="text-[13px] font-medium text-[#475569]">Working Days</span>
                <span className="text-[13px] font-bold text-[#1E293B]">3</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[13px] font-medium text-[#475569]">Performance Status</span>
                <span className="text-[13px] font-bold text-[#1E293B]">€ 2,633.33</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 2: Remuneration --- */}
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] p-6 md:p-8">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Remuneration</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#F5F3FF] to-[#F5F3FF]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#635BFF] flex items-center justify-center text-white shadow-sm">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-[#1E293B]">Last Payslip</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">€ 1,700</div>
            <div className="text-[11px] font-medium text-[#64748B] mt-2">Gross: € 4,300.00<br />November 20, 2024</div>
          </div>

          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#F0FDFA] to-[#F0FDFA]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#2DD4BF] flex items-center justify-center text-white shadow-sm">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-[#1E293B]">Average Salary</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">€ 2,200</div>
            <div className="text-[11px] font-medium text-[#64748B] mt-2">Last 12 months</div>
          </div>

          <div className="p-6 rounded-[16px] bg-gradient-to-br from-[#FEFCE8] to-[#FEFCE8]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#FBBF24] flex items-center justify-center text-white shadow-sm">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[12px] font-bold text-[#1E293B]">Accumulated TFR</span>
            </div>
            <div className="text-[24px] font-bold text-[#1E293B]">€ 5,500</div>
          </div>
        </div>

        {/* Payments per Year Chart */}
        <div className="border border-[#E2E8F0] rounded-[16px] p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-bold text-[#1E293B] text-[14px]">Payments per Year</h3>
            <div className="hidden sm:flex flex-col items-end opacity-0 pointer-events-none">
              {/* Spacer to match layout height if needed, hidden */}
              <span className="text-xs">spacer</span>
            </div>
          </div>

          {/* Left Y Axis Custom Labels Overlay */}
          <div className="relative h-[280px]">
            <div className="ml-10 h-full w-[calc(100%-40px)]">
              <Bar data={paymentsPerYearData} options={paymentsPerYearOptions} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] hover:bg-[#F8FAFC] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#635BFF] hover:bg-[#EEF2FF] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
