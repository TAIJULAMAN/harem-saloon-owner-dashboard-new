import React from "react";
import { Doughnut } from "react-chartjs-2";

export function AgeGroupChart() {
  const ageGroupData = {
    labels: ["18-25", "26-33", "34-41", "42-49", "50-57", ">58"],
    datasets: [
      {
        data: [15, 25, 20, 15, 15, 10],
        backgroundColor: [
          "#635BFF", // Purple
          "#06B6D4", // Cyan
          "#FBBF24", // Yellow
          "#2DD4BF", // Teal
          "#F43F5E", // Pink
          "#22C55E", // Green
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const ageGroupOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const legendItems = [
    { label: "18-25", color: "bg-[#635BFF]" },
    { label: "26-33", color: "bg-[#06B6D4]" },
    { label: "34-41", color: "bg-[#FBBF24]" },
    { label: "42-49", color: "bg-[#2DD4BF]" },
    { label: "50-57", color: "bg-[#F43F5E]" },
    { label: ">58", color: "bg-[#22C55E]" },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
      <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Age Group</h3>

      <div className="relative w-full h-[220px] flex items-center justify-center mt-2">
        <div className="w-[180px] h-[180px]">
          <Doughnut data={ageGroupData} options={ageGroupOptions} />
        </div>
      </div>

      {/* Legends */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-6 pt-4 text-[11px] font-bold text-[#64748B]">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
