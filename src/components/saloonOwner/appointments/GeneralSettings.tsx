"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import LanguageRegionSettings from "./general/LanguageRegionSettings";
import TimeZoneSettings from "./general/TimeZoneSettings";
import EventDurationSettings from "./general/EventDurationSettings";
import EventVisibilitySettings from "./general/EventVisibilitySettings";

interface GeneralSettingsProps {
  onSave?: () => void;
}

export default function GeneralSettings({ onSave }: GeneralSettingsProps) {
  const [language, setLanguage] = useState("English (US)");
  const [country, setCountry] = useState("United States");
  const [dateFormat, setDateFormat] = useState("12/31/2025");
  const [timeFormat, setTimeFormat] = useState("1:00 PM");

  const [displaySecondaryTimeZone, setDisplaySecondaryTimeZone] =
    useState(false);
  const [mainTimeZone, setMainTimeZone] = useState(
    "Eastern Time (US & Canada)",
  );
  const [secondaryTimeZone, setSecondaryTimeZone] = useState("None");
  const [requestUpdateLocation, setRequestUpdateLocation] = useState(true);

  const [defaultDuration, setDefaultDuration] = useState("15 minutes");

  const [showWeekends, setShowWeekends] = useState(true);
  const [showCancelledEvents, setShowCancelledEvents] = useState(true);
  const [showCompletedEvents, setShowCompletedEvents] = useState(true);
  const [startOfWeekend, setStartOfWeekend] = useState("Sunday");

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      alert("Settings saved successfully!");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <LanguageRegionSettings
            language={language}
            setLanguage={setLanguage}
            country={country}
            setCountry={setCountry}
            dateFormat={dateFormat}
            setDateFormat={setDateFormat}
            timeFormat={timeFormat}
            setTimeFormat={setTimeFormat}
          />
          <TimeZoneSettings
            displaySecondaryTimeZone={displaySecondaryTimeZone}
            setDisplaySecondaryTimeZone={setDisplaySecondaryTimeZone}
            mainTimeZone={mainTimeZone}
            setMainTimeZone={setMainTimeZone}
            secondaryTimeZone={secondaryTimeZone}
            setSecondaryTimeZone={setSecondaryTimeZone}
            requestUpdateLocation={requestUpdateLocation}
            setRequestUpdateLocation={setRequestUpdateLocation}
          />
        </div>
        <div className="space-y-6">
          <EventDurationSettings
            defaultDuration={defaultDuration}
            setDefaultDuration={setDefaultDuration}
          />

          <EventVisibilitySettings
            showWeekends={showWeekends}
            setShowWeekends={setShowWeekends}
            showCancelledEvents={showCancelledEvents}
            setShowCancelledEvents={setShowCancelledEvents}
            showCompletedEvents={showCompletedEvents}
            setShowCompletedEvents={setShowCompletedEvents}
            startOfWeekend={startOfWeekend}
            setStartOfWeekend={setStartOfWeekend}
          />
        </div>
      </div>
      <div className="flex justify-end pt-2 w-full">
        <button
          onClick={handleSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-3 rounded-xl font-bold text-[13px] shadow-lg shadow-[#635BFF]/20 transition-all active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
