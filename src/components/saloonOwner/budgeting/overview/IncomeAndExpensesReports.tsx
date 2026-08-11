"use client";

import React from "react";
import {
  Package,
  Landmark,
  Wrench,
  Zap,
  Box,
  Users,
  Wifi,
} from "lucide-react";
import { ReportItem } from "./ReportItem";
import { CustomSelect } from "../../../common/CustomSelect";

interface IncomeAndExpensesReportsProps {
  reportMonth: string;
  setReportMonth: (val: string) => void;
}

export function IncomeAndExpensesReports({ reportMonth, setReportMonth }: IncomeAndExpensesReportsProps) {

  const reportDataMap: Record<string, any> = {
    "January": { prevMonth: "December 2023", currTotal: "+ € 21,500", prevTotal: "+ € 19,800", currExp: "- € 18,200", prevExp: "- € 17,900" },
    "February": { prevMonth: "January 2024", currTotal: "+ € 23,850", prevTotal: "+ € 21,500", currExp: "- € 23,850", prevExp: "- € 18,200" },
    "March": { prevMonth: "February 2024", currTotal: "+ € 25,100", prevTotal: "+ € 23,850", currExp: "- € 20,500", prevExp: "- € 23,850" }
  };

  const months = ["January", "February", "March"];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 md:p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Income and Expenses Reports</h2>

        <CustomSelect
          value={reportMonth}
          options={months}
          onChange={setReportMonth}
          className="w-full sm:w-[130px]"
          buttonClassName="w-full justify-between text-[13px] text-[#64748B] font-semibold py-2 sm:py-1.5 px-4"
          align="left"
        />
      </div>

      <div className="w-full overflow-x-auto flex-1">
        <div className="min-w-[600px]">
          {/* Header Row */}
          <div className="flex text-sm font-bold text-[#64748B] mb-4">
            <div className="flex-1"></div>
            <div className="w-32 text-right shrink-0">{reportMonth} 2024</div>
            <div className="w-32 text-right shrink-0">{reportDataMap[reportMonth]?.prevMonth}</div>
          </div>

          {/* Income Total */}
          <div className="flex items-center bg-[#F8FAFC] p-4 rounded-lg font-bold mb-6">
            <div className="flex-1">Total Income</div>
            <div className="w-32 text-right text-[#10B981] shrink-0">{reportDataMap[reportMonth]?.currTotal}</div>
            <div className="w-32 text-right text-[#10B981] shrink-0">{reportDataMap[reportMonth]?.prevTotal}</div>
          </div>

          <div className="flex text-sm font-bold text-[#64748B] mb-4 mt-8">
            <div className="flex-1"></div>
            <div className="w-32 text-right shrink-0">{reportMonth} 2024</div>
            <div className="w-32 text-right shrink-0">{reportDataMap[reportMonth]?.prevMonth}</div>
          </div>

          {/* Expenses Total */}
          <div className="flex items-center bg-[#F8FAFC] p-4 rounded-lg font-bold mb-4">
            <div className="flex-1">Total Expenses</div>
            <div className="w-32 text-right text-[#1E293B] shrink-0">{reportDataMap[reportMonth]?.currExp}</div>
            <div className="w-32 text-right text-[#1E293B] shrink-0">{reportDataMap[reportMonth]?.prevExp}</div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3">
            <ReportItem
              icon={<Wifi className="w-4 h-4 text-white" />}
              iconBg="bg-[#22C55E]"
              title="Internet"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Package className="w-4 h-4 text-white" />}
              iconBg="bg-[#635BFF]"
              title="Products"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Landmark className="w-4 h-4 text-white" />}
              iconBg="bg-[#EC4899]"
              title="Taxes"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Wrench className="w-4 h-4 text-white" />}
              iconBg="bg-[#EAB308]"
              title="Services"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Zap className="w-4 h-4 text-white" />}
              iconBg="bg-[#1E293B]"
              title="Utilities"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Users className="w-4 h-4 text-white" />}
              iconBg="bg-[#00C48C]"
              title="HR"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
            <ReportItem
              icon={<Box className="w-4 h-4 text-white" />}
              iconBg="bg-[#2CC8D6]"
              title="Consumables"
              currAmount={reportDataMap[reportMonth]?.currExp}
              prevAmount={reportDataMap[reportMonth]?.prevExp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}