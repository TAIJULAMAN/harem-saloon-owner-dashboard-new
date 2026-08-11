"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface CustomDateRangePickerProps {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  onRangeSelect: (start: string, end: string) => void;
}

export default function CustomDateRangePicker({ startDate, endDate, onRangeSelect }: CustomDateRangePickerProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    return startDate ? new Date(startDate) : new Date();
  });
  
  // Local state for tracking range selection in progress
  const [tempStart, setTempStart] = useState<Date | null>(startDate ? new Date(startDate) : null);
  const [tempEnd, setTempEnd] = useState<Date | null>(endDate ? new Date(endDate) : null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!tempStart || (tempStart && tempEnd)) {
      // Start a new range
      setTempStart(date);
      setTempEnd(null);
    } else {
      // Complete the range
      if (date < tempStart) {
        setTempStart(date);
        setTempEnd(tempStart);
      } else {
        setTempEnd(date);
      }
    }
  };

  const handleApply = () => {
    if (tempStart && tempEnd) {
      const startStr = tempStart.toISOString().split("T")[0];
      const endStr = tempEnd.toISOString().split("T")[0];
      onRangeSelect(startStr, endStr);
    }
  };

  const renderCalendar = () => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month); // 0 = Sun, 1 = Mon...
    
    const days = [];
    // Empty slots before 1st of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Actual days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      
      let isSelected = false;
      let isInRange = false;
      let isStart = false;
      let isEnd = false;

      if (tempStart && date.getTime() === tempStart.getTime()) {
        isSelected = true;
        isStart = true;
      }
      if (tempEnd && date.getTime() === tempEnd.getTime()) {
        isSelected = true;
        isEnd = true;
      }
      
      if (tempStart && tempEnd && date > tempStart && date < tempEnd) {
        isInRange = true;
      } else if (tempStart && !tempEnd && hoverDate && date > tempStart && date <= hoverDate) {
        isInRange = true; // Hover state for range visualization
      }

      let classes = "h-8 w-8 flex items-center justify-center text-[12px] cursor-pointer transition-colors relative z-10 ";
      
      if (isSelected) {
        classes += "bg-[#635BFF] text-white font-bold rounded-full ";
      } else if (isInRange) {
        classes += "bg-[#E0E7FF] text-[#1E293B] ";
      } else {
        classes += "text-[#64748B] hover:bg-gray-100 rounded-full ";
      }

      days.push(
        <div key={i} className="relative">
          {isInRange && !isStart && !isEnd && (
            <div className="absolute inset-0 bg-[#E0E7FF]"></div>
          )}
          {isStart && tempEnd && (
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#E0E7FF]"></div>
          )}
          {isEnd && tempStart && (
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[#E0E7FF]"></div>
          )}
          <div 
            className={classes}
            onClick={() => handleDateClick(date)}
            onMouseEnter={() => setHoverDate(date)}
            onMouseLeave={() => setHoverDate(null)}
          >
            {i}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col bg-white rounded-lg p-3">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[13px] font-bold text-[#1E293B]">
          {monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-[11px] font-semibold text-gray-400">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center mb-4">
        {renderCalendar()}
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center mt-2 border-t border-[#E2E8F0] pt-3">
        <div className="text-[11px] text-gray-500 font-medium">
          {tempStart ? tempStart.toLocaleDateString() : "Start"} 
          {" - "} 
          {tempEnd ? tempEnd.toLocaleDateString() : "End"}
        </div>
        <button 
          onClick={handleApply}
          disabled={!tempStart || !tempEnd}
          className="px-3 py-1.5 bg-[#635BFF] text-white text-[11px] font-bold rounded hover:bg-[#534dfd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
