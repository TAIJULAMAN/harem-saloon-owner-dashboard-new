"use client";

import React, { useState } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";

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
    <div className="fixed inset-0 bg-[#1E293B]/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg flex flex-col relative shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 pb-2">
          <h2 className="text-[16px] font-bold text-[#1E293B]">Schedule Post</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#1E293B] mb-2">
                Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors text-sm text-[#1E293B] appearance-none"
                  placeholder="Select date"
                />
                <CalendarIcon className="w-4 h-4 text-[#1E293B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#1E293B] mb-2">
                Time *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#635BFF] transition-colors text-sm text-[#1E293B]"
                placeholder="Enter time"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 sm:mt-12">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-lg border border-[#E2E8F0] text-[#64748B] font-bold text-sm hover:bg-[#F8FAFC] transition-colors flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(date, time)}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#635BFF] text-white font-bold text-sm shadow-md hover:bg-[#5249EC] transition-colors flex items-center justify-center"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
