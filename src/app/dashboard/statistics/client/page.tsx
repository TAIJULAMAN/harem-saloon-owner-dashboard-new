"use client";

import React, { useState } from "react";
import {
  Download,
} from "lucide-react";
import { CustomSelect } from "@/components/common/CustomSelect";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { StatCardsRow } from "@/components/saloonOwner/Statistics/client/StatCardsRow";
import { MoneySpentChart } from "@/components/saloonOwner/Statistics/client/MoneySpentChart";
import { VisitFrequencyChart } from "@/components/saloonOwner/Statistics/client/VisitFrequencyChart";
import { AgeGroupChart } from "@/components/saloonOwner/Statistics/client/AgeGroupChart";
import { MostLoyalCustomers } from "@/components/saloonOwner/Statistics/client/MostLoyalCustomers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "VIP" | "Active" | "New" | "At Risk";
  totalVisits: number;
  totalSpend: number;
  lastVisit: string;
  preferredStylist: string;
  bookingHistory: {
    date: string;
    service: string;
    stylist: string;
    cost: number;
  }[];
}

export default function ClientStatusPage() {
  const [teamSelection, setTeamSelection] = useState("All Clients");

  return (
    <div className="space-y-8 pb-12 text-left relative">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <h1 className="text-[16px] font-bold text-[#1E293B] font-manrope ml-2">Client Statistics</h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            <div className="w-full sm:w-[140px]">
              <CustomSelect
                value={teamSelection}
                onChange={setTeamSelection}
                options={["All Clients", "VIP Only"]}
                buttonClassName="w-full !bg-[#EEF2FF] !border-none !text-[#635BFF] !text-[13px] !font-bold !px-4 !py-2.5 !rounded-lg"
              />
            </div>

            <button className="w-full sm:w-auto bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Statistics
            </button>
          </div>
        </div>
      </div>
      <StatCardsRow />
      <MoneySpentChart />

      {/* Age Group & Visit Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Group */}
        <AgeGroupChart />
        <VisitFrequencyChart />
      </div>
      <MostLoyalCustomers />
    </div>
  );
}
