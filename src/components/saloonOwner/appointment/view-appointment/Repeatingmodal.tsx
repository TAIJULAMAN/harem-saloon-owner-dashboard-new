"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
type FrequencyType = "Daily" | "Weekly" | "Monthly" | "Yearly";
type EndType = "Never" | "After" | "In";
type DayOfWeek = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

interface RepeatingModalProps {
  open: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
const FREQUENCIES: FrequencyType[] = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function RepeatingModal({ open, onClose }: RepeatingModalProps) {
  const [frequency, setFrequency] = useState<FrequencyType>("Weekly");
  const [repeatEvery, setRepeatEvery] = useState<number>(1);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(["Mon"]);
  const [endType, setEndType] = useState<EndType>("Never");
  const [afterTimes, setAfterTimes] = useState<number>(1);
  const [inDate, setInDate] = useState<string>("");

  if (!open) return null;

  function toggleDay(day: DayOfWeek): void {
    setSelectedDays((prev: DayOfWeek[]) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  function buildPreviewFrequency(): string {
    if (frequency === "Daily")
      return `Every ${repeatEvery > 1 ? `${repeatEvery} days` : "day"}`;
    if (frequency === "Monthly")
      return `Every ${repeatEvery > 1 ? `${repeatEvery} months` : "month"}`;
    if (frequency === "Yearly")
      return `Every ${repeatEvery > 1 ? `${repeatEvery} years` : "year"}`;
    if (selectedDays.length === 0) return "Every week";
    if (selectedDays.length === 7) return "Every day";
    if (selectedDays.length === 1) return `Every ${selectedDays[0]}`;
    return `Every ${selectedDays.join(", ")}`;
  }

  function buildPreviewCount(): string {
    if (endType === "Never") return "âˆž";
    if (endType === "After" && afterTimes) return String(afterTimes);
    if (endType === "In" && inDate) return inDate;
    return "âˆž";
  }

  function handleUnitLabel(): string {
    if (frequency === "Daily") return "day";
    if (frequency === "Monthly") return "month";
    if (frequency === "Yearly") return "year";
    return "week";
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(41,52,61,0.35)", backdropFilter: "blur(2px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full overflow-y-auto max-w-[746px]">
        {/* â”€â”€ Header â”€â”€ */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5">
          <p className="text-lg font-bold font-manrope text-[#29343D]">
            Set as Repeating
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          >
            <X size={16} color="#29343D" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* â”€â”€ Preview card â”€â”€ */}
          <div className="border border-[#EFF4FA] rounded-xl p-5">
            <p className="text-sm font-bold font-manrope text-[#29343D] mb-6">
              Preview
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-manrope text-[#999]">Frequency</p>
                <span className="px-2 py-1 bg-[#EBFAF0] text-[#36C76C] text-xs font-semibold font-manrope rounded-[8px]">
                  {buildPreviewFrequency()}
                </span>
              </div>
              <div>
                <p className="text-xs font-manrope text-[#999]">
                  Number of appointments
                </p>
                <p className="text-[16px] font-semibold font-manrope text-[#29343D]">
                  {buildPreviewCount()}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EFF4FA]" />

          {/* â”€â”€ Frequency â”€â”€ */}
          <div>
            <p className="text-sm font-semibold font-manrope text-[#29343D] mb-4">
              Frequency
            </p>
            <div className="grid grid-cols-4 gap-4">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`py-4 rounded-xl text-sm font-semibold font-manrope border transition-all cursor-pointer ${
                    frequency === f
                      ? "border-[#635BFF] bg-[#F4F3FF] text-[#635BFF]"
                      : "border-[#EFF4FA] bg-[#F6F7F9] text-[#29343D] hover:border-[#DDDBFF]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#EFF4FA]" />

          {/* â”€â”€ Repetition details â”€â”€ */}
          <div>
            <p className="text-sm font-semibold font-manrope text-[#29343D] mb-4">
              Repetition details
            </p>

            {/* Repeat every N unit */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-manrope text-[#98A4AE]">
                Repeat every
              </span>
              <input
                type="number"
                min={1}
                value={repeatEvery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRepeatEvery(Math.max(1, Number(e.target.value)))
                }
                className="w-14 text-center text-sm font-semibold font-manrope text-[#29343D] border border-[#E0E6EB] rounded-[8px] py-1.5 outline-none focus:border-[#635BFF] transition-colors"
              />
              <span className="text-sm font-manrope text-[#98A4AE]">
                {handleUnitLabel()}
              </span>
            </div>

            {/* Days of week â€” Weekly only */}
            {frequency === "Weekly" && (
              <div>
                <p className="text-sm font-manrope text-[#29343D] mb-2 font-semibold">
                  Days of the week
                </p>
                <div className="flex gap-4 flex-wrap">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-7 py-4 rounded-xl text-sm font-semibold font-manrope border transition-all cursor-pointer ${
                        selectedDays.includes(day)
                          ? "border-[#635BFF] bg-[#F6F7F9] text-[#635BFF]"
                          : "border-[#EFF4FA] bg-[#F6F7F9] text-[#29343D] hover:border-[#DDDBFF]"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#EFF4FA]" />

          {/* â”€â”€ End of repetition â”€â”€ */}
          <div>
            <p className="text-sm font-bold font-manrope text-[#29343D] mb-4">
              End of repetition
            </p>
            <div className="space-y-4">
              {/* Never */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  checked={endType === "Never"}
                  onChange={() => setEndType("Never")}
                  className="accent-[#635BFF] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-manrope text-[#29343D]">
                  Never
                </span>
              </label>

              {/* After N times */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  checked={endType === "After"}
                  onChange={() => setEndType("After")}
                  className="accent-[#635BFF] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-manrope text-[#29343D]">
                  After
                </span>
                <input
                  type="number"
                  min={1}
                  value={afterTimes}
                  disabled={endType !== "After"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAfterTimes(Math.max(1, Number(e.target.value)))
                  }
                  className="w-14 text-center text-sm font-semibold font-manrope text-[#29343D] border border-[#E0E6EB] rounded-[8px] py-1.5 outline-none focus:border-[#635BFF] transition-colors disabled:opacity-40"
                />
                <span className="text-sm font-manrope text-[#29343D]">
                  time(s)
                </span>
              </label>

              {/* In date */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  checked={endType === "In"}
                  onChange={() => setEndType("In")}
                  className="accent-[#635BFF] w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-manrope text-[#29343D]">In</span>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={inDate}
                  disabled={endType !== "In"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInDate(e.target.value)
                  }
                  className="px-3 py-1.5 text-sm font-manrope text-[#29343D] border border-[#E0E6EB] rounded-[8px] outline-none focus:border-[#635BFF] transition-colors disabled:opacity-40 w-40"
                />
              </label>
            </div>
          </div>

          {/* â”€â”€ Save repetition â”€â”€ */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer"
            >
              Save repetition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
