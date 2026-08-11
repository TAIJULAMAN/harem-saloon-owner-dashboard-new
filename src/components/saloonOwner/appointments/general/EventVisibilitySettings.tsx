"use client";

import React from "react";
import { Check } from "lucide-react";
import { CustomSelect } from "../CustomSelect";

interface EventVisibilitySettingsProps {
  showWeekends: boolean;
  setShowWeekends: (val: boolean) => void;
  showCancelledEvents: boolean;
  setShowCancelledEvents: (val: boolean) => void;
  showCompletedEvents: boolean;
  setShowCompletedEvents: (val: boolean) => void;
  startOfWeekend: string;
  setStartOfWeekend: (val: string) => void;
}

export default function EventVisibilitySettings({
  showWeekends,
  setShowWeekends,
  showCancelledEvents,
  setShowCancelledEvents,
  showCompletedEvents,
  setShowCompletedEvents,
  startOfWeekend,
  setStartOfWeekend,
}: EventVisibilitySettingsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <h3 className="text-[13px] font-extrabold text-[#1E293B] uppercase tracking-wider">
        Events (Visibility)
      </h3>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!showWeekends}
            onChange={(e) => setShowWeekends(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
              showWeekends
                ? "bg-[#635BFF] border-[#635BFF] text-white"
                : "bg-white border-[#CBD5E1] text-transparent hover:border-[#635BFF]"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B] transition-colors pt-0.5">
            Show weekends
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!showCancelledEvents}
            onChange={(e) => setShowCancelledEvents(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
              showCancelledEvents
                ? "bg-[#635BFF] border-[#635BFF] text-white"
                : "bg-white border-[#CBD5E1] text-transparent hover:border-[#635BFF]"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B] transition-colors pt-0.5">
            Show cancelled events
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!showCompletedEvents}
            onChange={(e) => setShowCompletedEvents(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
              showCompletedEvents
                ? "bg-[#635BFF] border-[#635BFF] text-white"
                : "bg-white border-[#CBD5E1] text-transparent hover:border-[#635BFF]"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B] transition-colors pt-0.5">
            Show completed events
          </span>
        </label>

        <div className="space-y-1.5 pt-2">
          <label className="text-[12px] font-bold text-[#475569]">
            Start of the weekend *
          </label>
          <CustomSelect
            value={startOfWeekend}
            onChange={setStartOfWeekend}
            options={["Sunday", "Saturday", "Friday"]}
          />
        </div>
      </div>
    </div>
  );
}
