"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export function DailySpendingBarChart({ month = "May" }: { month?: string }) {
  const chartDataMap: Record<string, any> = {
    "All Time": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [15000, 21000, 18000, 22000, 24000, 28000, 20000, 25000, 21000, 31000, 24000, 38000],
      colors: Array(12).fill("#635BFF"),
    },
    "April": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [1200, 2100, 1500, 3100, 2400, 3800, 1500],
      colors: Array(7).fill("#635BFF"),
    },
    "May": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [1200, 2100, 1500, 3100, 2400, 3800, 1500],
      colors: [
        "#635BFF", "#635BFF", "#FB7185", "#635BFF", "#635BFF", "#FBBF24", "#635BFF"
      ],
    },
    "June": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [1400, 2300, 1800, 2800, 2100, 3300, 1700],
      colors: Array(7).fill("#635BFF"),
    }
  };

  const selectedData = chartDataMap[month] || chartDataMap["May"];

  const data = {
    labels: selectedData.labels,
    datasets: [
      {
        label: "Total Spending",
        data: selectedData.data,
        backgroundColor: selectedData.colors,
        borderRadius: 4,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: month === "All Time" ? 40000 : 6000,
        ticks: {
          stepSize: month === "All Time" ? 10000 : 2000,
          callback: (value: any) => value === 0 ? "0" : `${(value / 1000)}k`,
          color: "#94A3B8",
          font: { family: "Manrope", size: 12 },
          padding: 10,
        },
        grid: {
          display: true,
          color: "#F1F5F9",
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#94A3B8",
          font: { family: "Manrope", size: 12 },
          padding: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#64748B",
        bodyColor: "#1E293B",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        titleFont: { family: "Manrope", size: 12, weight: "normal" as const },
        bodyFont: { family: "Manrope", size: 14, weight: "bold" as const },
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: () => "Mar 03, 2025",
          label: (context: any) => {
            return `Total Spending: € ${context.raw / 1000}K`;
          },
        },
      },
    },
    // We can use a custom draw background to simulate the light gray pillar behind each bar.
    // For simplicity, we just rely on standard Chart.js bar features here.
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
}
