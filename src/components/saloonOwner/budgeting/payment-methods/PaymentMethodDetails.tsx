"use client";

import React, { useState } from "react";
import { ChevronLeft, Home, Search, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { MOCK_PAYMENT_METHOD_BALANCE_DATA, MOCK_EXPENSES } from "../data";
import { ExpensePill } from "../expenses/ExpensePill";
import Pagination from "@/components/saloonOwner/common/Pagination";
import { CustomSelect } from "../../../common/CustomSelect";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const pillColorMap: Record<string, any> = {
  "Credit Card": "cyan",
  "Cash": "green",
  "Direct debit": "blue",
  "Bank transfer": "yellow"
};

export function PaymentMethodDetails({ method }: { method: any }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredRecords = MOCK_EXPENSES.filter(record =>
    record.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const currentRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [year, setYear] = useState("2024");
  const dataOffset = year === "2023" ? -400 : year === "2025" ? 350 : 0;

  const dynamicBalanceData = {
    ...MOCK_PAYMENT_METHOD_BALANCE_DATA,
    datasets: [
      {
        ...MOCK_PAYMENT_METHOD_BALANCE_DATA.datasets[0],
        data: MOCK_PAYMENT_METHOD_BALANCE_DATA.datasets[0].data.map(val => Math.max(0, val + dataOffset))
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#64748B",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context: any) => `${context[0].label}, ${year}`,
          label: (context: any) => `Balance € ${context.raw / 1000}k`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 12 } }
      },
      y: {
        grid: { display: true, color: "#F1F5F9", drawTicks: false },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { family: "Manrope", size: 12 },
          callback: (value: any) => value === 0 ? "0" : `€ ${(value / 1000).toFixed(1)}k`
        },
        beginAtZero: true,
        suggestedMax: 4000 + (dataOffset > 0 ? 500 : 0)
      }
    }
  };

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shrink-0">
        <button
          onClick={() => router.push("/dashboard/budgeting/payment-methods")}
          className="flex items-center gap-2 text-[14px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {method.name}
        </button>

        <div className="flex items-center gap-2 text-[13px] font-medium text-[#94A3B8]">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="text-[#635BFF] bg-[#E0E7FF] px-2 py-0.5 rounded-lg">Budgeting</span>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-[14px] font-bold text-[#1E293B] mb-6">Basic Informations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-[12px] text-[#94A3B8] mb-1">Name</div>
            <div className="text-[14px] font-bold text-[#1E293B]">{method.name}</div>
          </div>
          <div>
            <div className="text-[12px] text-[#94A3B8] mb-1">Account Type</div>
            <ExpensePill text={method.accountType} colorType={pillColorMap[method.accountType] || "default"} variant="soft" />
          </div>
          <div>
            <div className="text-[12px] text-[#94A3B8] mb-1">Initial Value</div>
            <div className="text-[14px] font-bold text-[#1E293B]">{method.initialValue}</div>
          </div>
        </div>
      </div>

      {/* Balance Chart */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-start sm:items-center mb-6 shrink-0 gap-4">
          <h3 className="text-[14px] font-bold text-[#1E293B]">Balance</h3>
          <CustomSelect
            value={year}
            onChange={setYear}
            options={["2023", "2024", "2025"]}
          />
        </div>
        <div className="w-full overflow-x-auto pb-2">
          <div className="h-[250px] min-w-[600px] w-full">
            <Line data={dynamicBalanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-[14px] font-bold text-[#1E293B]">Records</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 w-full sm:w-64 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] border border-[#F1F5F9] rounded-lg overflow-hidden">
            <div className="grid grid-cols-[150px_1fr_1fr_150px_150px_1fr] gap-4 p-4 border-b border-[#F1F5F9] bg-[#F8FAFC]">
              <div className="text-[13px] font-bold text-[#1E293B]">Date</div>
              <div className="text-[13px] font-bold text-[#1E293B]">Macro-categories</div>
              <div className="text-[13px] font-bold text-[#1E293B]">Category</div>
              <div className="text-[13px] font-bold text-[#1E293B]">Cost</div>
              <div className="text-[13px] font-bold text-[#1E293B]">Supplier</div>
              <div className="text-[13px] font-bold text-[#1E293B]">Note</div>
            </div>
            <div className="divide-y divide-[#F1F5F9]">
              {currentRecords.map((record, index) => (
                <div key={index} className="grid grid-cols-[150px_1fr_1fr_150px_150px_1fr] gap-4 p-4 items-center hover:bg-[#F8FAFC] transition-colors">
                  <div className="text-[13px] font-bold text-[#1E293B]">{record.date}</div>
                  <div><ExpensePill text={record.macroCategory.text} colorType={record.macroCategory.colorType as any} variant="solid" /></div>
                  <div><ExpensePill text={record.category.text} colorType={record.category.colorType as any} variant="soft" /></div>
                  <div className="text-[13px] font-bold text-[#1E293B]">{record.cost}</div>
                  <div className="text-[13px] font-medium text-[#64748B]">{record.supplier}</div>
                  <div className="text-[13px] font-medium text-[#64748B] truncate pr-4">{record.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Control */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRecords.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
