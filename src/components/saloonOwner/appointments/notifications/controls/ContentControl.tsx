"use client";

import React from "react";

interface ContentControlProps {
  content: string;
  setContent: (val: string) => void;
}

export default function ContentControl({
  content,
  setContent,
}: ContentControlProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-bold text-[#475569]">Content</label>
      <textarea
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none font-sans leading-relaxed"
      />
    </div>
  );
}
