"use client";

import React from "react";
import { CustomSelect } from "../CustomSelect";

interface EventDurationSettingsProps {
  defaultDuration: string;
  setDefaultDuration: (val: string) => void;
}

export default function EventDurationSettings({
  defaultDuration,
  setDefaultDuration,
}: EventDurationSettingsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <h3 className="text-[13px] font-extrabold text-[#1E293B] uppercase tracking-wider">
        Events
      </h3>

      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-[#475569]">
          Default Duration *
        </label>
        <CustomSelect
          value={defaultDuration}
          onChange={setDefaultDuration}
          options={["15 minutes", "30 minutes", "45 minutes", "1 hour"]}
        />
      </div>
    </div>
  );
}
