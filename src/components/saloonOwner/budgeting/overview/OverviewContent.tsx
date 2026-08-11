"use client";

import React, { useState } from "react";


import { OverviewHeader } from "./OverviewHeader";
import { WarningBanner } from "./WarningBanner";
import { KPICards } from "./KPICards";
import { TotalMonthlyExpenses } from "./TotalMonthlyExpenses";
import { UpcomingPayments } from "./UpcomingPayments";
import { DailySpendingTrends } from "./DailySpendingTrends";
import { IncomeAndExpensesReports } from "./IncomeAndExpensesReports";

export default function OverviewContent() {

  const [reportMonth, setReportMonth] = useState("February");

  return (
    <div className="space-y-5 font-manrope text-[#1E293B]">
      <OverviewHeader reportMonth={reportMonth} />
      <WarningBanner />
      <KPICards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalMonthlyExpenses />
        <UpcomingPayments />
      </div>
      <DailySpendingTrends />
      <IncomeAndExpensesReports reportMonth={reportMonth} setReportMonth={setReportMonth} />
    </div>
  );
}
