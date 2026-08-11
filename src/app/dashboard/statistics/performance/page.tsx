"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Download, ChevronDown, Wallet, Calendar, Tag } from "lucide-react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { statisticsStatCardsData } from "./analyticsData";
import PerformanceRadarChart from "@/components/saloonOwner/dashboard/Charts/PerformanceRadarChart";
import ClientStatusFlowChart from "@/components/saloonOwner/dashboard/Charts/ClientStatusFlowChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ServiceRevenue {
  name: string;
  value: number;
}

const SERVICE_REVENUE_PAGE_1: ServiceRevenue[] = [
  { name: "Haircut", value: 1700 },
  { name: "Haircut", value: 1800 },
  { name: "Haircut", value: 2000 },
  { name: "Haircut", value: 2000 },
  { name: "Haircut", value: 2000 },
  { name: "Haircut", value: 2100 },
  { name: "Haircut", value: 2400 },
];

const SERVICE_REVENUE_PAGE_2: ServiceRevenue[] = [
  { name: "Coloring", value: 2800 },
  { name: "Styling", value: 2200 },
  { name: "Nail Care", value: 1900 },
  { name: "Facial", value: 2600 },
  { name: "Waxing", value: 1500 },
  { name: "Massage", value: 2300 },
  { name: "Makeup", value: 1800 },
];

export default function PerformanceDashboard() {
  const [activePage, setActivePage] = useState(1);
  const [hoveredBar, setHoveredBar] = useState<number | null>(4);

  const activeServices = activePage === 1 ? SERVICE_REVENUE_PAGE_1 : SERVICE_REVENUE_PAGE_2;

  const categoryData = {
    labels: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7"],
    datasets: [
      {
        data: [2500, 2000, 1500, 1500, 1000, 800, 700],
        backgroundColor: [
          "#635BFF", // Category 1 (Purple)
          "#06B6D4", // Category 2 (Cyan)
          "#FBBF24", // Category 3 (Yellow)
          "#2DD4BF", // Category 4 (Teal)
          "#EC4899", // Category 5 (Pink)
          "#10B981", // Category 6 (Green)
          "#1E293B", // Category 7 (Slate)
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const categoryOptions = {
    rotation: 270,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#475569",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Costs vs Salaries Line chart config
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Salaries",
        data: [1400, 1650, 1750, 1950, 1900, 1850, 1800, 1850, 1900, 2050, 2000, 1900],
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20, 184, 166, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: "Costs",
        data: [3200, 3100, 2450, 2400, 2100, 1500, 1450, 1500, 1400, 1300, 1350, 1300],
        borderColor: "#635BFF",
        backgroundColor: "rgba(99, 91, 255, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#475569",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context: any) {
            return `  ${context.dataset.label}: € ${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94A3B8",
          font: {
            family: "Manrope",
            size: 11,
          },
        },
      },
      y: {
        min: 1000,
        max: 3500,
        ticks: {
          stepSize: 500,
          color: "#94A3B8",
          font: {
            family: "Manrope",
            size: 11,
          },
          callback: function (value: any) {
            return "€ " + value.toLocaleString();
          },
        },
        grid: {
          color: "#F8FAFC",
        },
      },
    },
  };

  // Convert height value to percentage for custom bar chart (min: 1000, max: 4000)
  const getBarHeightPercent = (val: number) => {
    const min = 1000;
    const max = 4000;
    return `${((val - min) / (max - min)) * 100}%`;
  };

  // Weekly Appointments Line chart config
  const weeklyAppointmentsData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Appoiments",
        data: [45, 40, 65, 55, 120, 130, 115],
        borderColor: "#22C55E",
        backgroundColor: "rgba(34, 197, 94, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const weeklyAppointmentsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#22C55E",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function (context: any) {
            return `  ${context.dataset.label}: ${context.raw}`;
          },
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
        max: 140,
        ticks: { stepSize: 35, color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        grid: { color: "#F8FAFC" },
        border: { display: false },
      },
    },
  };

  // Average Ticket Bar chart config
  const averageTicketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Average Ticket",
        data: [70, 55, 80, 58, 28, 28, 28, 28, 28, 28, 28, 28],
        backgroundColor: "#635BFF",
        borderRadius: 20,
        barPercentage: 0.3,
      },
    ],
  };

  const averageTicketOptions = {
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
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        min: 20,
        max: 80,
        ticks: { stepSize: 20, color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        grid: { color: "#F8FAFC" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* Header Banner */}
      <div className="bg-white rounded-[16px] p-4 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-[16px] font-bold text-[#1E293B] font-manrope ml-2">Performance Dashboard</h1>
        <button className="bg-[#EEF2FF] text-[#635BFF] hover:bg-[#E0E7FF] px-4 py-2.5 rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          Export Statistics
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Analytics Overview Section */}
      <div className="mb-8 mt-2">
        <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">Analytics Overview</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {statisticsStatCardsData.map((card) => (
            <div key={card.id} className={`p-6 rounded-lg border border-[#E2E8F0] shadow-sm relative overflow-hidden ${card.cardStyle}`}>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.iconBgColor} ${card.iconShadowColor}`}>
                  {card.icon}
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[#64748B] text-[13px] font-semibold mb-1">{card.title}</h3>
                <div className="flex items-end gap-3">
                  <span className="text-[#1E293B] text-[24px] font-bold">{card.value}</span>
                </div>
                {card.change && (
                  <div className="text-[11px] font-bold text-[#10B981] mt-2">
                    {card.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-8">
          <PerformanceRadarChart />
          <ClientStatusFlowChart />
        </div>
      </div>

      {/* Weekly Appointments & Average Ticket Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6">
        {/* Weekly Appointments */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Weekly Appoinments</h3>
          <div className="h-[280px] relative w-full mt-4 select-none">
            <Line data={weeklyAppointmentsData} options={weeklyAppointmentsOptions} />
          </div>
        </div>

        {/* Average Ticket */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Average Ticket</h3>
          <div className="h-[280px] relative w-full mt-4 select-none">
            <Bar data={averageTicketData} options={averageTicketOptions} />
          </div>
        </div>
      </div>

      {/* Custom Section 1: Revenue per service */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-[#1E293B] text-[14px]">Revenue per service</h3>
        </div>

        <div className="relative flex items-end justify-between h-[300px] mt-8 select-none">
          {/* Y Axis Grid Labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-[#94A3B8] h-[240px] pointer-events-none">
            <span>€ 4,000</span>
            <span>€ 3,500</span>
            <span>€ 3,000</span>
            <span>€ 2,500</span>
            <span>€ 2,000</span>
            <span>€ 1,500</span>
            <span>€ 1,000</span>
          </div>

          {/* Graph Columns Container */}
          <div className="flex-1 ml-12 sm:ml-16 mr-2 sm:mr-4 flex justify-between items-end h-[240px] relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between h-full pointer-events-none">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="border-t border-[#F8FAFC] w-full" />
              ))}
            </div>

            {/* Bars */}
            {activeServices.map((service, idx) => {
              const heightPercent = getBarHeightPercent(service.value);
              const isHovered = hoveredBar === idx;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-1 group relative h-full justify-end cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Custom Tooltip matching mock design */}
                  {isHovered && (
                    <div className="absolute z-10 bottom-full mb-3 transform -translate-x-1/2 left-1/2 -translate-y-1 bg-white border border-[#E2E8F0] shadow-lg rounded-lg p-3 text-left w-32 sm:w-36 animate-fadeIn pointer-events-none">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
                        <span className="text-[10px] font-bold text-[#64748B]">2026</span>
                      </div>
                      <div className="flex justify-between text-xs font-extrabold text-[#1E293B]">
                        <span>Total</span>
                        <span>€ 12,400</span>
                      </div>
                    </div>
                  )}

                  {/* Vertical Pillar */}
                  <div className="w-8 sm:w-10 md:w-14 bg-[#F8FAFC] rounded-lg h-full flex items-end overflow-hidden relative border border-[#F8FAFC]">
                    <div
                      className="w-full bg-[#635BFF] rounded-t-2xl transition-all duration-300 shadow-sm"
                      style={{ height: heightPercent }}
                    />
                  </div>

                  {/* X Axis Label */}
                  <span className="absolute top-full mt-4 text-[8px] sm:text-[10px] font-bold text-[#94A3B8] text-center w-full px-0.5 truncate">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel / Navigation Controls at bottom right */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => setActivePage(1)}
            disabled={activePage === 1}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${activePage === 1
              ? "border-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
              : "border-[#E2E8F0] hover:bg-slate-50 text-[#64748B]"
              }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActivePage(2)}
            disabled={activePage === 2}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${activePage === 2
              ? "border-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed"
              : "border-[#E2E8F0] hover:bg-slate-50 text-[#64748B]"
              }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2: Revenue per Category & Top 3 Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue per Category (Gauge) */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Revenue per Category</h3>
          </div>

          <div className="relative w-full h-[180px] flex items-center justify-center mt-2">
            {/* Doughnut Canvas container */}
            <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] absolute -bottom-16 sm:-bottom-24">
              <Doughnut data={categoryData} options={categoryOptions} />
            </div>

            {/* Center Gauge Text */}
            <div className="text-center absolute z-10 bottom-6">
              <div className="text-2xl font-black text-[#1E293B] font-manrope">€ 10,000</div>
              <div className="text-[10px] font-bold text-[#94A3B8] tracking-wider mt-0.5">Total Revenue</div>
            </div>
          </div>

          {/* Legends */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 mt-6 pt-4 text-[11px] font-bold text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF] shrink-0" />
              <span className="truncate">Category 1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shrink-0" />
              <span className="truncate">Category 2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shrink-0" />
              <span className="truncate">Category 3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] shrink-0" />
              <span className="truncate">Category 4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] shrink-0" />
              <span className="truncate">Category 5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="truncate">Category 6</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B] shrink-0" />
              <span className="truncate">Category 7</span>
            </div>
          </div>
        </div>

        {/* Top 3 Services */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Top 3 Services</h3>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Top 1 */}
            <div className="flex items-center justify-between p-4 bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors rounded-[12px]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#635BFF] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  1
                </div>
                <span className="font-bold text-sm text-[#1E293B]">Cut and Fold</span>
              </div>
              <span className="font-extrabold text-sm text-[#1E293B]">25</span>
            </div>

            {/* Top 2 */}
            <div className="flex items-center justify-between p-4 bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors rounded-[12px]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#635BFF] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  2
                </div>
                <span className="font-bold text-sm text-[#1E293B]">Cut and Fold</span>
              </div>
              <span className="font-extrabold text-sm text-[#1E293B]">25</span>
            </div>

            {/* Top 3 */}
            <div className="flex items-center justify-between p-4 bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors rounded-[12px]">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#635BFF] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  3
                </div>
                <span className="font-bold text-sm text-[#1E293B]">Cut and Fold</span>
              </div>
              <span className="font-extrabold text-sm text-[#1E293B]">25</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Section 3: Costs vs Salaries Line Chart */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="font-bold text-[#1E293B] text-[14px]">Costs vs Salaries</h3>

          {/* Custom chart legend badges matching mockup */}
          <div className="flex items-center gap-4 text-xs font-bold text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
              <span>Salaries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF]" />
              <span>Costs</span>
            </div>
          </div>
        </div>

        {/* Line Chart container */}
        <div className="h-[280px] relative w-full mt-4 select-none">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}
