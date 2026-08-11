"use client";

import React, { useState } from "react";
import { CustomSelect } from "../CustomSelect";
import ExceptionsModal from "./ExceptionsModal";
import { ExceptionClient } from "@/data/data";
import SendingTimesControl from "./controls/SendingTimesControl";
import SubjectControl from "./controls/SubjectControl";
import TitleControl from "./controls/TitleControl";
import ContentControl from "./controls/ContentControl";
import CtaControl from "./controls/CtaControl";
import ShowImageControl from "./controls/ShowImageControl";
import AttachFilesControl from "./controls/AttachFilesControl";
import DefaultClientsControl from "./controls/DefaultClientsControl";
import ExceptionsControl from "./controls/ExceptionsControl";

interface ReminderFormFieldsProps {
  reminderChannels: string;
  setReminderChannels: (val: string) => void;
  reminderTimeVal: string;
  setReminderTimeVal: (val: string) => void;
  reminderTimeUnit: string;
  setReminderTimeUnit: (val: string) => void;
  reminderSubject: string;
  setReminderSubject: (val: string) => void;
  reminderTitle: string;
  setReminderTitle: (val: string) => void;
  reminderContent: string;
  setReminderContent: (val: string) => void;
  reminderCtaActive: boolean;
  setReminderCtaActive: (val: boolean) => void;
  reminderCtaText: string;
  setReminderCtaText: (val: string) => void;
  reminderShowImage: boolean;
  setReminderShowImage: (val: boolean) => void;
  reminderDefaultAll: boolean;
  setReminderDefaultAll: (val: boolean) => void;
}

export default function ReminderFormFields({
  reminderChannels,
  setReminderChannels,
  reminderTimeVal,
  setReminderTimeVal,
  reminderTimeUnit,
  setReminderTimeUnit,
  reminderSubject,
  setReminderSubject,
  reminderTitle,
  setReminderTitle,
  reminderContent,
  setReminderContent,
  reminderCtaActive,
  setReminderCtaActive,
  reminderCtaText,
  setReminderCtaText,
  reminderShowImage,
  setReminderShowImage,
  reminderDefaultAll,
  setReminderDefaultAll,
}: ReminderFormFieldsProps) {
  const [attachedFiles, setAttachedFiles] = useState<
    { name: string; size: string }[]
  >([]);

  const handleAttachFiles = (files: { name: string; size: string }[]) => {
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

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

  return (
    <div className="pt-6 lg:pt-0 lg:col-span-5 space-y-5 lg:max-h-[680px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
      <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-[#475569]">
          Notification Channels *
        </label>
        <CustomSelect
          value={reminderChannels}
          onChange={setReminderChannels}
          options={[
            { value: "Email", label: "Email" },
            { value: "WhatsApp", label: "WhatsApp" },
            { value: "SMS", label: "SMS" },
          ]}
        />
      </div>

      <SendingTimesControl
        timeVal={reminderTimeVal}
        setTimeVal={setReminderTimeVal}
        timeUnit={reminderTimeUnit}
        setTimeUnit={setReminderTimeUnit}
      />

      <SubjectControl
        subject={reminderSubject}
        setSubject={setReminderSubject}
      />

      <TitleControl title={reminderTitle} setTitle={setReminderTitle} />

      <ContentControl
        content={reminderContent}
        setContent={setReminderContent}
      />

      <CtaControl
        ctaActive={reminderCtaActive}
        setCtaActive={setReminderCtaActive}
        ctaText={reminderCtaText}
        setCtaText={setReminderCtaText}
      />

      <ShowImageControl
        showImage={reminderShowImage}
        setShowImage={setReminderShowImage}
      />

      <AttachFilesControl
        attachedFiles={attachedFiles}
        onAttachFiles={handleAttachFiles}
        onRemoveFile={handleRemoveFile}
      />

      <DefaultClientsControl
        defaultAll={reminderDefaultAll}
        setDefaultAll={setReminderDefaultAll}
      />

      <ExceptionsControl onOpenModal={() => setIsModalOpen(true)} />

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
