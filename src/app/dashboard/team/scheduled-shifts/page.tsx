"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import EditShiftModal from "@/components/saloonOwner/team/EditShiftModal";
import DeleteShiftModal from "@/components/saloonOwner/team/DeleteShiftModal";
import AddTimeOffModal from "@/components/saloonOwner/team/AddTimeOffModal";
import AddBlockedTimeModal from "@/components/saloonOwner/team/AddBlockedTimeModal";
import AddClosedPeriodModal from "@/components/saloonOwner/team/AddClosedPeriodModal";

type Shift = {
  time: string;
};

type MemberSchedule = {
  id: string;
  name: string;
  hours: string;
  avatarBg: string;
  avatarUrl: string;
  shifts: (Shift | null)[];
};

const initialSchedules: MemberSchedule[] = [
  {
    id: "1",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#FCE7F3]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=fce7f3",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#E2E8F0]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=e2e8f0",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#DCFCE7]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria3&backgroundColor=dcfce7",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#FEE2E2]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria4&backgroundColor=fee2e2",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "5",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#F3E8FF]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria5&backgroundColor=f3e8ff",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "6",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#E0F2FE]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria6&backgroundColor=e0f2fe",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "7",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#FEE2E2]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria7&backgroundColor=fee2e2",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
  {
    id: "8",
    name: "Maria Rodriguez",
    hours: "52h",
    avatarBg: "bg-[#F1F5F9]",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria8&backgroundColor=f1f5f9",
    shifts: Array(7).fill({ time: "10:00 - 19:00" }),
  },
];



export default function ScheduledShiftsPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2024, 7, 11)); // Aug 11, 2024

  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const formatHeaderDateRange = () => {
    const startMonth = fullMonthNames[currentWeekStart.getMonth()];
    const startDay = currentWeekStart.getDate();
    const endMonth = fullMonthNames[weekEnd.getMonth()];
    const endDay = weekEnd.getDate();

    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  };

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    const dayName = dayNames[date.getDay()];
    const dateNum = date.getDate();
    const monthName = monthNames[date.getMonth()];
    return `${dayName}, ${dateNum} ${monthName}`;
  });

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const [activeShiftMenu, setActiveShiftMenu] = useState<{ memberId: string, dayIndex: number } | null>(null);
  const shiftMenuRef = useRef<HTMLDivElement>(null);

  const [schedules, setSchedules] = useState<MemberSchedule[]>(initialSchedules);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(schedules.length / itemsPerPage);
  const paginatedSchedules = schedules.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const [isBlockedTimeModalOpen, setIsBlockedTimeModalOpen] = useState(false);
  const [isClosedPeriodModalOpen, setIsClosedPeriodModalOpen] = useState(false);

  // Active shift logic
  const [activeShiftForEdit, setActiveShiftForEdit] = useState<{ memberId: string, dayIndex: number, time: string } | null>(null);

  const handleSaveEdit = (startTime: string, endTime: string) => {
    if (activeShiftForEdit) {
      setSchedules(prev => prev.map(s => {
        if (s.id === activeShiftForEdit.memberId) {
          const newShifts = [...s.shifts];
          newShifts[activeShiftForEdit.dayIndex] = { time: `${startTime} - ${endTime}` };
          return { ...s, shifts: newShifts };
        }
        return s;
      }));
    }
  };

  const handleConfirmDelete = () => {
    if (activeShiftForEdit) {
      setSchedules(prev => prev.map(s => {
        if (s.id === activeShiftForEdit.memberId) {
          const newShifts = [...s.shifts];
          newShifts[activeShiftForEdit.dayIndex] = null;
          return { ...s, shifts: newShifts };
        }
        return s;
      }));
      setIsDeleteModalOpen(false);
      setActiveShiftForEdit(null);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
      if (shiftMenuRef.current && !shiftMenuRef.current.contains(event.target as Node)) {
        setActiveShiftMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShiftClick = (e: React.MouseEvent, memberId: string, dayIndex: number) => {
    e.stopPropagation();
    if (activeShiftMenu?.memberId === memberId && activeShiftMenu?.dayIndex === dayIndex) {
      setActiveShiftMenu(null);
    } else {
      setActiveShiftMenu({ memberId, dayIndex });
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Scheduled Shifts</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto justify-center bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <div className="relative w-full sm:w-auto" ref={addMenuRef}>
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="w-full sm:w-auto justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors"
            >
              Add
              <ChevronDown className="w-4 h-4" />
            </button>

            {isAddMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#E2E8F0] py-2 z-20">
                <button
                  onClick={() => { setIsTimeOffModalOpen(true); setIsAddMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors"
                >
                  Add Time Off
                </button>
                <button
                  onClick={() => { setIsBlockedTimeModalOpen(true); setIsAddMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors"
                >
                  Add Blocked Time
                </button>
                <button
                  onClick={() => { setIsClosedPeriodModalOpen(true); setIsAddMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors"
                >
                  Business Closed Period
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="inline-flex items-center bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-1.5">
        <button onClick={prevWeek} className="p-2 text-[#64748B] hover:text-[#635BFF] hover:bg-[#F1F5F9] rounded-lg transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-6 text-[13px] font-bold text-[#635BFF]">
          {formatHeaderDateRange()}
        </span>
        <button onClick={nextWeek} className="p-2 text-[#64748B] hover:text-[#635BFF] hover:bg-[#F1F5F9] rounded-lg transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-64">Member</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx} className="px-4 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] text-center w-[160px] last:border-r-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedSchedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 border-r border-[#E2E8F0] bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${schedule.avatarBg}`}>
                        <img src={schedule.avatarUrl} alt={schedule.name} className="w-8 h-8 object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-[#1E293B] leading-tight">{schedule.name}</div>
                        <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">{schedule.hours}</div>
                      </div>
                    </div>
                  </td>
                  {schedule.shifts.map((shift, idx) => (
                    <td key={idx} className="px-4 py-3 border-r border-[#E2E8F0] bg-white last:border-r-0 relative">
                      {shift && (
                        <div className="relative">
                          <button
                            onClick={(e) => handleShiftClick(e, schedule.id, idx)}
                            className={`w-full py-2 px-3 rounded-lg text-[11px] font-bold transition-colors ${activeShiftMenu?.memberId === schedule.id && activeShiftMenu?.dayIndex === idx
                              ? "bg-[#C7D2FE] text-[#4F46E5]"
                              : "bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF]"
                              }`}
                          >
                            {shift.time}
                          </button>

                          {/* Context Menu Popover */}
                          {activeShiftMenu?.memberId === schedule.id && activeShiftMenu?.dayIndex === idx && (
                            <div
                              ref={shiftMenuRef}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#E2E8F0] py-1.5 z-30"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveShiftForEdit({ memberId: schedule.id, dayIndex: idx, time: shift.time });
                                  setIsEditModalOpen(true);
                                  setActiveShiftMenu(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-[12px] font-semibold text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors flex items-center gap-3"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                                Edit Shift
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveShiftForEdit({ memberId: schedule.id, dayIndex: idx, time: shift.time });
                                  setIsDeleteModalOpen(true);
                                  setActiveShiftMenu(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-[12px] font-semibold text-[#475569] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors flex items-center gap-3"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
                                Delete Shift
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={schedules.length}
          itemsPerPage={itemsPerPage}
          itemName="members"
          onPageChange={setCurrentPage}
        />
      </div>

      <EditShiftModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        initialTime={activeShiftForEdit?.time}
      />

      <DeleteShiftModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <AddTimeOffModal
        isOpen={isTimeOffModalOpen}
        onClose={() => setIsTimeOffModalOpen(false)}
      />

      <AddBlockedTimeModal
        isOpen={isBlockedTimeModalOpen}
        onClose={() => setIsBlockedTimeModalOpen(false)}
        onSave={() => { }}
      />

      <AddClosedPeriodModal
        isOpen={isClosedPeriodModalOpen}
        onClose={() => setIsClosedPeriodModalOpen(false)}
        onSave={() => { }}
      />
    </div>
  );
}
