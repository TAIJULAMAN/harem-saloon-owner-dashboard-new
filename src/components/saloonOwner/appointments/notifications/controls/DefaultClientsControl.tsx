"use client";

import React from "react";

interface DefaultClientsControlProps {
  defaultAll: boolean;
  setDefaultAll: (val: boolean) => void;
}

export default function DefaultClientsControl({
  defaultAll,
  setDefaultAll,
}: DefaultClientsControlProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-bold text-[#475569]">
        Default for all clients *
      </span>
      <button
        onClick={() => setDefaultAll(!defaultAll)}
        className={`w-11 h-6 rounded-lg p-0.5 transition-colors focus:outline-none flex items-center ${
          defaultAll ? "bg-[#E0E7FF]" : "bg-[#E2E8F0]"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-[6px] transition-transform duration-200 ${
            defaultAll
              ? "bg-[#635BFF] translate-x-5"
              : "bg-[#94A3B8] translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
