"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wallet,
  Target,
  BarChart2
} from "lucide-react";
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
  ChartOptions
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductionTab() {
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  // Daily Production (Monthly) - Stacked / Floating Bar
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Below Threshold',
        data: [[1.1, 1.9], [1.6, 1.9], [1.3, 1.9], [1.5, 1.9], [1.2, 1.9], [1.4, 1.9]],
        backgroundColor: '#F43F5E',
        borderRadius: 20,
        borderSkipped: false,
        barThickness: 10,
      },
      {
        label: 'Above Threshold',
        data: [[2.1, 2.3], [2.1, 2.7], [2.1, 2.2], [2.1, 2.8], [2.1, 2.5], [2.1, 2.9]],
        backgroundColor: '#06B6D4',
        borderRadius: 20,
        borderSkipped: false,
        barThickness: 10,
      }
    ]
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1E293B',
        titleFont: { size: 12, weight: 'bold' },
        bodyColor: '#1E293B',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        usePointStyle: false,
        callbacks: {
          title: (context) => {
            const month = context[0].label;
            return `${month === 'Jun' || month === 'Jul' ? month + 'e' : month}, 2025`; // rough mock for 'April, 2025' format
          },
          label: (context) => {
            return ''; // We will use beforeBody/afterBody for custom layout
          },
          beforeBody: (context) => {
            return `Total Production      € 1.7k`;
          },
          afterBody: (context) => {
            return `Threshold             € 1.7k\nAbove Threshold       € 1.7k`;
          },
          labelTextColor: (context) => '#1E293B'
        }
      }
    },
    scales: {
      x: {
        stacked: false, // since we use floating arrays, no need to stack
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#94A3B8', font: { size: 11 } }
      },
      y: {
        grid: {
          color: (ctx) => {
            if (ctx.tick.value === 2) return '#E0E7FF'; // Highlight 2k line as threshold
            return '#F1F5F9';
          },
          lineWidth: (ctx) => ctx.tick.value === 2 ? 2 : 1
        },
        border: { display: false },
        ticks: {
          color: '#94A3B8',
          font: { size: 11 },
          callback: (value: any) => '€ ' + (value === 2.5 ? '2,5' : value) + 'k',
          stepSize: 0.5
        },
        min: 1,
        max: 3
      }
    }
  };

  // Production Trends (Yearly) - Line Chart
  const thresholdValue = 2.5;
  const lineChartData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Trend',
        data: [2.4, 2.6, 2.4, 1.8, 1.9, 3.4, 3.2],
        fill: false,
        segment: {
          borderColor: (ctx: any) => {
            // Check if line segment goes below threshold
            return ctx.p0.parsed.y < thresholdValue || ctx.p1.parsed.y < thresholdValue
              ? '#F43F5E'
              : '#22C55E';
          }
        },
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4
      },
      {
        label: 'Threshold',
        data: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
        borderColor: '#E2E8F0',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
      }
    ]
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1E293B',
        bodyColor: '#64748B',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: (context) => `August 24, ${context[0].label}`,
          label: (context) => {
            if (context.datasetIndex === 1) return ""; // hide threshold line tooltip
            const val = context.raw as number;
            return val >= thresholdValue
              ? `Above Threshold: € ${val.toFixed(1)}k`
              : `Below Threshold: € ${val.toFixed(1)}k`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#94A3B8', font: { size: 11 } }
      },
      y: {
        grid: { color: '#F1F5F9' },
        border: { display: false },
        ticks: {
          color: '#94A3B8',
          font: { size: 11 },
          callback: (value) => '€ ' + value + 'k'
        },
        beginAtZero: true,
        suggestedMax: 4
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Production Last 30 Days */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6 overflow-hidden">
        <h2 className="text-[18px] font-bold text-[#1E293B] mb-6">Production Last 30 Days</h2>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 sm:p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-6 sm:gap-0">
            <div>
              <h3 className="text-[15px] font-bold text-[#1E293B] mb-2">Daily Production (Monthly)</h3>
              <div className="text-[12px] font-medium text-[#64748B] mb-1">Production Status</div>
              <span className="inline-block mt-1 bg-[#DCFCE7] text-[#22C55E] text-[11px] font-bold px-2.5 py-1 rounded-full">
                Above Threshold
              </span>
            </div>

            <div className="flex items-start justify-between w-full sm:w-auto sm:gap-8">
              <div className="text-left sm:text-right">
                <div className="text-[20px] font-bold text-[#22C55E]">€ 12,500</div>
                <div className="text-[12px] font-medium text-[#64748B]">Threshold € 9,000</div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-1.5 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#635BFF] cursor-pointer">
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="h-[250px] w-full mb-6 relative min-w-0">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-[#E2E8F0] gap-4 sm:gap-0">
            <div>
              <div className="text-[13px] font-medium text-[#64748B] mb-1">Threshold Calculation: Turnover x 0.2 = € 2,500</div>
              <div className="text-[13px] font-medium text-[#64748B]">Monthly Salary: € 4,500</div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F1F5F9] transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#635BFF] hover:bg-[#F1F5F9] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Production Details */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h2 className="text-[18px] font-bold text-[#1E293B] mb-6">Production Details</h2>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#F5F3FF] rounded-lg p-6 border border-[#EDE9FE]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Monthly Turnover</span>
            </div>
            <div className="text-[28px] font-bold text-[#1E293B]">€ 8,500</div>
          </div>

          <div className="bg-[#FEFCE8] rounded-lg p-6 border border-[#FEF08A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EAB308] flex items-center justify-center text-white">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Target Threshold</span>
            </div>
            <div className="text-[28px] font-bold text-[#1E293B]">€ 6,400</div>
          </div>

          <div className="bg-[#F0FDF4] rounded-lg p-6 border border-[#DCFCE7] relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white">
                <BarChart2 className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Performance</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-[28px] font-bold text-[#1E293B]">133%</div>
              <span className="bg-[#22C55E] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-1">
                Goal Achieved
              </span>
            </div>
          </div>
        </div>

        {/* Production Trends Chart */}
        <div className="border-t border-[#E2E8F0] pt-6 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[15px] font-bold text-[#1E293B]">Production Trends (Yearly)</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-1.5 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#635BFF] cursor-pointer">
                <option>Yearly</option>
                <option>Custom Range</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="h-[250px] w-full mb-6">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>

          {/* Chart Legends */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#22C55E]"></div>
              <span className="text-[12px] font-bold text-[#1E293B]">Above Threshold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#F43F5E]"></div>
              <span className="text-[12px] font-bold text-[#1E293B]">Below Threshold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-bold text-[#1E293B] w-[60%]">Performance Metrics (Last Month)</h3>
            <div className="relative">
              <button
                onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-8 py-1.5 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
              >
                Select Month
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2" />
              </button>

              {/* Mock Year/Month Picker Dropdown */}
              {isYearPickerOpen && (
                <div className="absolute right-0 top-full mt-2 w-[320px] bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-4 z-20 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 mb-3">
                    <button className="text-[#64748B] hover:text-[#1E293B]"><ChevronLeft className="w-4 h-4" /></button>
                    <div className="flex gap-4">
                      {['2018', '2019', '2020'].map(y => (
                        <span key={y} className="text-[13px] font-medium text-[#64748B] cursor-pointer">{y}</span>
                      ))}
                      <span className="text-[13px] font-bold text-[#635BFF] bg-[#E0E7FF] px-2 py-0.5 rounded-lg cursor-pointer">2021</span>
                      {['2022', '2023'].map(y => (
                        <span key={y} className="text-[13px] font-medium text-[#64748B] cursor-pointer">{y}</span>
                      ))}
                    </div>
                    <button className="text-[#64748B] hover:text-[#1E293B]"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                      <div key={m} className={`text-[13px] font-medium px-3 py-1.5 rounded-lg cursor-pointer ${m === 'March' ? 'bg-[#E0E7FF] text-[#635BFF] font-bold' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Target Threshold</span>
              <span className="text-[14px] font-bold text-[#1E293B]">€ 1,700</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Monthly Salary</span>
              <span className="text-[14px] font-bold text-[#1E293B]">€ 3,200</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Threshold Calculation (20%)</span>
              <span className="text-[14px] font-bold text-[#1E293B]">€ 1,700</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[13px] font-bold text-[#1E293B]">Performance Status</span>
              <span className="bg-[#06B6D4] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                Goal Achieved
              </span>
            </div>
          </div>
        </div>

        {/* Operation Statics */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-bold text-[#1E293B]">Operation Statics</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-1.5 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#635BFF] cursor-pointer">
                <option>Last Month</option>
                <option>Last Year</option>
                <option>Custom Range</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Completed Appointments</span>
              <span className="text-[14px] font-bold text-[#1E293B]">38</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Revenue/Appointment</span>
              <span className="text-[14px] font-bold text-[#1E293B]">€ 223.68</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F5F9]">
              <span className="text-[13px] font-bold text-[#1E293B]">Working Days</span>
              <span className="text-[14px] font-bold text-[#1E293B]">21</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[13px] font-bold text-[#1E293B]">Performance Status</span>
              <span className="text-[14px] font-bold text-[#1E293B]">€ 2,683.33</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
