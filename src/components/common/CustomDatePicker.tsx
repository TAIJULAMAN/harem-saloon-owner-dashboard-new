"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function CustomDatePicker({ value, onChange, placeholder = "Select date", className = "" }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    return date.getDate() === value.getDate() && date.getMonth() === value.getMonth() && date.getFullYear() === value.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between px-4 py-2.5 bg-white border ${isOpen ? 'border-[#635BFF]' : 'border-[#E2E8F0]'} rounded-lg text-[13px] font-semibold outline-none transition-colors hover:border-[#635BFF] ${value ? 'text-[#1E293B]' : 'text-[#94A3B8]'}`}
      >
        <span>{value ? formatDate(value) : placeholder}</span>
        <CalendarIcon className="w-4 h-4 text-[#1E293B]" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-1.5 w-[280px] left-0 sm:right-auto bg-white border border-[#E2E8F0] rounded-lg shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#64748B]" />
            </button>
            <span className="text-[13px] font-bold text-[#1E293B]">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-[11px] font-bold text-[#94A3B8]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, i) => (
              <div key={i} className="flex justify-center">
                {date ? (
                  <button
                    type="button"
                    onClick={() => {
                      onChange(date);
                      setIsOpen(false);
                    }}
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${
                      isSelected(date)
                        ? "bg-[#635BFF] text-white"
                        : isToday(date)
                        ? "bg-[#EEF2FF] text-[#635BFF]"
                        : "text-[#1E293B] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-7 h-7" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
