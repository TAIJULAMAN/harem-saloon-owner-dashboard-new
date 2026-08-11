"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { CustomSelect } from "../CustomSelect";
import { ExceptionClient } from "@/data/data";
import ExceptionsModal from "./ExceptionsModal";
import ReminderPreview from "./ReminderPreview";
import SubjectControl from "./controls/SubjectControl";
import TitleControl from "./controls/TitleControl";
import ContentControl from "./controls/ContentControl";
import CtaControl from "./controls/CtaControl";
import ShowImageControl from "./controls/ShowImageControl";
import AttachFilesControl from "./controls/AttachFilesControl";
import DefaultClientsControl from "./controls/DefaultClientsControl";
import ExceptionsControl from "./controls/ExceptionsControl";

interface ReviewSettingsProps {
  onSave?: () => void;
}

export default function ReviewSettings({ onSave }: ReviewSettingsProps) {
  const [reviewChannels, setReviewChannels] = useState("Email");
  const [reviewSendWhen, setReviewSendWhen] = useState("after_apt");
  const [reviewCountVal, setReviewCountVal] = useState("1");
  const [reviewMaxRequests, setReviewMaxRequests] = useState("1");
  const [reviewRecurrent, setReviewRecurrent] = useState("Not recurrent");
  const [reviewSubject, setReviewSubject] = useState(
    "We'd love your feedback!",
  );
  const [reviewTitle, setReviewTitle] = useState("We'd love your feedback!");
  const [reviewContent, setReviewContent] = useState(
    "Hi [Client Name], thank you for visiting [Salon Name]. We hope you enjoyed your [Service Name]. ✨\n\nCould you take a moment to leave us a quick review? Your opinion helps us improve and serve you better. 💖\n\nThank you for your time!",
  );
  const [reviewCtaActive, setReviewCtaActive] = useState(true);
  const [reviewCtaText, setReviewCtaText] = useState("Review Link");
  const [reviewShowImage, setReviewShowImage] = useState(true);
  const [reviewDefaultAll, setReviewDefaultAll] = useState(true);

  // Attachment states
  const [attachedFiles, setAttachedFiles] = useState<
    { name: string; size: string }[]
  >([]);

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
          onClick={() =>
            alert("Creating a new notification configuration template...")
          }
          className="bg-[#E0E7FF] text-[#635BFF] border border-[#C7D2FE] px-4 py-2 rounded-xl font-bold text-[12px] flex items-center gap-1.5 hover:bg-[#D3DCFF] transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Message Review
        </button>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[500px]">
        <button
          onClick={() =>
            alert("Resetting this notification template to defaults...")
          }
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
              value={reviewChannels}
              onChange={setReviewChannels}
              options={[
                 { value: "Email", label: "Email" },
                 { value: "WhatsApp", label: "WhatsApp" },
                 { value: "SMS", label: "SMS" },
              ]}
            />
          </div>

          {/* Send When */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-[#475569]">
              Send When *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="reviewSendWhen"
                  checked={reviewSendWhen === "after_apt"}
                  onChange={() => setReviewSendWhen("after_apt")}
                  className="w-4 h-4 text-[#635BFF] border-[#E2E8F0] focus:ring-[#635BFF] cursor-pointer"
                />
                <span className="text-[13px] font-semibold text-[#475569] group-hover:text-[#1E293B]">
                  After appointment
                </span>
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="reviewSendWhen"
                  checked={reviewSendWhen === "after_count"}
                  onChange={() => setReviewSendWhen("after_count")}
                  className="w-4 h-4 text-[#635BFF] border-[#E2E8F0] focus:ring-[#635BFF] cursor-pointer"
                />
                <span className="text-[13px] font-semibold text-[#475569] whitespace-nowrap">
                  After
                </span>
                <input
                  type="number"
                  value={reviewCountVal}
                  onChange={(e) => setReviewCountVal(e.target.value)}
                  className="w-16 px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] text-center outline-none focus:border-[#635BFF]"
                  disabled={reviewSendWhen !== "after_count"}
                />
                <span className="text-[13px] font-semibold text-[#475569]">
                  Appointments
                </span>
              </div>
            </div>
          </div>

          {/* Max Requests and Recurrence */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-[#475569]">
                Maximum requests per client *
              </label>
              <input
                type="number"
                value={reviewMaxRequests}
                onChange={(e) => setReviewMaxRequests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF]"
              />
            </div>
            <div className="space-y-1.5 pt-6">
              <CustomSelect
                value={reviewRecurrent}
                onChange={setReviewRecurrent}
                options={["Not recurrent", "Recurrent"]}
              />
            </div>
          </div>

          <SubjectControl
            subject={reviewSubject}
            setSubject={setReviewSubject}
          />

          <TitleControl title={reviewTitle} setTitle={setReviewTitle} />

          <ContentControl
            content={reviewContent}
            setContent={setReviewContent}
          />

          <CtaControl
            ctaActive={reviewCtaActive}
            setCtaActive={setReviewCtaActive}
            ctaText={reviewCtaText}
            setCtaText={setReviewCtaText}
          />

          <ShowImageControl
            showImage={reviewShowImage}
            setShowImage={setReviewShowImage}
          />

          <AttachFilesControl
            attachedFiles={attachedFiles}
            onAttachFiles={handleAttachFiles}
            onRemoveFile={handleRemoveFile}
          />

          <DefaultClientsControl
            defaultAll={reviewDefaultAll}
            setDefaultAll={setReviewDefaultAll}
          />

          <ExceptionsControl onOpenModal={() => setIsModalOpen(true)} />
        </div>

        {/* Right Column: Live Email Preview Frame */}
        <ReminderPreview
          reminderTitle={reviewTitle}
          reminderContent={reviewContent}
          reminderShowImage={reviewShowImage}
          reminderCtaActive={reviewCtaActive}
          reminderCtaText={reviewCtaText}
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
