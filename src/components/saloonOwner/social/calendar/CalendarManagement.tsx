"use client";

import React, { useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Globe,
} from "lucide-react";
import { MonthView } from "./views/MonthView";
import { WeekView } from "./views/WeekView";
import { DayView } from "./views/DayView";
import { MOCK_SOCIAL_POSTS } from "../data";
import { CustomSelect } from "../../../common/CustomSelect";
import { AddPostModal } from "./modals/AddPostModal";
import { SchedulePostModal } from "./modals/SchedulePostModal";

type ViewMode = "Month" | "Week" | "Day";

export function CalendarManagement() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 27));
  const [viewMode, setViewMode] = useState<ViewMode>("Month");
  const [account, setAccount] = useState("All Accounts");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<{
    date?: string;
    time?: string;
  }>({});

  const handleOpenAddModal = (date?: string, time?: string) => {
    setScheduleData({ date, time });
    setIsAddModalOpen(true);
  };

  const handleProceedToSchedule = () => {
    setIsAddModalOpen(false);
    setIsScheduleModalOpen(true);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "Month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === "Week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "Month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === "Week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatHeaderDate = () => {
    if (viewMode === "Month") {
      return currentDate.toLocaleDateString("en-US", { month: "long" });
    }
    if (viewMode === "Week") {
      const d = new Date(currentDate);
      const day = d.getDay();
      const diff = d.getDate() - day;
      const start = new Date(d.setDate(diff));
      const end = new Date(start);
      end.setDate(end.getDate() + 6);

      const startMonth = start.toLocaleDateString("en-US", { month: "long" });
      const endMonth = end.toLocaleDateString("en-US", { month: "long" });

      if (startMonth === endMonth) {
        return `${startMonth} ${String(start.getDate()).padStart(2, "0")} - ${endMonth} ${String(end.getDate()).padStart(2, "0")}`;
      }
      return `${startMonth} ${String(start.getDate()).padStart(2, "0")} - ${endMonth} ${String(end.getDate()).padStart(2, "0")}`;
    }
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-5 bg-white shrink-0 mb-5 rounded-lg border border-[#E2E8F0]">
        <h1 className="text-[16px] sm:text-xl font-bold text-[#1E293B]">
          Calendar
        </h1>
        <button
          onClick={() => handleOpenAddModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#635BFF] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-[#5249EC] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </button>
      </div>

      {/* Main Calendar Container */}
      <div className="flex-1 bg-white rounded-lg border border-[#E2E8F0] flex flex-col p-3 sm:p-5">
        {/* Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Left: Accounts Filter */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="w-40">
              <CustomSelect
                value={account}
                onChange={setAccount}
                options={["All Accounts", "Instagram Only", "Facebook Only"]}
                align="left"
              />
            </div>
          </div>

          {/* Middle: Date Navigation */}
          <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] rounded-lg px-2 h-10">
            <button
              onClick={handlePrev}
              className="w-8 h-8 flex items-center justify-center text-[#635BFF] hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-[#635BFF] min-w-[150px] text-center">
              {formatHeaderDate()}
            </span>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center text-[#635BFF] hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: View Toggles & Fullscreen */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg p-1">
              {(["Month", "Week", "Day"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${viewMode === mode
                      ? "bg-[#E0E7FF] text-[#635BFF]"
                      : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-[#F1F5F9] text-[#64748B] rounded-lg hover:bg-[#E2E8F0] transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Component */}
        <div className="flex-1 overflow-hidden">
          {viewMode === "Month" && (
            <MonthView currentDate={currentDate} posts={MOCK_SOCIAL_POSTS} />
          )}
          {viewMode === "Week" && (
            <WeekView
              currentDate={currentDate}
              posts={MOCK_SOCIAL_POSTS}
              onAddPost={handleOpenAddModal}
            />
          )}
          {viewMode === "Day" && (
            <DayView
              currentDate={currentDate}
              posts={MOCK_SOCIAL_POSTS}
              onAddPost={handleOpenAddModal}
            />
          )}
        </div>
      </div>

      <AddPostModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSchedule={handleProceedToSchedule}
      />

      <SchedulePostModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onConfirm={(date, time) => {
          console.log("Scheduling for", date, time);
          setIsScheduleModalOpen(false);
        }}
        initialDate={scheduleData.date}
        initialTime={scheduleData.time}
      />
    </div>
  );
}
