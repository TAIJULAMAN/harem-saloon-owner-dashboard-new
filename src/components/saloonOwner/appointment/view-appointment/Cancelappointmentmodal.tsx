"use client";

import React, { useState, useRef } from "react";
import { X, ChevronDown } from "lucide-react";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface CancelAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (reason: string) => void;
}

// â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CANCEL_REASONS = [
  "No reason provided",
  "Duplicate appointment",
  "Appointment made by mistake",
  "Client not available",
];

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function CancelAppointmentModal({
  open,
  onClose,
  onSave,
}: CancelAppointmentModalProps) {
  const [selectedReason, setSelectedReason] =
    useState<string>("No reason provided");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  function handleSave(): void {
    onSave(selectedReason);
    onClose();
  }

  function selectReason(reason: string): void {
    setSelectedReason(reason);
    setDropdownOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(41,52,61,0.35)", backdropFilter: "blur(2px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full relative max-w-[746px]">
        {/* â”€â”€ Header â”€â”€ */}
        <div className="flex items-start justify-between px-7 pt-6 pb-2">
          <div>
            <p className="text-lg font-bold font-manrope text-[#29343D]">
              Cancel Appointment
            </p>
            <p className="text-sm font-manrope text-[#98A4AE] mt-2 font-normal">
              Are you sure you want to cancel this appointment?
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] transition-colors cursor-pointer mt-0.5 flex-shrink-0"
          >
            <X size={16} color="#98A4AE" />
          </button>
        </div>

        {/* â”€â”€ Body â”€â”€ */}
        <div className="px-7 pt-5 pb-7">
          <p className="text-sm font-semibold font-manrope text-[#29343D] mb-2">
            Reason <span className="text-[#635BFF]">*</span>
          </p>

          {/* Custom dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p: boolean) => !p)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[4px] bg-white text-sm font-manrope text-[#98A4AE] hover:border-[#635BFF] transition-colors cursor-pointer"
            >
              <span
                className={
                  selectedReason !== "No reason provided"
                    ? "text-[#29343D] font-semibold"
                    : ""
                }
              >
                {selectedReason}
              </span>
              <ChevronDown
                size={18}
                color="#98A4AE"
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-[calc(100%+4px)] w-full bg-white border border-[#EFF4FA] rounded-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.10)] z-10 py-2 overflow-hidden">
                {CANCEL_REASONS.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => selectReason(reason)}
                    className={`w-full text-left px-5 py-3 text-sm font-manrope transition-colors cursor-pointer ${
                      selectedReason === reason
                        ? "text-[#635BFF] font-semibold bg-[#F4F3FF]"
                        : "text-[#29343D] hover:bg-[#F4F6FA]"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* â”€â”€ Save button â”€â”€ */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
