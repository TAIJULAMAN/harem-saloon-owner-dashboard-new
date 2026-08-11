"use client";

import React, { useState } from "react";
import ReminderSettings from "./notifications/ReminderSettings";
import NotifySettings from "./notifications/NotifySettings";
import ReviewSettings from "./notifications/ReviewSettings";

interface NotificationSettingsProps {
  onSave?: () => void;
}

export default function NotificationSettings({
  onSave,
}: NotificationSettingsProps) {
  // Sub-tabs for Notifications
  const [activeNotificationTab, setActiveNotificationTab] = useState<
    "reminder" | "notify" | "review"
  >("reminder");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sub Navigation tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-1.5 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveNotificationTab("reminder")}
          className={`px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all ${
            activeNotificationTab === "reminder"
              ? "bg-[#E0E7FF] text-[#635BFF]"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          Reminder before appointments
        </button>
        <button
          onClick={() => setActiveNotificationTab("notify")}
          className={`px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all ${
            activeNotificationTab === "notify"
              ? "bg-[#E0E7FF] text-[#635BFF]"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          Notify when appointment is scheduled
        </button>
        <button
          onClick={() => setActiveNotificationTab("review")}
          className={`px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all ${
            activeNotificationTab === "review"
              ? "bg-[#E0E7FF] text-[#635BFF]"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          Ask for review
        </button>
      </div>

      {/* Render Active Sub-tab Component */}
      {activeNotificationTab === "reminder" && (
        <ReminderSettings onSave={onSave} />
      )}
      {activeNotificationTab === "notify" && (
        <NotifySettings onSave={onSave} />
      )}
      {activeNotificationTab === "review" && (
        <ReviewSettings onSave={onSave} />
      )}
    </div>
  );
}
