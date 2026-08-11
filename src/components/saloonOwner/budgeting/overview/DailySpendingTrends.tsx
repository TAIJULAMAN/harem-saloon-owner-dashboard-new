"use client";

import React, { useState } from "react";
import { DailySpendingBarChart } from "./BudgetingCharts";
import { CustomSelect } from "../../../common/CustomSelect";



export function DailySpendingTrends() {
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [spendingMonth, setSpendingMonth] = useState("May");

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 md:p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Daily Spending Trends</h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <CustomSelect
            value={timeFilter}
            options={["All Time", "This Year"]}
            onChange={setTimeFilter}
            className="w-full sm:min-w-[120px]"
            buttonClassName="w-full justify-between text-[13px] text-[#64748B] font-semibold py-2 sm:py-1.5 px-4"
            align="left"
          />
          <CustomSelect
            value={spendingMonth}
            options={["April", "May", "June"]}
            onChange={setSpendingMonth}
            className="w-full sm:min-w-[120px]"
            buttonClassName="w-full justify-between text-[13px] text-[#64748B] font-semibold py-2 sm:py-1.5 px-4"
            align="left"
          />
        </div>
      </div>

      <div className="relative mt-2 h-[300px] w-full flex-1">
        <DailySpendingBarChart month={spendingMonth} />
      </div>
    </div>
  );
}
