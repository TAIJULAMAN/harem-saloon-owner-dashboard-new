"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  ChevronDown,
  X
} from "lucide-react";

export default function ScheduledShiftsTab() {
  const [isMassEditMode, setIsMassEditMode] = useState(false);
  const [isMassEditModalOpen, setIsMassEditModalOpen] = useState(false);
  const [isAddShiftModalOpen, setIsAddShiftModalOpen] = useState(false);
  const [hoveredShiftId, setHoveredShiftId] = useState<number | null>(null);

  // Mock days array to match screenshot
  // 6 rows * 7 columns = 42 cells
  // Sun to Sat
  const days = [
    { day: 25, isCurrentMonth: false }, { day: 26, isCurrentMonth: false }, { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true, isHighlighted: true }, { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false }, { day: 6, isCurrentMonth: false }
  ];

  // Mock shifts mapped to days (just array index for simplicity)
  // Day index 1 (Mon 26)
  // Day index 2 (Tue 27)
  // Day index 3 (Wed 28)
  // Day index 4 (Thu 29)
  // Day index 5 (Fri 1)
  const shifts = [
    { id: 1, dayIndex: 1, time: "18:00 - 19:00" },
    { id: 2, dayIndex: 1, time: "18:00 - 19:00" },
    { id: 3, dayIndex: 2, time: "10:00 - 19:00" },
    { id: 4, dayIndex: 3, time: "10:00 - 19:00" },
    { id: 5, dayIndex: 3, time: "10:00 - 19:00" },
    { id: 6, dayIndex: 4, time: "18:00 - 19:00" },
    { id: 7, dayIndex: 5, time: "10:00 - 19:00" },
    { id: 8, dayIndex: 5, time: "10:00 - 19:00" },
  ];

  const toggleMassEdit = () => {
    setIsMassEditMode(!isMassEditMode);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6">

      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
        <h2 className="text-[18px] font-bold text-[#1E293B]">Scheduled Shifts</h2>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {!isMassEditMode ? (
            <>
              <button
                onClick={toggleMassEdit}
                className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
              >
                Edit Shifts
              </button>
              <button
                onClick={() => setIsAddShiftModalOpen(true)}
                className="bg-[#635BFF] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span> Add Shift
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleMassEdit}
                className="px-4 py-2 bg-white border border-[#635BFF] rounded-lg text-[13px] font-bold text-[#635BFF] hover:bg-[#F8FAFC] transition-colors"
              >
                Continue Editing
              </button>
              <button className="px-4 py-2 bg-[#FFE4E6] rounded-lg text-[13px] font-bold text-[#E11D48] hover:bg-[#FECDD3] transition-colors">
                Mass Deletion
              </button>
              <button
                onClick={() => setIsAddShiftModalOpen(true)}
                className="bg-[#635BFF] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span> Add Shift
              </button>
            </>
          )}
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
        <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-lg p-1 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
          <button className="p-1.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[13px] font-bold text-[#635BFF] px-2 uppercase">October</span>
          <button className="p-1.5 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#64748B]">Extract shifts (csv)</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:ring-1 focus:ring-[#635BFF]">
                <option>CVS</option>
                <option>PDF</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <button className="bg-[#E0E7FF] text-[#635BFF] px-4 py-1.5 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full border border-[#E2E8F0] rounded-lg overflow-x-auto bg-white">
        <div className="min-w-[700px]">
          {/* Days of week header */}
          <div className="grid grid-cols-7 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-[12px] font-bold text-[#64748B]">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 auto-rows-[minmax(120px,_auto)] sm:auto-rows-[minmax(140px,_auto)]">
          {days.map((dayObj, index) => {
            const dayShifts = shifts.filter(s => s.dayIndex === index);

            return (
              <div
                key={index}
                className={`border-b border-r border-[#E2E8F0] relative flex flex-col p-2 
                  ${(index + 1) % 7 === 0 ? 'border-r-0' : ''} 
                  ${index >= 35 ? 'border-b-0' : ''} 
                  ${dayObj.isHighlighted ? 'bg-[#F1F5F9]' : 'bg-white'}
                `}
              >
                <div className={`text-right text-[12px] font-medium mb-1 ${dayObj.isCurrentMonth ? 'text-[#94A3B8]' : 'text-[#CBD5E1]'}`}>
                  {dayObj.day}
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  {dayShifts.map(shift => (
                    <div
                      key={shift.id}
                      className="relative group"
                      onMouseEnter={() => !isMassEditMode && setHoveredShiftId(shift.id)}
                      onMouseLeave={() => setHoveredShiftId(null)}
                    >
                      <div className="bg-[#E0E7FF] text-[#635BFF] rounded-lg px-2 py-1.5 text-[11px] font-bold flex items-center justify-center text-center cursor-pointer hover:bg-[#C7D2FE] transition-colors relative">
                        {isMassEditMode && (
                          <input
                            type="checkbox"
                            className="absolute left-2 w-3 h-3 rounded border-[#635BFF] text-[#635BFF] focus:ring-[#635BFF]"
                            defaultChecked={index === 1} // Mock check for first couple to match design
                          />
                        )}
                        {shift.time}
                      </div>

                      {/* Popover on hover (Normal Mode) */}
                      {!isMassEditMode && hoveredShiftId === shift.id && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[120px] bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-10">
                          <button className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#06B6D4] transition-colors">
                            <Edit2 className="w-3 h-3 text-[#06B6D4]" /> Edit Shift
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-[#64748B] hover:bg-[#FFF1F2] hover:text-[#EF4444] transition-colors">
                            <Trash2 className="w-3 h-3 text-[#FCA5A5]" /> Delete Shift
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {dayShifts.length > 0 && (
                    <div className="text-center text-[10px] text-[#94A3B8] font-medium mt-1">
                      Total: <span className="text-[#1E293B] font-bold">10h</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Mass Editing Modal */}
      {isMassEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMassEditModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative z-10 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1E293B]">Mass Editing</h2>
              <button onClick={() => setIsMassEditModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-4">
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                      <option>09:00</option>
                      <option>10:00</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                      <option>17:00</option>
                      <option>18:00</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <button className="p-2.5 rounded-lg border border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEE2E2] transition-colors sm:mb-0.5 w-full sm:w-auto flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <button className="text-[#635BFF] text-[13px] font-bold hover:underline">
                Add a Shift
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsMassEditModalOpen(false)}
                className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Shift Modal */}
      {isAddShiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddShiftModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative z-10 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1E293B]">Add Shift</h2>
              <button onClick={() => setIsAddShiftModalOpen(false)} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Schedule Type *</label>
                <div className="relative">
                  <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                    <option>Select time</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Date *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select Date</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#1E293B] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
                      <option>Never</option>
                      <option>Specific Date</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="w-full sm:flex-1">
                  <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Time *</label>
                  <div className="relative">
                    <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                      <option>Select time</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAddShiftModalOpen(false)}
                className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
