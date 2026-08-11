"use client";

import { clientsData } from "@/data/dashboard";
import Image from "next/image";

export default function RecentAppointments() {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">
          Recent Appointments
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase">
                ID
              </th>
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase">
                Client
              </th>
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase">
                Service
              </th>
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase whitespace-nowrap">
                Scheduled Date
              </th>
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase">
                Price
              </th>
              <th className="py-5 px-6 text-xs font-bold text-[#1E293B] uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsData.map((client, index) => (
              <tr
                key={index}
                className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors group"
              >
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span className="text-[13px] font-bold text-[#1E293B]">
                    {client.id}
                  </span>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F1F5F9]">
                      <Image
                        src={client.avatar}
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#1E293B]">
                        {client.name}
                      </div>
                      <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                        {client.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span className="text-[13px] font-semibold text-[#64748B]">
                    {client.service}
                  </span>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span className="text-[13px] font-semibold text-[#64748B]">
                    {client.date}
                  </span>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span className="text-[13px] font-bold text-[#1E293B]">
                    {client.price}
                  </span>
                </td>
                <td className="px-6 py-4 border-r border-[#E2E8F0]">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${client.statusColor}`}
                  >
                    {client.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
