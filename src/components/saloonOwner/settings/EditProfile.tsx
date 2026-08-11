"use client";

import React from "react";

export default function EditProfile() {
  return (
    <>
      {/* Change Profile Card */}
      <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center relative max-w-2xl mx-auto">
        <div className="w-full text-left mb-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#1E293B]">Change profile</h2>
        </div>

        <div className="w-32 h-32 rounded-full bg-[#F3F4F6] overflow-hidden mb-6 border-4 border-white shadow-md">
          {/* Simulated 3D Avatar */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mathew"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button className="px-6 py-2 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#534DFD] transition-colors shadow-sm shadow-[#635BFF]/30">
            Upload
          </button>
          <button className="px-6 py-2 bg-[#FFE4E6] text-[#FF4C6A] text-sm font-semibold rounded-lg hover:bg-[#FECDD3] transition-colors">
            Reset
          </button>
        </div>

        <p className="text-xs text-[#94A3B8] text-center max-w-[200px]">
          Allowed JPG, GIF or PNG. Max size of 800K
        </p>
      </div>

      {/* Personal Details Card */}
      <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm max-w-2xl mx-auto mt-6">
        <h2 className="text-lg font-bold text-[#1E293B] mb-6">Personal Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2">Your Name</label>
            <input
              type="text"
              defaultValue="Mathew Anderson"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] mb-2">Store Name</label>
            <input
              type="text"
              defaultValue="Maxima Studio"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#1E293B] mb-2">Email</label>
            <input
              type="email"
              defaultValue="info@modernize.com"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#1E293B] mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="(219) 555-0114"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E293B] mb-2">Address</label>
          <input
            type="text"
            defaultValue="3891 Ranchview Dr. Richardson, California 62639"
            className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] focus:outline-none focus:border-[#635BFF] transition-colors bg-transparent font-medium"
          />
        </div>
      </div>
    </>
  );
}
