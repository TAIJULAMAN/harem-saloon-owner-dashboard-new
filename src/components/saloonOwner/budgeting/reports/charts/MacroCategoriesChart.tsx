"use client";

import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { MOCK_REPORTS_MACRO_CATEGORIES } from "../../data";
import { CustomSelect } from "../../../../common/CustomSelect";

ChartJS.register(ArcElement, Tooltip);

export function MacroCategoriesChart() {
  const [filter, setFilter] = useState("Daily");

  const multiplier = filter === "Daily" ? 1 : filter === "Weekly" ? 7 : 30;

  const data = {
    labels: MOCK_REPORTS_MACRO_CATEGORIES.labels,
    datasets: [
      {
        data: MOCK_REPORTS_MACRO_CATEGORIES.data.map(val => val * multiplier),
        backgroundColor: MOCK_REPORTS_MACRO_CATEGORIES.colors,
        borderWidth: 0,
        hoverOffset: 4,
        cutout: "65%",
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
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => ` € ${context.raw.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col h-full border border-[#F1F5F9]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[14px] font-bold text-[#1E293B]">Expenses per Macro-categories</h3>
        <CustomSelect
          value={filter}
          onChange={setFilter}
          options={["Daily", "Weekly", "Monthly"]}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
        {/* Doughnut Chart */}
        <div className="w-[200px] h-[200px] relative mb-8">
          <Doughnut data={data} options={options} />
        </div>

        {/* Custom Legend */}
        <div className="w-full">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {MOCK_REPORTS_MACRO_CATEGORIES.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: MOCK_REPORTS_MACRO_CATEGORIES.colors[i] }}
                />
                <span className="text-[12px] font-medium text-[#64748B]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
