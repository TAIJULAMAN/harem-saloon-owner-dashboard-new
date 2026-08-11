"use client";

import React from "react";
import { Check } from "lucide-react";
import { CustomSelect } from "../CustomSelect";

interface TimeZoneSettingsProps {
  displaySecondaryTimeZone: boolean;
  setDisplaySecondaryTimeZone: (val: boolean) => void;
  mainTimeZone: string;
  setMainTimeZone: (val: string) => void;
  secondaryTimeZone: string;
  setSecondaryTimeZone: (val: string) => void;
  requestUpdateLocation: boolean;
  setRequestUpdateLocation: (val: boolean) => void;
}

export default function TimeZoneSettings({
  displaySecondaryTimeZone,
  setDisplaySecondaryTimeZone,
  mainTimeZone,
  setMainTimeZone,
  secondaryTimeZone,
  setSecondaryTimeZone,
  requestUpdateLocation,
  setRequestUpdateLocation,
}: TimeZoneSettingsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <h3 className="text-[13px] font-extrabold text-[#1E293B] uppercase tracking-wider">
        Time Zone
      </h3>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!displaySecondaryTimeZone}
            onChange={(e) => setDisplaySecondaryTimeZone(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
              displaySecondaryTimeZone
                ? "bg-[#635BFF] border-[#635BFF] text-white"
                : "bg-white border-[#CBD5E1] text-transparent hover:border-[#635BFF]"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B] transition-colors pt-0.5">
            Display secondary time zone
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#475569]">
              Main Time Zone *
            </label>
            <CustomSelect
              value={mainTimeZone}
              onChange={setMainTimeZone}
              options={[
                "Eastern Time (US & Canada)",
                "Central Time (US & Canada)",
                "Pacific Time (US & Canada)",
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#475569]">
              Secondary Time Zone *
            </label>
            <CustomSelect
              disabled={!displaySecondaryTimeZone}
              value={secondaryTimeZone}
              onChange={setSecondaryTimeZone}
              options={["None", "UTC", "GMT"]}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group pt-1">
          <input
            type="checkbox"
            checked={!!requestUpdateLocation}
            onChange={(e) => setRequestUpdateLocation(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
              requestUpdateLocation
                ? "bg-[#635BFF] border-[#635BFF] text-white"
                : "bg-white border-[#CBD5E1] text-transparent hover:border-[#635BFF]"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B] transition-colors pt-0.5">
            Request to update primary time zone based on current location
          </span>
        </label>
      </div>
    </div>
  );
}
