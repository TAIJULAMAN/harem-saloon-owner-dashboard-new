"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationSettings";
import EmployeeSettings from "./EmployeeSettings";

export default function SettingsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab : 'general' | 'notifications' | 'employees'
  const tabParam = searchParams.get("tab");
  const activeTab: "general" | "notifications" | "employees" =
    tabParam === "notifications"
      ? "notifications"
      : tabParam === "employees"
        ? "employees"
        : "general";

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Back Arrow and Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/appointments"
            className="w-9 h-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] rounded-xl transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-[1.15rem] font-extrabold text-[#1E293B] font-manrope">
              {activeTab === "general"
                ? "General Settings"
                : activeTab === "notifications"
                  ? "Notifications & Communication"
                  : "Employees Settings"}
            </h1>
          </div>
        </div>

        {/* Right Side: Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl shrink-0">
          <Home className="w-3.5 h-3.5" />
          <span className="opacity-60">/</span>
          <Link
            href="/dashboard/appointments"
            className="hover:text-[#635BFF] transition-colors"
          >
            Appointments
          </Link>
          {activeTab && (
            <>
              <span className="opacity-60">/</span>
              <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-md font-extrabold">
                Settings
              </span>
            </>
          )}
        </div>
      </div>

      {/* Navigation Tabs Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-1.5 flex flex-wrap gap-1.5">
        <button
          onClick={() => {
            router.push("/dashboard/appointments/settings?tab=general");
          }}
          className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            activeTab === "general"
              ? "bg-[#635BFF] text-white shadow-sm shadow-[#635BFF]/25"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          General Settings
        </button>
        <button
          onClick={() => {
            router.push("/dashboard/appointments/settings?tab=notifications");
          }}
          className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            activeTab === "notifications"
              ? "bg-[#635BFF] text-white shadow-sm shadow-[#635BFF]/25"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          Notifications & Communication
        </button>
        <button
          onClick={() => {
            router.push("/dashboard/appointments/settings?tab=employees");
          }}
          className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
            activeTab === "employees"
              ? "bg-[#635BFF] text-white shadow-sm shadow-[#635BFF]/25"
              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
          }`}
        >
          Employees Settings
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "general" && <GeneralSettings onSave={handleSave} />}

      {activeTab === "notifications" && (
        <NotificationSettings onSave={handleSave} />
      )}

      {activeTab === "employees" && <EmployeeSettings onSave={handleSave} />}
    </div>
  );
}
