"use client";

import React, { useState } from "react";
import {
  X,
  ChevronDown,
  Bold,
  Italic,
  Smile,
  Hash,
  MapPin,
  Image as ImageIcon,
  MousePointerClick,
} from "lucide-react";
import Image from "next/image";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: () => void;
}

export function AddPostModal({
  isOpen,
  onClose,
  onSchedule,
}: AddPostModalProps) {
  const [activeTab, setActiveTab] = useState<"Post" | "Reel" | "Story">("Post");
  const [mediaState, setMediaState] = useState<
    "hidden" | "dropzone" | "uploaded"
  >("hidden");

  if (!isOpen) return null;

  const handleMediaClick = () => {
    if (mediaState === "hidden") setMediaState("dropzone");
    else if (mediaState === "dropzone") setMediaState("hidden");
  };

  const handleDropzoneClick = () => {
    // Simulate upload
    setMediaState("uploaded");
  };

  return (
    <div className="fixed inset-0 bg-[#1E293B]/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[640px] flex flex-col relative shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6">
          <h2 className="text-xl font-bold text-[#1E293B]">Add Post</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          {/* Accounts Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#1E293B] mb-2">Accounts</h3>
            <div className="border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-[#635BFF] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0">
                  {/* Mock avatar */}
                  <Image
                    width={40}
                    height={40}
                    src="/avatar/icon1.png"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1E293B] flex flex-wrap items-center gap-x-1">
                    <span>Maria Rodriguez</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-medium text-[#64748B]">
                      @mariarodriguez
                    </span>
                  </div>
                  <div className="text-xs text-[#94A3B8] flex items-center gap-1 mt-0.5">
                    Social Media:{" "}
                    <div className="w-4 h-4 bg-[#635BFF] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                      in
                    </div>
                  </div>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-[#635BFF]" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[#F1F5F9] mb-6">
            {(["Post", "Reel", "Story"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#635BFF] text-[#635BFF]"
                    : "border-transparent text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4 relative">
            <h3 className="text-sm font-bold text-[#1E293B] mb-2">
              Description
            </h3>

            <div className="relative border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:border-[#635BFF] transition-colors">
              <textarea
                className="w-full h-40 p-4 focus:outline-none resize-none text-sm text-[#1E293B] placeholder:text-[#94A3B8]"
                placeholder=""
              ></textarea>

              {/* Media Thumbnails Area (inside textarea visually, or just below text) */}
              {mediaState === "uploaded" && (
                <div className="px-4 pb-14">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E2E8F0]">
                    <div className="w-full h-full bg-gradient-to-tr from-[#635BFF] to-[#A5B4FC]"></div>
                    <button
                      onClick={() => setMediaState("hidden")}
                      className="absolute top-1 right-1 w-4 h-4 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Formatting Toolbar */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors bg-white">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors bg-white">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors bg-white">
                  <Smile className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] transition-colors bg-white">
                  <Hash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Media Dropzone (if active) */}
          {mediaState === "dropzone" && (
            <div
              onClick={handleDropzoneClick}
              className="mb-4 border border-dashed border-[#635BFF] bg-[#F8FAFC]/50 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-12 h-12 bg-[#E0E7FF] text-[#635BFF] rounded-lg flex items-center justify-center mb-1">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#635BFF]">
                Drop here or click to browse
              </p>
            </div>
          )}

          {/* Location & Media Triggers */}
          <div className="flex items-center gap-3 mb-8">
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
              <MapPin className="w-4 h-4 text-[#94A3B8]" />
              Location
            </button>
            <button
              onClick={handleMediaClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-[#94A3B8]" />
              Media
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3">
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-[#635BFF] text-[#635BFF] font-bold text-sm hover:bg-[#F8FAFC] transition-colors flex items-center justify-center">
              Draft
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#E0E7FF] text-[#635BFF] font-bold text-sm hover:bg-[#D6D9FF] transition-colors flex items-center justify-center">
              Publish
            </button>
            <button
              onClick={onSchedule}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#635BFF] text-white font-bold text-sm shadow-md hover:bg-[#5249EC] transition-colors flex items-center justify-center"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
