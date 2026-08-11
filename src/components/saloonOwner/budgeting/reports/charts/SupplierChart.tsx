"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { MOCK_REPORTS_SUPPLIERS } from "../../data";
import { CustomSelect } from "../../../../common/CustomSelect";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function SupplierChart() {
  const [year, setYear] = useState("2024");
  const dataOffset = year === "2023" ? -200 : year === "2025" ? 300 : 0;

  const data = {
    labels: MOCK_REPORTS_SUPPLIERS.map(s => s.name),
    datasets: [

      {
        label: "Value",
        data: MOCK_REPORTS_SUPPLIERS.map(s => Math.max(1000, s.value + dataOffset)),
        backgroundColor: "#635BFF",
        borderRadius: 16,
        borderSkipped: "bottom" as const,
        xAxisID: "x",
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        filter: (tooltipItem: any) => tooltipItem.datasetIndex === 1,
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#64748B",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `€ ${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 }, padding: 10 }
      },
      x2: {
        display: false,
        grid: { display: false },
        border: { display: false }
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => `€ ${value.toLocaleString()}`,
          stepSize: 500,
          padding: 10
        },
        min: 1000,
        max: 4000
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col h-full border border-[#F1F5F9]">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[14px] font-bold text-[#1E293B]">Expenses per Supplier</h3>
        <CustomSelect value={year} onChange={setYear} options={["2023", "2024", "2025"]} />
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
