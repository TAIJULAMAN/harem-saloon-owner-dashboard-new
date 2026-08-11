"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  ChevronDown,
  Plus,
  Play,
  Volume2,
  Maximize,
  MoreHorizontal
} from "lucide-react";
import UploadMediaModal from "./UploadMediaModal";

export default function MediaTab() {
  const [fileType, setFileType] = useState("All Type");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 min-h-[600px]">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[22px] font-bold text-[#1E293B]">Media</h2>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#E0E7FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Media
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#94A3B8]">File Type</span>
          <div className="flex items-center gap-2">
            {["All Type", "Photo", "Video"].map((type) => (
              <button
                key={type}
                onClick={() => setFileType(type)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${fileType === type
                    ? "border-[#635BFF] text-[#635BFF] bg-white"
                    : "border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC]"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#94A3B8]">Date</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-1.5 text-[13px] font-bold text-[#1E293B] focus:outline-none focus:border-[#635BFF] min-w-[140px] cursor-pointer">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Photo Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-[18px] font-bold text-[#1E293B]">FileName.jpeg</h3>
            <button className="text-[#1E293B] hover:bg-[#F1F5F9] p-1 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-3 mb-3">
            <span className="border border-[#A5F3FC] text-[#06B6D4] text-[12px] font-medium px-3 py-1 rounded-full">
              Uploaded by: Maria
            </span>
            <span className="bg-[#DCFCE7] text-[#22C55E] text-[12px] font-medium px-3 py-1 rounded-full">
              Published to social media
            </span>
          </div>

          <div className="text-[12px] text-[#94A3B8] mb-6">
            Uploaded at 08/08/2025 5:06 PM
          </div>

          <div
            className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-[#A7F3D0] via-[#C7D2FE] to-[#FBCFE8] relative shadow-inner"
          >
            {/* Decorative abstract elements to mimic the screenshot's thumbnail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-[#FDF4FF] to-[#E0E7FF] rounded-full blur-sm opacity-80 shadow-2xl"></div>
            <div className="absolute top-[30%] left-[30%] w-8 h-8 bg-gradient-to-tr from-[#FDF4FF] to-[#E0E7FF] rounded-full blur-[1px] opacity-90 shadow-lg"></div>
          </div>
        </div>

        {/* Video Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-[18px] font-bold text-[#1E293B]">FileName.jpeg</h3>
            <button className="text-[#1E293B] hover:bg-[#F1F5F9] p-1 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-3 mb-3">
            <span className="border border-[#A5F3FC] text-[#06B6D4] text-[12px] font-medium px-3 py-1 rounded-full">
              Uploaded by: Maria
            </span>
            <span className="bg-[#FEFCE8] text-[#EAB308] text-[12px] font-medium px-3 py-1 rounded-full">
              Not published to social media
            </span>
          </div>

          <div className="text-[12px] text-[#94A3B8] mb-6">
            Uploaded at 08/08/2025 5:06 PM
          </div>

          <div
            className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-[#F59E0B] via-[#EC4899] to-[#6366F1] relative shadow-inner flex flex-col justify-end"
          >
            {/* Decorative abstract overlay for video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-[#7C3AED] to-transparent opacity-80 mix-blend-overlay"></div>

            {/* Custom Video Player Overlay UI */}
            <div className="relative z-10 w-full px-4 pb-4 flex items-center gap-4">
              <button className="text-white hover:text-gray-200 transition-colors">
                <Play className="w-5 h-5 fill-white" />
              </button>

              <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>

              <button className="text-white hover:text-gray-200 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>

              <button className="text-white hover:text-gray-200 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>

              <button className="text-white hover:text-gray-200 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
      
      {isUploadModalOpen && <UploadMediaModal onClose={() => setIsUploadModalOpen(false)} />}
    </div>
  );
}
