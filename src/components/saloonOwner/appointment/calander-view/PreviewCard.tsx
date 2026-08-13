"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import Image from "next/image";

function IconEye() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function IconDots() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

// Dropdown Menu

function DropdownMenu({
  onViewDetails,
  onEdit,
  onDelete,
  onClose,
}: {
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-7 z-10 bg-white rounded-[12px] shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 w-[148px]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          onViewDetails?.();
          onClose();
        }}
        className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm font-manrope text-[#29343D] hover:bg-[#F5F8FB] transition-colors"
      >
        <span className="text-[#29343D]">
          <IconEye />
        </span>
        View details
      </button>
      <button
        onClick={() => {
          onEdit?.();
          onClose();
        }}
        className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm font-manrope text-[#29343D] hover:bg-[#F5F8FB] transition-colors"
      >
        <span className="text-[#29343D]">
          <IconPencil />
        </span>
        Edit
      </button>
      <button
        onClick={() => {
          onDelete?.();
          onClose();
        }}
        className="flex items-center gap-2.5 w-full px-3.5 py-2 text-sm font-manrope text-[#E53535] hover:bg-[#FFF1F1] transition-colors"
      >
        <span className="text-[#E53535]">
          <IconTrash />
        </span>
        Delete
      </button>
    </div>
  );
}

export default function PreviewCard({
  appt,
  onViewDetails,
  onEdit,
  onDelete,
  style,
  statusBadgeColor,
}: {
  appt: CalAppointment;
  onClose: () => void;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  style?: React.CSSProperties;
  statusBadgeColor?: Record<AppStatus, string>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const badgeClass =
    statusBadgeColor?.[appt.status] ?? "bg-gray-100 text-gray-700";

  const latestNote =
    "Client requested a trim and light layers. Prefers no heat styling. Allergic to certain dyes â€” check profile before rescheduling.";

  return (
    <div
      className="absolute z-50 bg-white rounded-[14px] shadow-[0px_12px_40px_rgba(0,0,0,0.15)] border border-[#EFF4FA] p-4 w-[350px]"
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image
            src="/avatar/icon1.png"
            alt={appt.employeeName}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold font-manrope text-[#29343D]">
            {appt.clientName}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-semibold font-manrope px-2 py-0.5 rounded-full ${badgeClass}`}
          >
            {appt.status}
          </span>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              className="flex items-center justify-center w-6 h-6 rounded-full text-[#98A4AE] hover:bg-[#F5F8FB] transition-colors"
            >
              <IconDots />
            </button>

            {menuOpen && (
              <DropdownMenu
                onViewDetails={onViewDetails}
                onEdit={onEdit}
                onDelete={onDelete}
                onClose={() => setMenuOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2.5">
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
            Date
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.date
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "/")}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
            Time
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.startTime} - {appt.endTime}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
            Service
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.service}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
              Price
            </p>
            <p className="text-xs font-semibold font-manrope text-[#29343D]">
              {/* {appt.price} */} € 170
            </p>
          </div>
          <div>
            <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
              Duration
            </p>
            <p className="text-xs font-semibold font-manrope text-[#29343D]">
              {appt.duration}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5 uppercase tracking-wide">
            Employee
          </p>
          <div className="flex items-center gap-1">
            <Image
              src="/avatar/icon1.png"
              alt={appt.employeeName}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
            <p className="text-xs font-semibold font-manrope text-[#29343D] truncate">
              {appt.employeeName}
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-3 rounded-[10px] bg-[#F5F8FB] px-3 py-2.5">
        <p className="text-[10px] font-manrope text-[#98A4AE] mb-1 uppercase tracking-wide">
          Notes
        </p>
        <p className="text-xs font-manrope text-[#29343D] leading-[1.6]">
          {latestNote}
        </p>
      </div>
    </div>
  );
}
