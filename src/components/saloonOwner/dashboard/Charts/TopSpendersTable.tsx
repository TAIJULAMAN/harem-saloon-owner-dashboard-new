"use client";

import React from "react";
import { Info, Award } from "lucide-react";
import Image from "next/image";

export default function TopSpendersTable() {
  const topSpenders = [
    {
      id: 1,
      name: "Eleanor Pena",
      phone: "+39 345 678 9123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor",
      visits: 24,
      totalSpent: "€ 4,500",
      lastVisit: "2 days ago",
    },
    {
      id: 2,
      name: "Courtney Henry",
      phone: "+39 345 678 9124",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney",
      visits: 18,
      totalSpent: "€ 3,200",
      lastVisit: "1 week ago",
    },
    {
      id: 3,
      name: "Bessie Cooper",
      phone: "+39 345 678 9125",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bessie",
      visits: 15,
      totalSpent: "€ 2,850",
      lastVisit: "3 weeks ago",
    },
    {
      id: 4,
      name: "Dianne Russell",
      phone: "+39 345 678 9126",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne",
      visits: 14,
      totalSpent: "€ 2,100",
      lastVisit: "1 month ago",
    },
    {
      id: 5,
      name: "Annette Black",
      phone: "+39 345 678 9127",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
      visits: 12,
      totalSpent: "€ 1,950",
      lastVisit: "2 days ago",
    },
  ];

  return (
    <div className="flex-1 w-full bg-white p-4 sm:p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="w-full sm:w-auto">
          <h2 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-2">
            Top Spenders (VIPs)
            <div className="group relative cursor-pointer">
              <Info className="w-4 h-4 text-gray-400 hover:text-[#635BFF] transition-colors" />
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-10">
                Actionable Insight: These top 10 clients generate disproportionate revenue. Target them with loyalty rewards and personal check-ins.
              </div>
            </div>
          </h2>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Highest lifetime value clients</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[#94A3B8] text-[11px] font-bold uppercase">
              <th className="pb-3 font-semibold">Client</th>
              <th className="pb-3 font-semibold text-center">Visits</th>
              <th className="pb-3 font-semibold text-center">Last Visit</th>
              <th className="pb-3 font-semibold text-right">Total Spent</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {topSpenders.map((client, index) => (
              <tr key={client.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0 border border-[#E2E8F0]">
                      <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                      {index < 3 && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F8C209] rounded-full border-2 border-white flex items-center justify-center">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1E293B] flex items-center gap-2">
                        {client.name}
                        {index === 0 && <span className="px-1.5 py-0.5 rounded-sm bg-[#FEF3C7] text-[#F59E0B] text-[9px] font-bold uppercase">#1</span>}
                      </div>
                      <div className="text-[11px] font-medium text-[#94A3B8]">{client.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="text-[13px] font-bold text-[#1E293B]">{client.visits}</span>
                </td>
                <td className="py-4 text-center">
                  <span className="text-[12px] font-semibold text-[#64748B]">{client.lastVisit}</span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-[13px] font-bold text-[#10B981]">{client.totalSpent}</span>
                </td>
                <td className="py-4 text-right">
                  <button className="px-3 py-1.5 bg-[#EEF2FF] text-[#635BFF] rounded text-[11px] font-bold hover:bg-[#E0E7FF] transition-colors">
                    Reward
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
