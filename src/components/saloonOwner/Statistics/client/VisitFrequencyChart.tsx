import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { CustomSelect } from "@/components/common/CustomSelect";

export function VisitFrequencyChart() {
  const [visitFrequencyRange, setVisitFrequencyRange] = useState("Daily");

  const isWeekly = visitFrequencyRange === "Weekly";

  const labelsDaily = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dataDaily = [4, 3, 3, 5, 4, 2, 3];

  const labelsWeekly = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const dataWeekly = [15, 20, 18, 25];

  const currentLabels = isWeekly ? labelsWeekly : labelsDaily;
  const currentData = isWeekly ? dataWeekly : dataDaily;
  const maxIndex = currentData.indexOf(Math.max(...currentData));

  const visitFrequencyData = {
    labels: currentLabels,
    datasets: [
      {
        label: "Total Visits",
        data: currentData,
        backgroundColor: (context: any) => {
          return context.dataIndex === maxIndex ? "#635BFF" : "#F1F5F9";
        },
        borderRadius: 4,
        barPercentage: 0.4,
      },
    ],
  };

  const visitFrequencyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#635BFF",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#1E293B] text-[14px]">Visit Frequency</h3>
        <div className="w-[100px]">
          <CustomSelect
            value={visitFrequencyRange}
            onChange={setVisitFrequencyRange}
            options={["Daily", "Weekly"]}
            buttonClassName="w-full !px-3 !py-1.5 !text-[12px] !font-bold !text-[#475569] !border-[#E2E8F0]"
          />
        </div>
      </div>
      <div className="flex-1 min-h-[220px] relative w-full mt-4 select-none">
        <Bar data={visitFrequencyData} options={visitFrequencyOptions} />
      </div>
    </div>
  );
}
