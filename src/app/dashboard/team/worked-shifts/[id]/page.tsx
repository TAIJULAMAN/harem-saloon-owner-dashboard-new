"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Home, Clock, Calendar as CalendarIcon, Activity, CalendarDays, Edit2, Trash2, ChevronDown, Plus } from "lucide-react";
import AddWorkedShiftModal from "@/components/saloonOwner/team/AddWorkedShiftModal";
import EditWorkedShiftModal from "@/components/saloonOwner/team/EditWorkedShiftModal";
import DeleteShiftModal from "@/components/saloonOwner/team/DeleteShiftModal";

export default function WorkedShiftsDetailsPage() {
  const initialShifts = [
    { id: 1, date: "Dec 01, 2024", day: "Sunday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hours: "8h", total: "8h" },
    { id: 2, date: "Dec 01, 2024", day: "Monday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hours: "8h", total: "8h" },
    { id: 3, date: "Dec 01, 2024", day: "Tuesday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hours: "8h", total: "8h" },
  ];

  const [shifts, setShifts] = useState(initialShifts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeShiftForEdit, setActiveShiftForEdit] = useState<any>(null);

  const [filterMonth, setFilterMonth] = useState("December");
  const [filterYear, setFilterYear] = useState("2024");
  const [filterRange, setFilterRange] = useState("");

  const filteredShifts = shifts.filter(shift => {
    if (filterRange) {
      return shift.date.toLowerCase().includes(filterRange.toLowerCase());
    }
    let monthMatch = true;
    if (filterMonth !== "All") {
      const shortMonth = filterMonth.substring(0, 3);
      monthMatch = shift.date.startsWith(shortMonth);
    }
    let yearMatch = true;
    if (filterYear !== "All") {
      yearMatch = shift.date.endsWith(filterYear);
    }
    return monthMatch && yearMatch;
  });

  const handleAddShift = (date: string, timeIn: string, timeOut: string) => {
    const newShift = {
      id: shifts.length > 0 ? Math.max(...shifts.map(s => s.id)) + 1 : 1,
      date: date || "Dec 01, 2024",
      day: "Custom",
      shifts: 1,
      timeIn: timeIn || "09:00",
      timeOut: timeOut || "18:00",
      hours: "8h",
      total: "8h"
    };
    setShifts([...shifts, newShift]);
  };

  const handleEditShift = (date: string, timeIn: string, timeOut: string) => {
    if (activeShiftForEdit) {
      setShifts(shifts.map(s => {
        if (s.id === activeShiftForEdit.id) {
          return { ...s, date, timeIn, timeOut };
        }
        return s;
      }));
    }
  };

  const handleDeleteShift = () => {
    if (activeShiftForEdit) {
      setShifts(shifts.filter(s => s.id !== activeShiftForEdit.id));
      setIsDeleteModalOpen(false);
      setActiveShiftForEdit(null);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex justify-between items-center">
        <Link
          href="/dashboard/team/worked-shifts"
          className="flex items-center gap-2 text-[#1E293B] hover:text-[#635BFF] transition-colors font-bold text-[14px]"
        >
          <ChevronLeft className="w-4 h-4" />
          View Details
        </Link>
      </div>

      {/* Profile & Stats Block */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-6 sm:mb-8 w-full">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaF&backgroundColor=fce7f3" alt="Maria Fernandez" className="w-14 h-14 rounded-lg object-cover bg-[#FCE7F3] mix-blend-multiply shrink-0" />
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-[#1E293B] truncate">Maria Fernandez</h2>
            <p className="text-[13px] text-[#94A3B8] font-medium mt-0.5 truncate">maria@gmail.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#EEF2FF] rounded-lg p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#635BFF] flex items-center justify-center text-white shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Total Hours</span>
            </div>
            <div className="text-[28px] font-bold text-[#1E293B] relative z-10">165h</div>
          </div>

          <div className="bg-[#F0FDF4] rounded-lg p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#2DD4BF] flex items-center justify-center text-white shrink-0">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Days Worked</span>
            </div>
            <div className="text-[28px] font-bold text-[#1E293B] relative z-10">21</div>
          </div>

          <div className="bg-[#F0FDF4] rounded-lg p-6 relative overflow-hidden sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#4ADE80] flex items-center justify-center text-white shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-[#1E293B]">Avg Hour/Day</span>
            </div>
            <div className="text-[28px] font-bold text-[#1E293B] relative z-10">7.9h</div>
          </div>
        </div>
      </div>

      {/* Daily Shifts Table Block */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="p-4 sm:p-6 pb-4 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4">
          <h3 className="text-[15px] font-bold text-[#1E293B] mb-2 xl:mb-0 shrink-0">Daily Shifts</h3>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            {/* Filter Group */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-[130px]">
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white cursor-pointer"
                >
                  <option>All Months</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative flex-1 sm:flex-none sm:w-[100px]">
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white cursor-pointer"
                >
                  <option>All</option>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <CalendarDays className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Custom range..."
                value={filterRange}
                onChange={(e) => setFilterRange(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors shadow-sm shadow-[#635BFF]/20 whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Shift
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Date</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Day of Week</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Shifts</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Time In</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Time Out</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Hours Worked</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">Daily Total</th>
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.date}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.day}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-[#1E293B]">
                      <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>
                      {shift.shifts}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.timeIn}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.timeOut}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.hours}</td>
                  <td className="px-6 py-4 border-r border-[#E2E8F0] text-[13px] text-[#1E293B] font-medium">{shift.total}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setActiveShiftForEdit(shift);
                          setIsEditModalOpen(true);
                        }}
                        className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setActiveShiftForEdit(shift);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-[#64748B] hover:text-[#EF4444] transition-colors p-1.5 rounded-lg hover:bg-[#F1F5F9] inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats Bar */}
        <div className="bg-[#F8FAFC] p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#1E293B]">Total Days Worked</span>
            <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
              21 Days
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#1E293B]">Total Shifts</span>
            <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
              2
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[14px] font-bold text-[#1E293B]">Monthly Total</span>
            <span className="bg-[#635BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
              165h
            </span>
          </div>
        </div>
      </div>

      <AddWorkedShiftModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddShift}
      />

      <EditWorkedShiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditShift}
        initialData={activeShiftForEdit}
      />

      <DeleteShiftModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteShift}
      />
    </div>
  );
}
