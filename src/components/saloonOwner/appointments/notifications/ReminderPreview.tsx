"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";

interface ReminderPreviewProps {
  reminderTitle: string;
  reminderContent: string;
  reminderShowImage: boolean;
  reminderCtaActive: boolean;
  reminderCtaText: string;
}

export default function ReminderPreview({
  reminderTitle,
  reminderContent,
  reminderShowImage,
  reminderCtaActive,
  reminderCtaText,
}: ReminderPreviewProps) {
  // Split the thank-you sentence if it exists
  let mainBody = reminderContent;
  let thankYouText = "";

  const thankYouIdx = reminderContent.indexOf("✨");
  if (thankYouIdx !== -1) {
    mainBody = reminderContent.substring(0, thankYouIdx).trim();
    thankYouText = reminderContent.substring(thankYouIdx).trim();
  }

  const formattedMainBody = mainBody
    .replace("[Client Name]", "Amelia")
    .replace("[Service Name]", "Manicure")
    .replace("[Date]", "08/05/2025")
    .replace("[Time]", "10:00 AM")
    .replace("[Staff Name]", "Maria Rodriguez")
    .replace("[Salon Name]", "Maxima Studio");

  const formattedThankYou = thankYouText
    .replace("[Salon Name]", "Maxima Studio");

  return (
    <div className="lg:col-span-7 bg-[#F4F6FA] rounded-3xl p-6 md:p-8 flex items-center justify-center min-h-[500px]">
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-in fade-in duration-300">
        <div className="bg-[#635BFF] p-6 text-white text-center flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/appointmentSettingsIcon/logo.svg"
              alt="Salon Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-[#EEF2FF] rounded-2xl p-4 text-center">
            <h2 className="text-[#635BFF] font-extrabold text-[15px] font-manrope">
              {reminderTitle}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-5">
            {/* Split layout for text and bell graphic */}
            <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
              {/* Left Column: Text and CTA Button */}
              <div className="flex-1 space-y-4 w-full">
                <p className="text-[12.5px] font-semibold text-[#475569] leading-relaxed whitespace-pre-line text-left">
                  {formattedMainBody}
                </p>

                {/* CTA Button */}
                {reminderCtaActive && (
                  <div className="flex justify-start">
                    <button
                      onClick={() => alert("Simulating CTA button click...")}
                      className="bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-xl font-extrabold text-[11px] transition-colors shadow-md shadow-[#635BFF]/15 w-full sm:w-auto text-center"
                    >
                      {reminderCtaText}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Bell Illustration */}
              {reminderShowImage && (
                <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] relative shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/appointmentSettingsIcon/reminder.svg"
                    alt="Appointment Reminder Graphic"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Bottom: Thank You Message */}
            {formattedThankYou && (
              <div className="text-[12.5px] font-bold text-[#475569] text-left border-t border-slate-100/70 pt-4 mt-2">
                {formattedThankYou}
              </div>
            )}
          </div>
        </div>

        {/* Footer with social links */}
        <div className="p-5 bg-[#EEF2FF]/50 border-t border-slate-100 flex justify-center gap-3">
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center hover:bg-[#524be0] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center hover:bg-[#524be0] transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center hover:bg-[#524be0] transition-colors"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
