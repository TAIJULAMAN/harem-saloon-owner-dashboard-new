"use client";

import React from "react";
import { CustomSelect } from "../../CustomSelect";

interface SendingTimesControlProps {
  timeVal: string;
  setTimeVal: (val: string) => void;
  timeUnit: string;
  setTimeUnit: (val: string) => void;
}

export default function SendingTimesControl({
  timeVal,
  setTimeVal,
  timeUnit,
  setTimeUnit,
}: SendingTimesControlProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-bold text-[#475569]">
        Sending Times *
      </label>
      <div className="flex gap-3">
        <input
          type="number"
          value={timeVal}
          onChange={(e) => setTimeVal(e.target.value)}
          className="w-20 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
        />
        <div className="flex-1">
          <CustomSelect
            value={timeUnit}
            onChange={setTimeUnit}
            options={["Days", "Hours"]}
          />
        </div>
        <span className="text-[13px] font-bold text-[#64748B] self-center">
          Before
        </span>
      </div>
    </div>
  );
}
