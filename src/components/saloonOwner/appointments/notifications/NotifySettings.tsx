"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { CustomSelect } from "../CustomSelect";
import { ExceptionClient } from "@/data/data";
import ExceptionsModal from "./ExceptionsModal";
import ReminderPreview from "./ReminderPreview";

// Control Components
import SubjectControl from "./controls/SubjectControl";
import TitleControl from "./controls/TitleControl";
import ContentControl from "./controls/ContentControl";
import CtaControl from "./controls/CtaControl";
import ShowImageControl from "./controls/ShowImageControl";
import AttachFilesControl from "./controls/AttachFilesControl";
import DefaultClientsControl from "./controls/DefaultClientsControl";
import ExceptionsControl from "./controls/ExceptionsControl";

interface NotifySettingsProps {
  onSave?: () => void;
}

export default function NotifySettings({ onSave }: NotifySettingsProps) {
  const [notifyChannels, setNotifyChannels] = useState("Email");
  const [notifySubject, setNotifySubject] = useState("Appointment Scheduled");
  const [notifyTitle, setNotifyTitle] = useState("Appointment Scheduled");
  const [notifyContent, setNotifyContent] = useState(
    "Hi [Client Name], your appointment is scheduled:\n\nService: [Service Name]\nDate & Time: [Date] at [Time]\nProfessional: [Staff Name]\n\nIf you need to reschedule, please contact us.\n\n✨ Thank you for choosing us!",
  );
  const [notifyCtaActive, setNotifyCtaActive] = useState(true);
  const [notifyCtaText, setNotifyCtaText] = useState("CTA Button content");
  const [notifyShowImage, setNotifyShowImage] = useState(true);
  const [notifyDefaultAll, setNotifyDefaultAll] = useState(true);

  // Attachment states
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);

  const handleAttachFiles = (files: { name: string; size: string }[]) => {
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Exceptions states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exceptions, setExceptions] = useState<ExceptionClient[]>([]);

  const addException = (client: ExceptionClient) => {
    if (!exceptions.some((e) => e.id === client.id)) {
      setExceptions((prev) => [...prev, client]);
    }
  };

  const removeException = (id: string) => {
    setExceptions((prev) => prev.filter((e) => e.id !== id));
  };

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
      <div className="flex items-center justify-between">
        <button
          onClick={() => alert("Creating a new notification configuration template...")}
          className="bg-[#E0E7FF] text-[#635BFF] border border-[#C7D2FE] px-4 py-2 rounded-xl font-bold text-[12px] flex items-center gap-1.5 hover:bg-[#D3DCFF] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Notification
        </button>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[500px]">
        <button
          onClick={() => alert("Resetting this notification template to defaults...")}
          className="absolute top-6 right-6 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors z-10"
          title="Delete config"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Left Column: Form Fields */}
        <div className="lg:col-span-5 space-y-5 lg:max-h-[680px] lg:overflow-y-auto lg:pr-2 custom-scrollbar w-full">
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-[#475569]">
              Notification Channels *
            </label>
            <CustomSelect
              value={notifyChannels}
              onChange={setNotifyChannels}
              options={[
                { value: "Email", label: "Email" },
                { value: "WhatsApp", label: "WhatsApp" },
                { value: "SMS", label: "SMS" },
              ]}
            />
          </div>

          <SubjectControl
            subject={notifySubject}
            setSubject={setNotifySubject}
          />

          <TitleControl
            title={notifyTitle}
            setTitle={setNotifyTitle}
          />

          <ContentControl
            content={notifyContent}
            setContent={setNotifyContent}
          />

          <CtaControl
            ctaActive={notifyCtaActive}
            setCtaActive={setNotifyCtaActive}
            ctaText={notifyCtaText}
            setCtaText={setNotifyCtaText}
          />

          <ShowImageControl
            showImage={notifyShowImage}
            setShowImage={setNotifyShowImage}
          />

          <AttachFilesControl
            attachedFiles={attachedFiles}
            onAttachFiles={handleAttachFiles}
            onRemoveFile={handleRemoveFile}
          />

          <DefaultClientsControl
            defaultAll={notifyDefaultAll}
            setDefaultAll={setNotifyDefaultAll}
          />

          <ExceptionsControl
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>

        {/* Right Column: Live Email Preview Frame */}
        <ReminderPreview
          reminderTitle={notifyTitle}
          reminderContent={notifyContent}
          reminderShowImage={notifyShowImage}
          reminderCtaActive={notifyCtaActive}
          reminderCtaText={notifyCtaText}
        />
      </div>

      {/* Action Row */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-3 rounded-xl font-bold text-[13px] shadow-lg shadow-[#635BFF]/20 transition-all active:scale-[0.98] w-full sm:w-auto justify-center"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      {isModalOpen && (
        <ExceptionsModal
          onClose={() => setIsModalOpen(false)}
          exceptions={exceptions}
          onAddException={addException}
          onRemoveException={removeException}
        />
      )}
    </div>
  );
}
