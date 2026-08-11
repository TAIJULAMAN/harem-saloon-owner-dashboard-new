"use client";

import React from "react";

interface ExceptionsControlProps {
  onOpenModal: () => void;
}

export default function ExceptionsControl({
  onOpenModal,
}: ExceptionsControlProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-bold text-[#475569]">
        Exceptions to default
      </span>
      <button
        onClick={onOpenModal}
        className="px-4 py-2 border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#1E293B] rounded-xl font-bold text-[12px] transition-colors"
      >
        See list
      </button>
    </div>
  );
}
