"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import ReminderFormFields from "./ReminderFormFields";
import ReminderPreview from "./ReminderPreview";

interface ReminderSettingsProps {
  onSave?: () => void;
}

export default function ReminderSettings({ onSave }: ReminderSettingsProps) {
  const [reminderChannels, setReminderChannels] = useState("Email");
  const [reminderTimeVal, setReminderTimeVal] = useState("1");
  const [reminderTimeUnit, setReminderTimeUnit] = useState("Days");
  const [reminderSubject, setReminderSubject] = useState(
    "Appointment Reminder",
  );
  const [reminderTitle, setReminderTitle] = useState("Appointment Reminder");
  const [reminderContent, setReminderContent] = useState(
    "Hi [Client Name], your appointment is confirmed:\n\nService: [Service Name]\nDate & Time: [Date] at [Time]\nProfessional: [Staff Name]\n\nIf you need to reschedule, please contact us.\n\n✨ Thank you for choosing [Salon Name]!",
  );
  const [reminderCtaActive, setReminderCtaActive] = useState(true);
  const [reminderCtaText, setReminderCtaText] = useState("CTA Button content");
  const [reminderShowImage, setReminderShowImage] = useState(true);
  const [reminderDefaultAll, setReminderDefaultAll] = useState(true);

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      alert("Settings saved successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Top Bar */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() =>
            alert("Creating a new notification configuration template...")
          }
          className="w-full sm:w-auto bg-[#E0E7FF] text-[#635BFF] border border-[#C7D2FE] px-4 py-2 rounded-xl font-bold text-[12px] flex items-center justify-center gap-1.5 hover:bg-[#D3DCFF] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Reminder
        </button>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[500px]">
        <button
          onClick={() =>
            alert("Resetting this notification template to defaults...")
          }
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors z-10"
          title="Delete config"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <ReminderFormFields
          reminderChannels={reminderChannels}
          setReminderChannels={setReminderChannels}
          reminderTimeVal={reminderTimeVal}
          setReminderTimeVal={setReminderTimeVal}
          reminderTimeUnit={reminderTimeUnit}
          setReminderTimeUnit={setReminderTimeUnit}
          reminderSubject={reminderSubject}
          setReminderSubject={setReminderSubject}
          reminderTitle={reminderTitle}
          setReminderTitle={setReminderTitle}
          reminderContent={reminderContent}
          setReminderContent={setReminderContent}
          reminderCtaActive={reminderCtaActive}
          setReminderCtaActive={setReminderCtaActive}
          reminderCtaText={reminderCtaText}
          setReminderCtaText={setReminderCtaText}
          reminderShowImage={reminderShowImage}
          setReminderShowImage={setReminderShowImage}
          reminderDefaultAll={reminderDefaultAll}
          setReminderDefaultAll={setReminderDefaultAll}
        />

        <ReminderPreview
          reminderTitle={reminderTitle}
          reminderContent={reminderContent}
          reminderShowImage={reminderShowImage}
          reminderCtaActive={reminderCtaActive}
          reminderCtaText={reminderCtaText}
        />
      </div>

      {/* Action Row */}
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
