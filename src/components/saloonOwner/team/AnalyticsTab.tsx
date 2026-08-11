"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  CalendarX,
  Eye,
  Edit2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Trash2
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Pagination from "@/components/saloonOwner/common/Pagination";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
      displayColors: false,
      callbacks: {
        title: (context) => context[0].label,
        label: (context) => `Appointments: ${context.raw}`
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
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: '#94A3B8',
        font: { size: 11 },
        stepSize: 20
      },
      beginAtZero: true,
      suggestedMax: 100
    }
  },
  elements: {
    line: {
      tension: 0.4
    }
  }
};

const lineChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      fill: false,
      data: [35, 40, 30, 45, 38, 85, 75],
      borderColor: '#22C55E', // Green line
      borderWidth: 2,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#22C55E',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }
  ]
};

const recentShifts = [
  { id: 1, date: "November 29, 2024", timeRange: "09:00 - 19:00", totalTime: "10h", added: "2 hours ago" },
  { id: 2, date: "October 30, 2024", timeRange: "09:00 - 19:00", totalTime: "10h", added: "2 hours ago" },
  { id: 3, date: "September 29, 2024", timeRange: "09:00 - 19:00", totalTime: "10h", added: "2 hours ago" }
];

export default function AnalyticsTab() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isAddEditShiftModalOpen, setIsAddEditShiftModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#F5F3FF] rounded-lg p-6 border border-[#EDE9FE]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-[#1E293B]">Appointments Completed <span className="text-[#64748B] font-medium">(Last 30 days)</span></span>
          </div>
          <div className="text-[28px] font-bold text-[#1E293B]">45</div>
        </div>

        <div className="bg-[#F0FDF4] rounded-lg p-6 border border-[#DCFCE7]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white">
              <CalendarX className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-[#1E293B]">Appointments No-show <span className="text-[#64748B] font-medium">(Last 30 days)</span></span>
          </div>
          <div className="text-[28px] font-bold text-[#1E293B]">52</div>
        </div>
      </div>

      {/* Weekly Appointments Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-8">Weekly Appointments</h3>
        <div className="h-[250px] w-full">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Top 3 Services */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-4">Top 3 Services</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((rank, index) => (
            <div key={rank} className="bg-[#F8FAFC] rounded-lg p-3 flex items-center justify-between border border-[#E2E8F0]">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded bg-[#635BFF] flex items-center justify-center text-white text-[12px] font-bold">
                  {rank}
                </div>
                <span className="text-[13px] font-medium text-[#1E293B]">Cut and Fold</span>
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">{25 - index * 4}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Shifts */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative">
          <h3 className="text-[15px] font-bold text-[#1E293B]">Recent Shifts</h3>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-1.5 text-[13px] font-medium text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
              >
                Custom Range
                <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2" />
              </button>

              {/* Mock Date Picker Dropdown */}
              {isDatePickerOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full min-w-[300px] sm:w-[550px] bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-4 z-20">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                    <div className="w-full sm:w-1/2 sm:pr-4 border-b sm:border-b-0 sm:border-r border-[#E2E8F0] pb-4 sm:pb-0">
                      <div className="flex justify-between items-center mb-4">
                        <button className="text-[#64748B]"><ChevronLeft className="w-4 h-4" /></button>
                        <span className="text-[13px] font-bold text-[#1E293B]">June 2024</span>
                        <button className="text-[#64748B] opacity-0 pointer-events-none"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-7 text-center gap-y-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[11px] font-medium text-[#94A3B8]">{d}</div>)}
                        {Array.from({ length: 2 }).map((_, i) => <div key={`empty-${i}`} />)}
                        {[1, 2, 3].map(d => <div key={d} className="text-[13px] text-[#1E293B] py-1">{d}</div>)}
                        {/* Selected Range */}
                        <div className="bg-[#E0E7FF] rounded-l-full text-[#635BFF] font-bold py-1 text-[13px]">4</div>
                        <div className="bg-[#E0E7FF] text-[#635BFF] font-bold py-1 text-[13px]">5</div>
                        <div className="bg-[#E0E7FF] text-[#635BFF] font-bold py-1 text-[13px]">6</div>
                        <div className="bg-[#E0E7FF] text-[#635BFF] font-bold py-1 text-[13px]">7</div>
                        <div className="bg-[#E0E7FF] rounded-r-full text-[#635BFF] font-bold py-1 text-[13px]">8</div>

                        {Array.from({ length: 22 }).map((_, i) => <div key={i + 9} className="text-[13px] text-[#1E293B] py-1">{i + 9}</div>)}
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-4">
                      <div className="flex justify-between items-center mb-4">
                        <button className="text-[#64748B] opacity-0 pointer-events-none"><ChevronLeft className="w-4 h-4" /></button>
                        <span className="text-[13px] font-bold text-[#1E293B]">July 2024</span>
                        <button className="text-[#64748B]"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-7 text-center gap-y-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[11px] font-medium text-[#94A3B8]">{d}</div>)}
                        {Array.from({ length: 5 }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: 31 }).map((_, i) => <div key={i + 1} className="text-[13px] text-[#1E293B] py-1">{i + 1}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="bg-[#F8FAFC] text-[#635BFF] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#F1F5F9] transition-colors">
              Export
            </button>
            <button
              onClick={() => setIsAddEditShiftModalOpen(true)}
              className="bg-[#635BFF] text-white px-3 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Add Shift
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Date</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Time Range</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Total Time</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Added</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0] w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentShifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0]">
                  <td className="px-6 py-4 text-[13px] font-medium text-[#1E293B]">{shift.date}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{shift.timeRange}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{shift.totalTime}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{shift.added}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg bg-[#E0E7FF] text-[#635BFF] hover:bg-[#C7D2FE] transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsAddEditShiftModalOpen(true)}
                        className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#06B6D4] hover:bg-[#ECFEFF] hover:border-[#A5F3FC] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <div className="text-[14px] font-bold text-[#1E293B]">30h</div>
                  <div className="text-[11px] font-medium text-[#64748B]">Total of the Month</div>
                </td>
                <td colSpan={2} className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#E2E8F0]">
          <Pagination
            currentPage={1}
            totalPages={1}
            totalItems={3}
            itemsPerPage={3}
            itemName="shifts"
          />
        </div>
      </div>

      {/* Most Loyal Customers */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-4">Most Loyal Customers</h3>
        <div className="space-y-3">
          {[
            { id: 1, name: "Sofia Bianchi", date: "November 29, 2024", appts: 25, spent: "€ 1,700" },
            { id: 2, name: "Guy Hawkins", date: "October 30, 2024", appts: 24, spent: "€ 1,500" },
            { id: 3, name: "Cameron Williamson", date: "December 20, 2024", appts: 20, spent: "€ 1,200" }
          ].map((c) => (
            <div key={c.id} className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-[#E2E8F0] shadow-sm gap-4 sm:gap-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center text-white text-[14px] font-bold shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1E293B]">{c.name}</div>
                  <div className="text-[11px] font-medium text-[#64748B]">Last Visit: {c.date}</div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t sm:border-t-0 border-[#F1F5F9] pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <div className="text-[14px] font-bold text-[#1E293B]">{c.appts}</div>
                  <div className="text-[11px] font-medium text-[#64748B]">Appointments</div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-bold text-[#22C55E]">{c.spent}</div>
                  <div className="text-[11px] font-medium text-[#64748B]">Total Spent</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Days Worked Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Days Worked (Holidays)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <span className="text-[12px] font-medium text-[#64748B]">Matured</span>
              <span className="text-[12px] font-bold text-[#1E293B]">22 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-medium text-[#64748B]">Enjoyed</span>
              <span className="text-[12px] font-bold text-[#1E293B]">8 days</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Days Worked (Other Data)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <span className="text-[12px] font-medium text-[#64748B]">Sick Days</span>
              <span className="text-[12px] font-bold text-[#1E293B]">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-medium text-[#64748B]">Next Evaluation</span>
              <span className="text-[12px] font-bold text-[#1E293B]">March 14, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Shift Modal */}
      {isAddEditShiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddEditShiftModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative z-10 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1E293B]">Edit Maria Rodriguez's Shift</h2>
              <button onClick={() => setIsAddEditShiftModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[14px] font-bold text-[#1E293B]">Mon, 11 Aug</span>
                <span className="bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-3 py-1 rounded-full">
                  Total: 9h
                </span>
              </div>

              <div className="flex items-end gap-3 mb-4">
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                      <option>09:00</option>
                      <option>10:00</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                      <option>17:00</option>
                      <option>18:00</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <button className="p-2.5 rounded-lg border border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEE2E2] transition-colors mb-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <button className="text-[#635BFF] text-[13px] font-bold hover:underline">
                Add a Shift
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAddEditShiftModalOpen(false)}
                className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
