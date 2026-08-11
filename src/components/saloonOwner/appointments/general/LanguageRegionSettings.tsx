"use client";

import React from "react";
import { CustomSelect } from "../CustomSelect";

interface LanguageRegionSettingsProps {
  language: string;
  setLanguage: (val: string) => void;
  country: string;
  setCountry: (val: string) => void;
  dateFormat: string;
  setDateFormat: (val: string) => void;
  timeFormat: string;
  setTimeFormat: (val: string) => void;
}

export default function LanguageRegionSettings({
  language,
  setLanguage,
  country,
  setCountry,
  dateFormat,
  setDateFormat,
  timeFormat,
  setTimeFormat,
}: LanguageRegionSettingsProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
      <h3 className="text-[13px] font-extrabold text-[#1E293B] uppercase tracking-wider">
        Language and Region
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-[#475569]">
            Language *
          </label>
          <CustomSelect
            value={language}
            onChange={setLanguage}
            options={["English (US)", "Spanish", "French", "German"]}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-[#475569]">
            Country *
          </label>
          <CustomSelect
            value={country}
            onChange={setCountry}
            options={[
              "United States",
              "United Kingdom",
              "Canada",
              "Germany",
            ]}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-[#475569]">
            Date Format *
          </label>
          <CustomSelect
            value={dateFormat}
            onChange={setDateFormat}
            options={["12/31/2025", "2025-12-31", "31/12/2025"]}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-[#475569]">
            Time Format *
          </label>
          <CustomSelect
            value={timeFormat}
            onChange={setTimeFormat}
            options={["1:00 PM", "13:00"]}
          />
        </div>
      </div>
    </div>
  );
}
