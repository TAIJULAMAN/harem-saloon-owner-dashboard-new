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
import { MOCK_REPORTS_CATEGORIES } from "../../data";
import { CustomSelect } from "../../../../common/CustomSelect";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export function CategoriesChart() {
  const [filter, setFilter] = useState("Products");

  // Simulate functional data based on filter
  const multiplier = filter === "Products" ? 1 : filter === "Services" ? 0.8 : 1.5;

  const data = {
    labels: MOCK_REPORTS_CATEGORIES.labels,
    datasets: [
      {
        data: MOCK_REPORTS_CATEGORIES.data.map(val => val * multiplier),
        backgroundColor: "#635BFF",
        borderRadius: 16,
        borderSkipped: "bottom" as const,
        barThickness: 32,
      }
    ]
  };

  const options = {
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
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => value === 0 ? "0" : `€ ${(value / 1000).toFixed(1)}k`,
          stepSize: 500,
          padding: 10
        },
        beginAtZero: true,
        max: 1500 * (multiplier > 1 ? multiplier : 1) // dynamically adjust max if needed
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col h-full border border-[#F1F5F9]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[14px] font-bold text-[#1E293B]">Expenses per Categories</h3>
        <CustomSelect
          value={filter}
          onChange={setFilter}
          options={["Products", "Services", "Consumables"]}
        />
      </div>

      <div className="flex-1 min-h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
