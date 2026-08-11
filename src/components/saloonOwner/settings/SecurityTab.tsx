"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Laptop, MoreVertical, Facebook, Instagram, Twitter, Music, X } from "lucide-react";

export default function SecurityTab() {
  const [impersonate, setImpersonate] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState<"password" | "email" | "phone" | "signout" | "signout_device" | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="space-y-6">

      {/* Middle Section: Settings List & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Settings List */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
          <div className="flex flex-col">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <div>
                <p className="font-bold text-[#1E293B]">Two-factor Authentication</p>
                <p className="text-sm text-[#94A3B8] mt-1">Mandatory 2FA for all super admin accounts</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-10 h-6 rounded-full flex items-center transition-colors px-1 ${twoFactorEnabled ? 'bg-[#E0E7FF]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`w-4 h-4 rounded-full transition-transform ${twoFactorEnabled ? 'translate-x-4 bg-[#635BFF]' : 'translate-x-0 bg-white shadow-sm'}`}></div>
              </button>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <div>
                <p className="font-bold text-[#1E293B]">Password</p>
                <p className="text-xl leading-none text-[#1E293B] mt-1 tracking-[0.2em]">••••••••••••</p>
              </div>
              <button
                onClick={() => setActiveModal("password")}
                className="px-4 py-1.5 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#534DFD] transition-colors shadow-sm shadow-[#635BFF]/30"
              >
                Change
              </button>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <div>
                <p className="font-bold text-[#1E293B]">Recovery email</p>
                <p className="text-sm text-[#94A3B8] mt-1">test@test.com</p>
              </div>
              <button
                onClick={() => setActiveModal("email")}
                className="px-4 py-1.5 bg-[#E0E7FF] text-[#635BFF] text-sm font-semibold rounded-lg hover:bg-[#C7D2FE] transition-colors"
              >
                Setup
              </button>
            </div>

            {/* Item 5 */}
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="font-bold text-[#1E293B]">Recovery phone number</p>
                <p className="text-sm text-[#94A3B8] mt-1">3482938493</p>
              </div>
              <button
                onClick={() => setActiveModal("phone")}
                className="px-4 py-1.5 bg-[#E0E7FF] text-[#635BFF] text-sm font-semibold rounded-lg hover:bg-[#C7D2FE] transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Devices */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-[#E0E7FF] flex items-center justify-center text-[#635BFF] mb-4">
            <Monitor className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#1E293B] mb-2">Devices</h2>
          <p className="text-sm text-[#94A3B8] mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.</p>

          <button
            onClick={() => setActiveModal("signout")}
            className="w-full py-2 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#534DFD] transition-colors shadow-sm shadow-[#635BFF]/30 mb-6"
          >
            Sign out from all devices
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-6">
              <div className="text-[#64748B]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1E293B] text-sm">iPhone 14</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">London UK, Oct 23 at 1:15 AM</p>
              </div>
              <button
                onClick={() => setActiveModal("signout_device")}
                className="p-1 text-[#94A3B8] hover:bg-[#F1F5F9] rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[#64748B]">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#1E293B] text-sm">Macbook Air</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Gujarat India, Oct 24 at 3:15 AM</p>
              </div>
              <button
                onClick={() => setActiveModal("signout_device")}
                className="p-1 text-[#94A3B8] hover:bg-[#F1F5F9] rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Accounts Card */}
      <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm">
        <h2 className="text-lg font-bold text-[#1E293B] mb-6">Social Media Accounts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Facebook */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#E2E8F0] rounded-lg gap-3 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="text-[#1877F2] shrink-0">
                <Facebook className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="font-bold text-sm text-[#1E293B]">Facebook</span>
              <span className="px-2 py-0.5 bg-[#FEF9C3] text-[#CA8A04] text-[10px] font-bold rounded-full whitespace-nowrap">Not Connected</span>
            </div>
            <button className="w-full sm:w-auto px-4 py-1.5 bg-[#E0E7FF] text-[#635BFF] text-xs font-bold rounded-lg hover:bg-[#C7D2FE] transition-colors">
              Connect
            </button>
          </div>

          {/* Instagram */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#E2E8F0] rounded-lg gap-3 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="text-[#E4405F] shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-[#1E293B]">Instagram</span>
              <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold rounded-full whitespace-nowrap">Connected</span>
            </div>
            <button className="w-full sm:w-auto px-4 py-1.5 bg-[#FFE4E6] text-[#FF4C6A] text-xs font-bold rounded-lg hover:bg-[#FECDD3] transition-colors">
              Disconnect
            </button>
          </div>

          {/* X (Twitter) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#E2E8F0] rounded-lg gap-3 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="text-[#000000] shrink-0">
                {/* SVG for X Logo */}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </div>
              <span className="font-bold text-sm text-[#1E293B]">X</span>
              <span className="px-2 py-0.5 bg-[#FEF9C3] text-[#CA8A04] text-[10px] font-bold rounded-full whitespace-nowrap">Not Connected</span>
            </div>
            <button className="w-full sm:w-auto px-4 py-1.5 bg-[#E0E7FF] text-[#635BFF] text-xs font-bold rounded-lg hover:bg-[#C7D2FE] transition-colors">
              Connect
            </button>
          </div>

          {/* TikTok */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#E2E8F0] rounded-lg gap-3 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="text-[#000000] shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-[#1E293B]">TikTok</span>
              <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold rounded-full whitespace-nowrap">Connected</span>
            </div>
            <button className="w-full sm:w-auto px-4 py-1.5 bg-[#FFE4E6] text-[#FF4C6A] text-xs font-bold rounded-lg hover:bg-[#FECDD3] transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </div>



      {/* Modals Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="text-lg font-bold text-[#1E293B]">
                {activeModal === "password" && "Change Password"}
                {activeModal === "email" && "Setup Recovery Email"}
                {activeModal === "phone" && "Edit Recovery Phone"}
                {activeModal === "signout" && "Sign Out All Devices"}
                {activeModal === "signout_device" && "Sign Out Device"}
              </h3>
              <button onClick={closeModal} className="p-1.5 text-[#94A3B8] hover:bg-[#E2E8F0] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {activeModal === "password" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
                    />
                  </div>
                </div>
              )}

              {activeModal === "email" && (
                <div className="space-y-4">
                  <p className="text-sm text-[#64748B]">
                    Enter a secure email address we can use to help you recover your account if you lose access.
                  </p>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">Recovery Email</label>
                    <input
                      type="email"
                      defaultValue="test@test.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
                    />
                  </div>
                </div>
              )}

              {activeModal === "phone" && (
                <div className="space-y-4">
                  <p className="text-sm text-[#64748B]">
                    Enter a phone number to receive recovery SMS codes.
                  </p>
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="3482938493"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
                    />
                  </div>
                </div>
              )}

              {activeModal === "signout" && (
                <div className="space-y-4">
                  <p className="text-sm text-[#64748B]">
                    Are you sure you want to sign out from all other active sessions? You will remain signed in on your current device.
                  </p>
                </div>
              )}

              {activeModal === "signout_device" && (
                <div className="space-y-4">
                  <p className="text-sm text-[#64748B]">
                    Are you sure you want to sign out from this specific device? Any unsaved work on that device may be lost.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E2E8F0] bg-[#F8FAFC]">
              <button onClick={closeModal} className="px-5 py-2 bg-white text-[#1E293B] border border-[#E2E8F0] text-sm font-semibold rounded-lg hover:bg-[#F1F5F9] transition-colors">
                Cancel
              </button>
              <button
                onClick={closeModal}
                className={`px-5 py-2 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm ${(activeModal === "signout" || activeModal === "signout_device")
                  ? "bg-[#FF4C6A] hover:bg-[#E4405F] shadow-[#FF4C6A]/30"
                  : "bg-[#635BFF] hover:bg-[#534DFD] shadow-[#635BFF]/30"
                  }`}
              >
                {activeModal === "signout" && "Sign Out All"}
                {activeModal === "signout_device" && "Sign Out"}
                {activeModal !== "signout" && activeModal !== "signout_device" && "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
