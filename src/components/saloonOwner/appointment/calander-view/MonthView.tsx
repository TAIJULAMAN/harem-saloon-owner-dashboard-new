"use client";

import { useRef, useState } from "react";
import AppPill from "./AppPill";
import NewAppointmentModal from "./NewAppointmentModal";
import PreviewCard from "./PreviewCard";
import {
  CalAppointment,
  AppStatus,
} from "@/@types/salon-owner/CalAppointment.type";

type Props = {
  date: Date;
  selectedMemberIds: string[];
  teamMembers: { id: string; name: string; avatar: string }[];
  allAppointments: CalAppointment[];
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor?: Record<AppStatus, string>;
  onAppointmentCreate?: (appt: CalAppointment) => void;
  onAppointmentUpdate?: (appt: CalAppointment) => void;
};

// Helpers 
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

function getMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }

  return grid;
}

export default function MonthView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  statusColor,
  statusBadgeColor,
  onAppointmentCreate,
  onAppointmentUpdate,
}: Props) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);

  const [draggedAppt, setDraggedAppt] = useState<CalAppointment | null>(null);
  const [dragOverDay, setDragOverDay] = useState<Date | null>(null);

  const didClickPillRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const grid = getMonthGrid(date.getFullYear(), date.getMonth());
  const today = new Date();

  const memberAppts = (allAppointments ?? []).filter((a) =>
    selectedMemberIds.includes(a.employeeId)
  );

  const handleDayCellClick = (day: Date, e: React.MouseEvent) => {
    if (didClickPillRef.current) {
      didClickPillRef.current = false;
      return;
    }
    e.stopPropagation();
    setPreview(null);
    setSelectedDay(day);
  };

  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    e.stopPropagation();
    didClickPillRef.current = true;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    setPreview({
      appt,
      x: rect.left - containerRect.left + rect.width + 8,
      y: rect.top - containerRect.top,
    });
    setSelectedDay(null);
  };

  const handlePillDragStart = (appt: CalAppointment, e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedAppt(appt);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDayCellDragOver = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    setDragOverDay(day);
  };

  const handleDayCellDrop = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedAppt) return;

    onAppointmentUpdate?.({
      ...draggedAppt,
      date: day,
    });
    setDraggedAppt(null);
    setDragOverDay(null);
  };

  const handleConfirm = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
  ) => {
    if (!selectedDay) return;
    onAppointmentCreate?.({
      id: `appt-${Date.now()}`,
      ...data,
      date: selectedDay,
      startTime: "09:00",
      endTime: "10:00",
    });
    setSelectedDay(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full font-manrope bg-white"
      onClick={() => setPreview(null)}
    >
      <div className="min-w-[1000px] h-full flex flex-col">
        <div className="mx-[15px] md:mx-[30px] border border-[#E0E6EB] rounded-xl flex flex-col overflow-hidden shadow-sm">

          {/* Header Row - GlamPro Style */}
          <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#F3F3FF]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="py-4 text-center text-[11px] font-semibold text-[#98A4AE] uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="flex-1 flex flex-col">
            {grid.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 border-b border-[#E0E6EB] last:border-b-0">
                {week.map((day, di) => {
                  const dayAppts = day
                    ? memberAppts.filter((a) => isSameDay(a.date, day))
                    : [];

                  const isToday = day && isSameDay(today, day);
                  const isDragOver = dragOverDay && day && isSameDay(dragOverDay, day);

                  return (
                    <div
                      key={di}
                      className={`
                        border-r border-[#E0E6EB] last:border-r-0
                        min-h-[140px] p-2 relative group
                        transition-all duration-200
                        ${!day ? "bg-[#FAFBFF]" : "bg-white hover:bg-[#F3F3FF]/30 cursor-cell"}
                        ${isDragOver ? "bg-[#F0EFFF] ring-2! ring-inset! ring-[#635BFF]! z-10" : ""}
                      `}
                      onClick={(e) => day && handleDayCellClick(day, e)}
                      onDragOver={(e) => day && handleDayCellDragOver(e, day)}
                      onDrop={(e) => day && handleDayCellDrop(e, day)}
                      onDragLeave={() => setDragOverDay(null)}
                    >
                      {day && (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`
                               text-[13px] font-bold w-7 h-7 flex items-center justify-center rounded-full
                               ${isToday ? "bg-[#635BFF] text-white" : "text-[#29343D]"}
                             `}>
                              {day.getDate()}
                            </span>
                            {/* Hover Add Indicator */}
                            <span className="opacity-0 group-hover:opacity-100 text-[#635BFF] text-lg font-bold leading-none">+</span>
                          </div>

                          <div className="flex flex-col gap-1.5 overflow-hidden">
                            {dayAppts.slice(0, 3).map((appt) => (
                              <div
                                key={appt.id}
                                draggable
                                onDragStart={(e) => handlePillDragStart(appt, e)}
                                onDragEnd={() => { setDraggedAppt(null); setDragOverDay(null); }}
                              >
                                <AppPill
                                  appt={appt}
                                  onClick={handlePillClick}
                                  statusColor={statusColor}
                                  compact
                                />
                              </div>
                            ))}

                            {dayAppts.length > 3 && (
                              <div className="px-2 py-0.5">
                                <p className="text-[11px] font-bold text-[#635BFF] bg-[#635BFF]/5 w-fit px-1.5 rounded">
                                  + {dayAppts.length - 3} more
                                </p>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview card - Centering logic improved */}
      {preview && (
        <PreviewCard
          appt={preview.appt}
          onClose={() => setPreview(null)}
          statusBadgeColor={statusBadgeColor}
          style={{
            top: Math.min(preview.y, 500),
            left: Math.min(preview.x, 800),
          }}
        />
      )}

      {/* New Appointment Modal */}
      {selectedDay && (
        <NewAppointmentModal
          memberId={selectedMemberIds[0]}
          startTime="09:00"
          endTime="10:00"
          date={selectedDay}
          teamMembers={teamMembers}
          onClose={() => setSelectedDay(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
