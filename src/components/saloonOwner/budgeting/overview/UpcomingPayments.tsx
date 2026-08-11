"use client";

import React, { useState } from "react";
import { UpcomingPaymentItem } from "./UpcomingPaymentItem";
import { CustomSelect } from "../../../common/CustomSelect";

export function UpcomingPayments() {
  const [upcomingMonth, setUpcomingMonth] = useState("February");

  const upcomingPaymentsMap: Record<string, any[]> = {
    "January": [
      { company: "Tim", category: "Internet", amount: "€ 120", date: "15/01/2025" },
      { company: "Enel", category: "Utilities", amount: "€ 240", date: "22/01/2025" }
    ],
    "February": [
      { company: "Wella", category: "Products", amount: "€ 670", date: "06/02/2025" },
      { company: "Wella", category: "Products", amount: "€ 670", date: "06/02/2025" },
      { company: "Wella", category: "Products", amount: "€ 435", date: "06/02/2025" },
    ],
    "March": [
      { company: "Wella", category: "Products", amount: "€ 890", date: "06/03/2025" },
      { company: "Tim", category: "Internet", amount: "€ 120", date: "15/03/2025" }
    ]
  };

  const months = ["January", "February", "March"];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Upcoming Payments</h2>

        <CustomSelect
          value={upcomingMonth}
          options={months}
          onChange={setUpcomingMonth}
          className="w-full sm:w-[130px]"
          buttonClassName="w-full justify-between text-[13px] text-[#64748B] font-semibold py-2 sm:py-1.5"
          align="left"
        />
      </div>

      <div className="space-y-4">
        {(upcomingPaymentsMap[upcomingMonth] || upcomingPaymentsMap["February"]).map((payment, idx) => (
          <UpcomingPaymentItem
            key={idx}
            company={payment.company}
            category={payment.category}
            amount={payment.amount}
            date={payment.date}
          />
        ))}
      </div>
    </div>
  );
}
