"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, House } from "lucide-react";
import NotificationsTab from "./NotificationsTab";
import EmployeesTab from "./EmployeesTab";
import GeneralSettingsTab from "./GeneralSettingsTab";

const TABS = [
  "General Settings",
  "Notifications & Communication",
  "Employees Settings",
];

export default function AppoinmentContentInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam === "notifications" ? 1 : tabParam === "employees" ? 2 : 0;
  
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderTab = () => {
    if (activeTab === 0) return <GeneralSettingsTab />;
    if (activeTab === 1) return <NotificationsTab />;
    return <EmployeesTab />;
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* Top Bar */}
      <div className="bg-white px-6 py-3 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center gap-2 text-sm font-manrope text-[#29343D]">
          <Link href="/dashboard/appointment" className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors">
            <ChevronLeft size={16} className="text-[#635BFF]" />
          </Link>
          <span className="font-semibold">{TABS[activeTab]}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-manrope text-[#98A4AE]">
          <House size={16} />
          <span className="text-[#29343D]">/</span>
          <span className="text-[#635BFF] font-medium bg-[#EEEEFF] px-2 py-0.5 rounded-md">
            Appointments
          </span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white border-b border-[#EFF4FA] px-6 rounded-br-xl rounded-bl-xl pb-4">
        <div className="flex gap-0 flex-wrap w-fit border-b-2 border-[#EFF4FA]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3.5 text-sm font-manrope font-medium transition-colors relative cursor-pointer ${
                activeTab === i
                  ? "text-[#635BFF]"
                  : "text-[#98A4AE] hover:text-[#29343D]"
              }`}
            >
              {tab}
              {activeTab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>{renderTab()}</div>
    </div>
  );
}
