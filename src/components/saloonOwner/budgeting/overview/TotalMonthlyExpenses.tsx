import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ExpensesDoughnutChart } from "./ExpensesDoughnutChart";
import { LegendItem } from "./LegendItem";

export function TotalMonthlyExpenses() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 md:p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Total Monthly Expenses</h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4 mb-8 flex-1">
        <div className="text-center lg:text-left flex flex-col justify-center h-full pt-2">
          <div className="text-[36px] lg:text-[32px] xl:text-[40px] font-extrabold text-[#1E293B] mb-2 leading-tight tracking-tight">
            € 23,850
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-2 bg-[#F8FAFC] py-1.5 px-3 rounded-full w-fit mx-auto lg:mx-0 border border-[#E2E8F0]">
            <div className="w-5 h-5 bg-[#D1FAE5] text-[#10B981] flex items-center justify-center rounded-full shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <div className="text-[13px] font-bold text-[#10B981]">+12.5%</div>
            <div className="text-[13px] font-medium text-[#64748B]">vs last month</div>
          </div>
        </div>

        <div className="relative w-[200px] h-[200px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] shrink-0">
          <ExpensesDoughnutChart />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-3 pt-6 border-t border-[#F1F5F9] mt-auto">
        <LegendItem color="bg-[#635BFF]" label="Products" />
        <LegendItem color="bg-[#2CC8D6]" label="Consumables" />
        <LegendItem color="bg-[#F5B800]" label="Services" />
        <LegendItem color="bg-[#00C48C]" label="HR" />
        <LegendItem color="bg-[#D946EF]" label="Taxes" />
        <LegendItem color="bg-[#22C55E]" label="Internet" />
        <LegendItem color="bg-[#1E293B]" label="Utilities" />
      </div>
    </div>
  );
}

