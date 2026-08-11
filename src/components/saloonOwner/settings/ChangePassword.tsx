"use client";

import React from "react";

export default function ChangePassword() {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#1E293B] mb-1">Change Password</h2>
        <p className="text-sm text-[#94A3B8]">To change your password please confirm here</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">Current Password</label>
          <input
            type="password"
            value="..........."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">New Password</label>
          <input
            type="password"
            value="..........."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">Confirm Password</label>
          <input
            type="password"
            value="..........."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
