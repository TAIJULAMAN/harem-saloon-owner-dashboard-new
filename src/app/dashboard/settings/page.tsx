"use client";

import React, { useState } from "react";
import EditProfile from "@/components/saloonOwner/settings/EditProfile";
import ChangePassword from "@/components/saloonOwner/settings/ChangePassword";
import SecurityTab from "@/components/saloonOwner/settings/SecurityTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [viewMode, setViewMode] = useState<"view" | "editProfile" | "changePassword">("view");

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-sm pt-6 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#1E293B]">Settings</h1>
        </div>

        <div className="flex items-center gap-8">
          {["Profile", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === tab
                ? "text-[#635BFF]"
                : "text-[#64748B] hover:text-[#1E293B]"
                }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "Profile" && (
        <div className="space-y-6">
          {viewMode === "view" && (
            <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row gap-8 items-start relative">
              <div className="absolute top-8 right-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setViewMode("editProfile")}
                  className="px-4 py-2 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#534DFD] transition-colors shadow-sm shadow-[#635BFF]/30"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 mt-16 md:mt-0">
                <div className="w-32 h-32 rounded-full bg-[#F3F4F6] overflow-hidden border-4 border-white shadow-md">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mathew"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-6 pt-2 w-full">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E293B]">Mathew Anderson</h2>
                  <p className="text-[#64748B] font-medium mt-1">Store: Maxima Studio</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-6 border-t border-[#E2E8F0]">
                  <div>
                    <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-[#1E293B] font-medium">info@modernize.com</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-[#1E293B] font-medium">(219) 555-0114</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Store Address</p>
                    <p className="text-[#1E293B] font-medium">3891 Ranchview Dr. Richardson, California 62639</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === "editProfile" && (
            <EditProfile />
          )}
          {viewMode === "changePassword" && (
            <ChangePassword />
          )}

          {/* Action Buttons for Edit Modes */}
          {viewMode !== "view" && (
            <div className="flex items-center justify-end gap-4 mt-8 max-w-2xl mx-auto">
              <button
                onClick={() => setViewMode("view")}
                className="px-6 py-2 bg-[#F1F5F9] text-[#1E293B] text-sm font-semibold rounded-lg hover:bg-[#E2E8F0] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setViewMode("view")}
                className="px-6 py-2 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#534DFD] transition-colors shadow-sm shadow-[#635BFF]/30"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
      {activeTab === "Security" && (
        <SecurityTab />
      )}
    </div>
  );
}
