"use client";

import { AlarmClock, Bell, Star, Plus } from "lucide-react";
import { useState } from "react";

const SUBTABS = [
  {
    label: "Reminder before appointments",
    icon: <AlarmClock size={52} strokeWidth={1.2} className="text-[#526B7A]" />,
    buttonLabel: "Add Reminder",
  },
  {
    label: "Notify when appointment is scheduled",
    icon: <Bell size={52} strokeWidth={1.2} className="text-[#526B7A]" />,
    buttonLabel: "Add Notification",
  },
  {
    label: "Ask for review",
    icon: <Star size={52} strokeWidth={1.2} className="text-[#526B7A]" />,
    buttonLabel: "Add Message Review",
  },
];

export default function NotificationsTab() {
  const [activeSubTab, setActiveSubTab] = useState(0);
  const active = SUBTABS[activeSubTab];

  return (
    <div className="py-6 space-y-4">
      <div className="bg-white rounded-[12px] border border-[#EFF4FA]">
        {/* Sub-tabs */}
        <div className="border-b border-[#EFF4FA] mx-4 flex gap-0 flex-wrap w-fit">
          {SUBTABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveSubTab(i)}
              className={`px-4 py-3.5 text-sm font-manrope font-medium transition-colors relative cursor-pointer whitespace-nowrap ${
                activeSubTab === i
                  ? "text-[#635BFF]"
                  : "text-[#98A4AE] hover:text-[#29343D]"
              }`}
            >
              {tab.label}
              {activeSubTab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Empty state â€” changes per sub-tab */}
        <div className="flex flex-col items-center justify-center m-[30px] py-[30px] rounded-xl border border-[#E0E6EB]">
          {active.icon}
          <p className="text-sm font-manrope font-semibold text-[#29343D] mb-4 mt-4">
            Set up services for Maria
          </p>
          <button className="flex items-center gap-1.5 text-sm font-manrope text-[#635BFF] bg-[#EEEEFF] hover:bg-[#e0deff] transition-colors px-4 py-2 rounded-[8px] cursor-pointer">
            <Plus size={14} />
            {active.buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
