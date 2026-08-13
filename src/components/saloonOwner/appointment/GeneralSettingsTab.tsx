import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import ReusableCheckbox from "./ReusableCheckbox";
import SectionCard from "./SectionCard";
import { CustomSelect } from "@/components/common/CustomSelect";
import {
  LANGUAGES,
  COUNTRIES,
  DATE_FORMATS,
  TIME_FORMATS,
  TIMEZONES,
  DURATIONS,
  WEEKDAYS,
} from "./data";

export default function GeneralSettingsTab() {
  const [language, setLanguage] = useState("English (US)");
  const [country, setCountry] = useState("United States");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12h");

  const [displaySecondary, setDisplaySecondary] = useState(false);
  const [requestLocation, setRequestLocation] = useState(true);
  const [mainTimezone, setMainTimezone] = useState("EST");
  const [secondaryTimezone, setSecondaryTimezone] = useState("None");

  const [defaultDuration, setDefaultDuration] = useState("15");

  const [showWeekends, setShowWeekends] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);
  const [weekendStart, setWeekendStart] = useState("Sunday");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    console.log("Saving settings...", {
      language,
      country,
      dateFormat,
      timeFormat,
      displaySecondary,
      mainTimezone,
      secondaryTimezone,
      requestLocation,
      defaultDuration,
      showWeekends,
      showCancelled,
      showCompleted,
      weekendStart,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="py-6 space-y-4">
      <SectionCard title="Language and Region">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Language <span className="text-red-400">*</span>
            </label>
            <CustomSelect
              value={language}
              options={LANGUAGES}
              onChange={setLanguage}
              className="w-full"
              buttonClassName="w-full text-left"
              align="left"
            />
          </div>
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Country <span className="text-red-400">*</span>
            </label>
            <CustomSelect
              value={country}
              options={COUNTRIES}
              onChange={setCountry}
              className="w-full"
              buttonClassName="w-full text-left"
              align="left"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Date Format <span className="text-red-400">*</span>
            </label>
            <CustomSelect
              value={dateFormat}
              options={DATE_FORMATS}
              onChange={setDateFormat}
              className="w-full"
              buttonClassName="w-full text-left"
              align="left"
            />
          </div>
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Time Format <span className="text-red-400">*</span>
            </label>
            <CustomSelect
              value={timeFormat}
              options={TIME_FORMATS}
              onChange={setTimeFormat}
              className="w-full"
              buttonClassName="w-full text-left"
              align="left"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Time Zone">
        <div className="mb-4">
          <ReusableCheckbox
            label="Display secondary time zone"
            checked={displaySecondary}
            onChange={() => setDisplaySecondary((p) => !p)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Main Time Zone <span className="text-red-400">*</span>
            </label>
            <CustomSelect
              value={mainTimezone}
              options={TIMEZONES}
              onChange={setMainTimezone}
              className="w-full"
              buttonClassName="w-full text-left"
              align="left"
            />
          </div>
          <div>
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Secondary Time Zone <span className="text-red-400">*</span>
            </label>
            {displaySecondary ? (
              <CustomSelect
                value={secondaryTimezone}
                options={TIMEZONES}
                onChange={setSecondaryTimezone}
                className="w-full"
                buttonClassName="w-full text-left"
                align="left"
              />
            ) : (
              <div className="flex items-center justify-between border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 bg-[#F4F6FA] text-sm font-manrope text-[#B9C3CC] cursor-not-allowed">
                <span>None</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <ReusableCheckbox
          label="Request to update primary time zone based on current location"
          checked={requestLocation}
          onChange={() => setRequestLocation((p) => !p)}
        />
      </SectionCard>

      <SectionCard title="Events">
        <div className="w-1/2 pr-2">
          <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
            Default Duration <span className="text-red-400">*</span>
          </label>
          <CustomSelect
            value={defaultDuration}
            options={DURATIONS}
            onChange={setDefaultDuration}
            className="w-full"
            buttonClassName="w-full text-left"
            align="left"
          />
        </div>
      </SectionCard>

      <SectionCard title="Events">
        <div className="space-y-3 mb-5">
          <ReusableCheckbox
            label="Show weekends"
            checked={showWeekends}
            onChange={() => setShowWeekends((p) => !p)}
          />
          <ReusableCheckbox
            label="Show cancelled events"
            checked={showCancelled}
            onChange={() => setShowCancelled((p) => !p)}
          />
          <ReusableCheckbox
            label="Show completed events"
            checked={showCompleted}
            onChange={() => setShowCompleted((p) => !p)}
          />
        </div>
        <div className="w-1/2 pr-2">
          <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
            Start of the weekend <span className="text-red-400">*</span>
          </label>
          <CustomSelect
            value={weekendStart}
            options={WEEKDAYS}
            onChange={setWeekendStart}
            className="w-full"
            buttonClassName="w-full text-left"
            align="left"
          />
        </div>
      </SectionCard>

      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          className="bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope px-5 py-2.5 rounded-[8px] cursor-pointer"
        >
          Save Settings
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E293B]/50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center relative shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#1E293B] cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#EBFAF0] flex items-center justify-center mb-4">
              <CheckCircle className="text-[#36C76C]" size={32} />
            </div>
            <h3 className="text-[#29343D] text-lg font-bold font-manrope mb-2">
              Settings Saved
            </h3>
            <p className="text-[#64748B] text-sm font-manrope text-center mb-6">
              Your general settings have been updated successfully.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope py-3 rounded-xl cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
