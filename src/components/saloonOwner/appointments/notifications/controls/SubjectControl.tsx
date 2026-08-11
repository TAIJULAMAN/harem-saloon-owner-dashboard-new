"use client";

import React from "react";

interface SubjectControlProps {
  subject: string;
  setSubject: (val: string) => void;
}

export default function SubjectControl({
  subject,
  setSubject,
}: SubjectControlProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-bold text-[#475569]">
        Subject *
      </label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
      />
    </div>
  );
}
