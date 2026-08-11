import React from "react";

export function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <div className="text-[12px] font-semibold text-[#64748B]">{label}</div>
    </div>
  );
}
