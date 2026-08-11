import React from "react";
import { TrendingDown, TrendingUp, CreditCard, CircleDollarSign } from "lucide-react";
import { KPICard } from "./KPICard";
import BriefcaseDollarIcon from "@/components/svg/BriefcaseDollarIcon";

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <KPICard
        title="Total Monthly Expenses"
        value="€ 23,850"
        trend="+12.5% from last month"
        icon={<BriefcaseDollarIcon className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-b from-[#635BFF1F] to-[#635BFF08]"
        iconBg="bg-[#635BFF]"
      />
      <KPICard
        title="Highest Expense of the Month"
        value="€ 5,535.52"
        trend="Products • Wella"
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-b from-[#FF669221] to-[#FF669208]"
        iconBg="bg-[#FF6B8B]"
      />
      <KPICard
        title="Total Number of Transactions"
        value="23"
        trend="+18.5% from last month"
        icon={<CreditCard className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-b from-[#16CDC721] to-[#16CDC708]"
        iconBg="bg-[#13D0B4]"
      />
      <KPICard
        title="Average Daily Spending"
        value="€ 435"
        trend="+10% from last month"
        icon={<CircleDollarSign className="w-5 h-5 text-white" />}
        bgColor="bg-gradient-to-b from-[#F8C20921] to-[#F8C20908]"
        iconBg="bg-[#FBBF24]"
      />
    </div>
  );
}
