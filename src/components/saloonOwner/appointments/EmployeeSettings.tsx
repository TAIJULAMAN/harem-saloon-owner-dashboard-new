"use client";

import React, { useState } from "react";
import Image from "next/image";
import { mockTeamMembers } from "@/data/data";
import { Save } from "lucide-react";

interface EmployeeSettingsProps {
  onSave?: () => void;
}

export default function EmployeeSettings({ onSave }: EmployeeSettingsProps) {
  const [employeeSettings, setEmployeeSettings] = useState<
    Record<string, { sync: boolean; allowEdit: boolean; showBookings: boolean }>
  >({
    "1": { sync: true, allowEdit: true, showBookings: true },
    "2": { sync: false, allowEdit: true, showBookings: true },
    "3": { sync: true, allowEdit: true, showBookings: true },
    "4": { sync: false, allowEdit: true, showBookings: false },
    "5": { sync: true, allowEdit: false, showBookings: true },
    "6": { sync: false, allowEdit: true, showBookings: true },
  });

  const toggleEmployeeSetting = (
    id: string,
    field: "sync" | "allowEdit" | "showBookings",
  ) => {
    setEmployeeSettings((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      alert("Settings saved successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
        <h3 className="text-[13px] font-extrabold text-[#1E293B] uppercase tracking-wider">
          Employees Settings
        </h3>

        {/* Grid of Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockTeamMembers.slice(1).map((member) => {
            const settings = employeeSettings[member.id] || {
              sync: false,
              allowEdit: true,
              showBookings: true,
            };
            return (
              <div
                key={member.id}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Member Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#E2E8F0] border-2 border-white shadow-sm shrink-0">
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-extrabold text-[#1E293B]">
                      {member.name}
                    </h4>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Stylist
                    </span>
                  </div>
                </div>

                <hr className="border-[#E2E8F0]" />

                {/* Controls Grid */}
                <div className="space-y-3.5">
                  {/* Control 1: Sync Google Calendar */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11.5px] font-bold text-[#475569]">
                      Sync with google calendar
                    </span>
                    <button
                      onClick={() => toggleEmployeeSetting(member.id, "sync")}
                      className={`px-3 py-1.5 rounded-lg text-[10.5px] font-extrabold transition-all border ${
                        settings.sync
                          ? "bg-[#E0E7FF] border-[#C7D2FE] text-[#635BFF]"
                          : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]"
                      }`}
                    >
                      {settings.sync ? "Synced" : "Sync"}
                    </button>
                  </div>

                  {/* Control 2: Allow Edit Own Calendar */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11.5px] font-bold text-[#475569]">
                      Allow employees to edit own calendar
                    </span>
                    <button
                      onClick={() =>
                        toggleEmployeeSetting(member.id, "allowEdit")
                      }
                      className={`w-11 h-6 rounded-lg p-0.5 transition-colors focus:outline-none flex items-center ${
                        settings.allowEdit ? "bg-[#E0E7FF]" : "bg-[#E2E8F0]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-[6px] transition-transform duration-200 ${
                          settings.allowEdit
                            ? "bg-[#635BFF] translate-x-5"
                            : "bg-[#94A3B8] translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Control 3: Show in Bookings */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11.5px] font-bold text-[#475569]">
                      Show up in online bookings
                    </span>
                    <button
                      onClick={() =>
                        toggleEmployeeSetting(member.id, "showBookings")
                      }
                      className={`w-11 h-6 rounded-lg p-0.5 transition-colors focus:outline-none flex items-center ${
                        settings.showBookings ? "bg-[#E0E7FF]" : "bg-[#E2E8F0]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-[6px] transition-transform duration-200 ${
                          settings.showBookings
                            ? "bg-[#635BFF] translate-x-5"
                            : "bg-[#94A3B8] translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-3 rounded-xl font-bold text-[13px] shadow-lg shadow-[#635BFF]/20 transition-all active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
