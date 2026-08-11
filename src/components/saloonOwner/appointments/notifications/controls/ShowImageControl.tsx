"use client";

import React from "react";

interface ShowImageControlProps {
  showImage: boolean;
  setShowImage: (val: boolean) => void;
}

export default function ShowImageControl({
  showImage,
  setShowImage,
}: ShowImageControlProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-bold text-[#475569]">
        Show Image *
      </span>
      <button
        onClick={() => setShowImage(!showImage)}
        className={`w-11 h-6 rounded-lg p-0.5 transition-colors focus:outline-none flex items-center ${
          showImage ? "bg-[#E0E7FF]" : "bg-[#E2E8F0]"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-[6px] transition-transform duration-200 ${
            showImage
              ? "bg-[#635BFF] translate-x-5"
              : "bg-[#94A3B8] translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
