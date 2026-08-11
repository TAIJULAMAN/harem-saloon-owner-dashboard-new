"use client";

import React, { useState } from "react";
import { Search, Download, Eye } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/saloonOwner/common/Pagination";

type WorkedShiftRecord = {
  id: string;
  name: string;
  uploader: string;
  avatarBg: string;
  avatarUrl: string;
  role: string;
  hours: string;
  daysWorked: number;
  avgHours: string;
};

const initialRecords: WorkedShiftRecord[] = Array.from({ length: 10 }).map((_, index) => ({
  id: String(index + 1),
  name: "Maria Rodriguez",
  uploader: "Mario Rossi",
  avatarBg: ["bg-[#FCE7F3]", "bg-[#E2E8F0]", "bg-[#DCFCE7]", "bg-[#FEE2E2]", "bg-[#F3E8FF]"][index % 5],
  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Maria${index + 1}&backgroundColor=${["fce7f3", "e2e8f0", "dcfce7", "fee2e2", "f3e8ff"][index % 5]}`,
  role: "Staff",
  hours: "160h",
  daysWorked: 21,
  avgHours: "Dec 01, 2024", // Copied exactly from the mockup design
}));

export default function WorkedShiftsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(initialRecords.length / itemsPerPage);
  const paginatedRecords = initialRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Worked Shifts</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white"
              />
            </div>
            <button className="w-full sm:w-auto justify-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Team Member</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Role</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Hours (December)</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Days Worked</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">AVG Hours / Day</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.map((record) => (
                <tr key={record.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${record.avatarBg}`}>
                        <img src={record.avatarUrl} alt={record.name} className="w-8 h-8 object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{record.name}</div>
                        <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Uploaded by: {record.uploader}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold bg-[#FEF9C3] text-[#EAB308]">
                      {record.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{record.hours}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{record.daysWorked}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{record.avgHours}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Link
                        href={`/dashboard/team/worked-shifts/${record.id}`}
                        className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={initialRecords.length}
          itemsPerPage={itemsPerPage}
          itemName="members"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Summary Footer */}
      <div className="bg-[#F8FAFC] rounded-lg shadow-sm border border-[#E2E8F0] p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-[#1E293B]">Total Company Hours</span>
          <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
            160h
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-[#1E293B]">Average Hours per Employee</span>
          <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
            160h
          </span>
        </div>
      </div>
    </div>
  );
}
