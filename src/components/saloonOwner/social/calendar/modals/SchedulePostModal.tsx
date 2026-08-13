"use client";

import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";

interface SchedulePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
  initialDate?: string;
  initialTime?: string;
}

export function SchedulePostModal({ isOpen, onClose, onConfirm, initialDate, initialTime }: SchedulePostModalProps) {
  const [date, setDate] = useState(initialDate || "");
  const [time, setTime] = useState(initialTime || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#343C46]/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[8px] w-full max-w-[560px] flex flex-col relative shadow-2xl font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-[18px] font-bold text-[#1C2024]">Schedule Post</h2>
          <button
            onClick={onClose}
            className="text-[#8B929A] hover:text-[#1C2024] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-24">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Date Input */}
            <div>
              <label className="block text-[13px] font-bold text-[#1C2024] mb-2">
                Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 px-4 rounded-[6px] border border-[#E6E8EB] focus:outline-none focus:border-[#6B4EFF] focus:ring-1 focus:ring-[#6B4EFF] transition-colors text-[14px] text-[#343C46]"
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-[13px] font-bold text-[#1C2024] mb-2">
                Time *
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-11 px-4 rounded-[6px] border border-[#E6E8EB] focus:outline-none focus:border-[#6B4EFF] focus:ring-1 focus:ring-[#6B4EFF] transition-colors text-[14px] text-[#343C46]"
                  placeholder="--:-- --"
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 flex items-center justify-end gap-3 rounded-b-[8px]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[6px] border border-[#E6E8EB] bg-white text-[#636C75] font-bold text-[14px] hover:bg-[#F9FAFB] hover:text-[#343C46] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(date, time)}
            className="px-6 py-2.5 rounded-[6px] bg-[#6B4EFF] text-white font-bold text-[14px] hover:bg-[#5A3EE0] transition-colors"
          >
            Schedule
          </button>
        </div>
        
      </div>
    </div>
  );
}
