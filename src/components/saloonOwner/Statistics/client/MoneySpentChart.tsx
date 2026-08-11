import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Line } from "react-chartjs-2";
import { CustomSelect } from "@/components/common/CustomSelect";

export function MoneySpentChart() {
  const [moneySpentRange, setMoneySpentRange] = useState("Last 7 days");

  const is30Days = moneySpentRange === "Last 30 days";

  const labels7Days = ["Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 7"];
  const data7Days = [650, 800, 600, 950, 800, 2400, 2200];

  const labels30Days = [
    ...Array.from({ length: 23 }, (_, i) => `Aug ${i + 9}`),
    ...Array.from({ length: 7 }, (_, i) => `Sep ${i + 1}`)
  ];
  const data30Days = [
    700, 750, 800, 650, 900, 1100, 1050, 
    800, 850, 950, 1000, 1200, 1300, 1250, 
    1100, 1050, 1150, 1000, 900, 950, 1100, 
    1200, 1150, 
    650, 800, 600, 950, 800, 2400, 2200
  ];

  const moneySpentData = {
    labels: is30Days ? labels30Days : labels7Days,
    datasets: [
      {
        label: "Money Spent",
        data: is30Days ? data30Days : data7Days,
        borderColor: "#22C55E",
        backgroundColor: "rgba(34, 197, 94, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const totalAmount = is30Days ? "€ 31,450" : "€ 8,400";
  const percentage = is30Days ? "+12%" : "+9%";
  const comparisonText = is30Days ? "last month" : "last week";

  const moneySpentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1E293B",
        bodyColor: "#22C55E",
        borderColor: "#E2E8F0",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: (context: any) => `${context[0].label}, 2025`,
          label: (context: any) => `  Spent: € ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94A3B8", font: { family: "Manrope", size: 11 } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 2500,
        ticks: {
          stepSize: 500,
          color: "#94A3B8",
          font: { family: "Manrope", size: 11 },
          callback: (value: any) => (value === 0 ? "0" : `€ ${value / 1000}k`),
        },
        grid: { color: "#F8FAFC" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-[#1E293B] text-[14px]">Money Spent</h3>
          <div className="mt-4">
            <div className="text-[24px] font-bold text-[#1E293B] mb-2">{totalAmount}</div>
            <div className="flex items-center gap-2">
              <span className="bg-[#DCFCE7] text-[#22C55E] px-1.5 py-0.5 rounded text-[10px] font-extrabold flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {percentage}
              </span>
              <span className="text-[11px] font-medium text-[#94A3B8]">{comparisonText}</span>
            </div>
          </div>
        </div>

        <div className="w-[120px]">
          <CustomSelect
            value={moneySpentRange}
            onChange={setMoneySpentRange}
            options={["Last 7 days", "Last 30 days"]}
            buttonClassName="w-full !px-3 !py-1.5 !text-[12px] !font-bold !text-[#475569] !border-[#E2E8F0]"
          />
        </div>
      </div>
      <div className="h-[280px] relative w-full mt-6 select-none">
        <Line data={moneySpentData} options={moneySpentOptions as any} />
      </div>
    </div>
  );
}
