"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

import { MOCK_DOUGHNUT_CHART_DATA } from "../data";

export function ExpensesDoughnutChart() {
  const data = MOCK_DOUGHNUT_CHART_DATA;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // Thicker ring to match design
    plugins: {
      legend: {
        display: false, // We'll build a custom HTML legend instead to match design
      },
      tooltip: {
        backgroundColor: "#1E293B",
        padding: 12,
        titleFont: { family: "Manrope" },
        bodyFont: { family: "Manrope" },
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="relative w-full h-[220px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}
