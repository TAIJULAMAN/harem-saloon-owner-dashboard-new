"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function CalendarTab() {
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "Day">("Month");

  // Mock days array to match screenshot (6 rows * 7 columns)
  const days = [
    { day: 25, isCurrentMonth: false }, { day: 26, isCurrentMonth: false }, { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true, isHighlighted: true }, { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false }, { day: 6, isCurrentMonth: false }
  ];

  const events = [
    // Fri 1 (index 5)
    { id: 1, dayIndex: 5, title: "Haircut (Client Na...", colorClass: "bg-[#FCE7F3] text-[#F43F5E]" },
    // Sat 9 (index 13)
    { id: 2, dayIndex: 13, title: "Haircut (Client Na...", colorClass: "bg-[#E0E7FF] text-[#635BFF]" },
    // Tue 12 (index 16)
    { id: 3, dayIndex: 16, title: "Haircut (Client Na...", colorClass: "bg-[#DCFCE7] text-[#22C55E]" },
    { id: 4, dayIndex: 16, title: "Haircut (Client Na...", colorClass: "bg-[#E0E7FF] text-[#635BFF]" },
    { id: 5, dayIndex: 16, title: "Haircut (Client Na...", colorClass: "bg-[#FEF9C3] text-[#EAB308]" },
    // Wed 13 (index 17)
    { id: 6, dayIndex: 17, title: "Haircut (Client Na...", colorClass: "bg-[#DCFCE7] text-[#22C55E]" },
    // Sat 16 (index 20)
    { id: 7, dayIndex: 20, title: "Haircut (Client Na...", colorClass: "bg-[#FEF9C3] text-[#EAB308]" },
    // Thu 28 (index 32)
    { id: 8, dayIndex: 32, title: "Haircut (Client Na...", colorClass: "bg-[#E0E7FF] text-[#635BFF]" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-6">

      {/* Calendar Controls */}
      <div className="flex items-center justify-between mb-8">
        {/* Month Navigation */}
        <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-lg p-1 shadow-sm mx-auto sm:mx-0">
          <button className="p-1.5 text-[#635BFF] hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[13px] font-medium text-[#635BFF] px-2 w-[60px] text-center">October</span>
          <button className="p-1.5 text-[#635BFF] hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggles */}
        <div className="hidden sm:flex bg-white border border-[#E2E8F0] rounded-lg p-1 shadow-sm">
          {["Month", "Week", "Day"].map((view) => (
            <button
              key={view}
              onClick={() => setViewMode(view as any)}
              className={`px-4 py-1.5 text-[12px] font-bold rounded-lg transition-colors ${viewMode === view
                ? "bg-[#E0E7FF] text-[#635BFF]"
                : "text-[#64748B] hover:text-[#1E293B]"
                }`}
            >
              {view}
            </button>
          ))}
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
            const dayEvents = events.filter(e => e.dayIndex === index);

            return (
              <div
                key={index}
                className={`border-b border-r border-[#E2E8F0] flex flex-col p-2 
                  ${(index + 1) % 7 === 0 ? 'border-r-0' : ''} 
                  ${index >= 35 ? 'border-b-0' : ''} 
                  ${dayObj.isHighlighted ? 'bg-[#F1F5F9]' : 'bg-white'}
                `}
              >
                <div className={`text-right text-[12px] font-medium mb-2 ${dayObj.isCurrentMonth ? 'text-[#94A3B8]' : 'text-[#CBD5E1]'}`}>
                  {dayObj.day}
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`${event.colorClass} rounded-lg px-2 py-1 text-[10px] font-bold truncate cursor-pointer hover:brightness-95 transition-all`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
