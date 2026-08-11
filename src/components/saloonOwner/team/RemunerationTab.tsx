"use client";

import React, { useState } from "react";
import {
  Wallet,
  CircleDollarSign,
  Coins,
  MoreVertical,
  Eye,
  Download,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Pagination from "@/components/saloonOwner/common/Pagination";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
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
        label: (context) => {
          return `Total: €${context.raw}\nMonthly mean: €${Math.round((context.raw as number) / 12)}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 11
        },
        callback: (value) => '€ ' + value,
        stepSize: 500
      },
      beginAtZero: true,
      suggestedMax: 4000
    }
  }
};

const chartData = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [
    {
      data: [1200, 1400, 1800, 1800, 1800, 2400],
      backgroundColor: '#635BFF',
      borderRadius: 12,
      borderSkipped: false,
      barThickness: 48,
    },
    {
      // Background bars (gray)
      data: [4000, 4000, 4000, 4000, 4000, 4000],
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
      borderSkipped: false,
      barThickness: 48,
      grouped: false,
      order: 1
    }
  ],
};

const payslips = [
  { id: 1, date: "November 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
  { id: 2, date: "October 30, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
  { id: 3, date: "September 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
  { id: 4, date: "August 30, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" },
  { id: 5, date: "July 29, 2024", net: "€ 1,700", gross: "€ 2,200", contributions: "€ 0", tfr: "€ 0", login: "2 hours ago" }
];

export default function RemunerationTab() {
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // Fix order for datasets so background is behind
  const chartDataModified = { ...chartData };
  chartDataModified.datasets[0].order = 0;

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#F5F3FF] rounded-lg p-6 border border-[#EDE9FE]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-white">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-[#1E293B]">Last Payslip</span>
          </div>
          <div className="text-[28px] font-bold text-[#1E293B] mb-1">€ 1,700</div>
          <div className="text-[11px] font-medium text-[#64748B]">
            Gross: € 2,200.00<br />
            November 29, 2024
          </div>
        </div>

        <div className="bg-[#F0FDF4] rounded-lg p-6 border border-[#DCFCE7]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white">
              <CircleDollarSign className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-[#1E293B]">Average Salary</span>
          </div>
          <div className="text-[28px] font-bold text-[#1E293B] mb-1">€ 2,200</div>
          <div className="text-[11px] font-medium text-[#64748B]">Last 12 months</div>
        </div>

        <div className="bg-[#FEFCE8] rounded-lg p-6 border border-[#FEF08A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#EAB308] flex items-center justify-center text-white">
              <Coins className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-[#1E293B]">Accumulated TFR</span>
          </div>
          <div className="text-[28px] font-bold text-[#1E293B] mb-1">€ 5,500</div>
        </div>
      </div>

      {/* Payments Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6 overflow-hidden">
        <h3 className="text-[15px] font-bold text-[#1E293B] mb-6 sm:mb-8">Payments per Year</h3>
        <div className="h-[250px] sm:h-[300px] w-full relative">
          <Bar data={chartDataModified} options={chartOptions} />
        </div>
      </div>

      {/* Payslip List */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#1E293B]">Payslip List</h3>
          <div className="relative">
            <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#635BFF]">
              <option>Custom Range</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Date</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Net</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Gross</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Contributions</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">TFR</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0]">Last Login</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] border-b border-[#E2E8F0] w-[80px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0] last:border-0">
                  <td className="px-6 py-4 text-[13px] font-medium text-[#1E293B]">{p.date}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{p.net}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{p.gross}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{p.contributions}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{p.tfr}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{p.login}</td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenActionId(openActionId === p.id ? null : p.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openActionId === p.id && (
                      <div className="absolute right-6 top-10 w-40 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-10 animate-in fade-in zoom-in-95 duration-100">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#635BFF] transition-colors text-left">
                          <Eye className="w-4 h-4 text-[#635BFF]" /> View
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#06B6D4] transition-colors text-left">
                          <Download className="w-4 h-4 text-[#06B6D4]" /> Download
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#06B6D4] transition-colors text-left">
                          <Edit2 className="w-4 h-4 text-[#06B6D4]" /> Edit
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-[#64748B] hover:bg-[#FFF1F2] hover:text-[#EF4444] transition-colors text-left">
                          <Trash2 className="w-4 h-4 text-[#FCA5A5]" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#E2E8F0]">
          <Pagination
            currentPage={1}
            totalPages={2}
            totalItems={10}
            itemsPerPage={5}
            itemName="entries"
          />
        </div>
      </div>
    </div>
  );
}
