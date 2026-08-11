"use client";

import React, { useState } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";

interface AddTimeOffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTimeOffModal({ isOpen, onClose }: AddTimeOffModalProps) {
  const [isRepeatChecked, setIsRepeatChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto relative z-10 shadow-xl flex flex-col">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between z-20">
          <h2 className="text-[18px] font-bold text-[#1E293B]">Add Time Off</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Type *</label>
            <div className="relative">
              <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] appearance-none focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all bg-white cursor-pointer">
                <option value="annual">Annual leave</option>
                <option value="sick">Sick leave</option>
                <option value="personal">Personal leave</option>
                <option value="maternity">Maternity leave</option>
                <option value="paternity">Paternity leave</option>
                <option value="bereavement">Bereavement leave</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Date *</label>
              <div className="relative">
                <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all pr-10" />
                <Calendar className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Date *</label>
              <div className="relative">
                <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all pr-10" />
                <Calendar className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Start Time *</label>
              <input type="time" defaultValue="09:00" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">End Time *</label>
              <input type="time" defaultValue="17:00" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="repeat-checkbox"
              className="w-4 h-4 text-[#635BFF] border-[#E2E8F0] rounded focus:ring-[#635BFF] cursor-pointer"
              checked={isRepeatChecked}
              onChange={(e) => setIsRepeatChecked(e.target.checked)}
            />
            <label htmlFor="repeat-checkbox" className="text-[14px] font-medium text-[#1E293B] cursor-pointer">Repeat</label>
          </div>

          {isRepeatChecked && (
            <div className="bg-[#F8FAFC] rounded-lg p-5 space-y-4 border border-[#E2E8F0]">
              <h4 className="text-[13px] font-bold text-[#1E293B]">Repeat frequency</h4>
              <div className="space-y-3">
                {[
                  { id: 'daily', label: 'Daily', sub: 'Repeat blocks of time a day' },
                  { id: 'weekly', label: 'Weekly', sub: 'Repeat on [Day] of every week' },
                  { id: 'biweekly', label: 'Every 2 weeks', sub: 'Repeat every 2 weeks on [Day]' },
                  { id: 'monthly', label: 'Monthly', sub: 'Repeat on date of every month' },
                  { id: 'quarterly', label: 'Quarterly', sub: 'Repeat every 3 months on date' },
                  { id: 'yearly', label: 'Yearly', sub: 'Repeat on [Date] of every year' },
                ].map((freq, idx) => (
                  <div key={freq.id} className="flex gap-3">
                    <input type="radio" name="repeat-freq" id={freq.id} defaultChecked={idx === 0} className="mt-1 w-4 h-4 text-[#635BFF] border-[#E2E8F0] focus:ring-[#635BFF] cursor-pointer" />
                    <div>
                      <label htmlFor={freq.id} className="text-[14px] font-medium text-[#1E293B] cursor-pointer block">{freq.label}</label>
                      <span className="text-[12px] text-[#94A3B8]">{freq.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Description (Optional)</label>
            <textarea
              placeholder="Add description or note"
              rows={3}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#635BFF] transition-all resize-none"
            ></textarea>
          </div>

          <div>
            <span className="inline-block bg-[#E0E7FF] text-[#635BFF] text-[12px] font-bold px-3 py-1 rounded-full">
              Time off total: 0h
            </span>
          </div>

          <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-4 flex gap-3">
            <div>
              <h4 className="text-[13px] font-bold text-[#92400E] mb-1">Warning</h4>
              <p className="text-[13px] text-[#B45309]">Online bookings cannot be placed during time off.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="bg-[#635BFF] text-white text-[14px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
