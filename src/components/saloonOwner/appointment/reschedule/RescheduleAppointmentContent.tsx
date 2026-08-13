"use client";

import React, { useState, useRef } from "react";
import { GripVertical } from "lucide-react";
import RescheduleCalanderHead from "./RescheduleCalanderHead";
import PageHeader from "@/components/common-component/PageHeader";
import { useRouter } from "next/navigation";
import RescheduleDayView from "./RescheduleDayView";
import RescheduleWeekView from "./RescheduleWeekView";
import RescheduleMonthView from "./RescheduleMonthView";

interface Service {
  id: string;
  name: string;
  duration: string;
}

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
}

interface ScheduledAppointment {
  staffId: string;
  serviceId: string;
  startSlot: number;
  duration: number;
  dayIndex?: number;
}

type CalendarView = "Month" | "Week" | "Day";

const SERVICES: Service[] = [
  { id: "s1", name: "Haircut", duration: "40 min" },
  { id: "s2", name: "Makeup", duration: "40 min" },
  { id: "s3", name: "Haircut", duration: "40 min" },
];

const STAFF: StaffMember[] = [
  { id: "1", name: "Shah Aman", avatar: "/avatar/icon1.png" },
  { id: "2", name: "Hasan Saon", avatar: "/avatar/icon2.png" },
  { id: "3", name: "Hridoy Khan", avatar: "/avatar/icon3.png" },
];

interface Slot {
  label: string;
  isHour: boolean;
}

function buildSlots(): Slot[] {
  const out: Slot[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const isHour = m === 0;
      const period = h < 12 ? "AM" : "PM";
      const display = h === 0 ? 12 : h <= 12 ? h : h - 12;
      out.push({ label: isHour ? `${display}:00 ${period}` : "", isHour });
    }
  }
  return out;
}

const SLOTS = buildSlots();
const ROW_H = 40; // px per 15-min slot
const TIME_W = 80; // px for time gutter
const MIN_COL = 110; // minimum column width before scroll kicks in

export default function RescheduleAppointmentContent() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 8, 2));
  const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
  const [activePeriod, setActivePeriod] = useState<CalendarView>("Day");
  const [appointments, setAppointments] = useState<ScheduledAppointment[]>([]);
  const [dragging, setDragging] = useState<Service | null>(null);
  const [hoverCell, setHoverCell] = useState<{
    sid: string;
    idx: number;
  } | null>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      calendarWrapperRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Date helpers
  function fmt(d: Date) {
    if (activePeriod === "Month")
      return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (activePeriod === "Week") {
      const s = new Date(d);
      s.setDate(s.getDate() - s.getDay());
      const e = new Date(s);
      e.setDate(e.getDate() + 6);
      return `${s.toLocaleDateString("en-US", { month: "short", day: "2-digit" })} - ${e.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}`;
    }
    return d
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
      })
      .replace(",", "");
  }
  function prev() {
    setCurrentDate((d) => {
      const nd = new Date(d);
      if (activePeriod === "Day") nd.setDate(nd.getDate() - 1);
      else if (activePeriod === "Week") nd.setDate(nd.getDate() - 7);
      else nd.setMonth(nd.getMonth() - 1);
      return nd;
    });
  }
  function next() {
    setCurrentDate((d) => {
      const nd = new Date(d);
      if (activePeriod === "Day") nd.setDate(nd.getDate() + 1);
      else if (activePeriod === "Week") nd.setDate(nd.getDate() + 7);
      else nd.setMonth(nd.getMonth() + 1);
      return nd;
    });
  }

  //  Drag & drop
  function onDragStart(e: React.DragEvent, svc: Service) {
    setDragging(svc);
    e.dataTransfer.effectAllowed = "copy";
  }
  function onDragEnd() {
    setDragging(null);
    setHoverCell(null);
  }
  function onOver(e: React.DragEvent, sid: string, idx: number) {
    e.preventDefault();
    setHoverCell({ sid, idx });
  }
  function onDrop(e: React.DragEvent, sid: string, idx: number) {
    e.preventDefault();
    if (!dragging) return;
    const dur = Math.ceil(parseInt(dragging.duration) / 15);

    let staffId = sid;
    let dayIndex = undefined;

    if (sid.includes("_month_")) {
      const parts = sid.split("_month_");
      staffId = parts[0];
      dayIndex = parseInt(parts[1]);
    } else if (sid.includes("_")) {
      const parts = sid.split("_");
      staffId = parts[0];
      dayIndex = parseInt(parts[1]);
    }

    setAppointments((p) => [
      ...p,
      {
        staffId,
        serviceId: dragging.id,
        startSlot: idx,
        duration: dur,
        dayIndex,
      },
    ]);
    setDragging(null);
    setHoverCell(null);
  }
  function removeAppt(i: number) {
    setAppointments((p) => p.filter((_, j) => j !== i));
  }

  return (
    <div className="h-full font-manrope flex flex-col gap-5">
      <PageHeader
        title="Reschedule Appointment"
        onBack={() => router.back()}
        breadcrumb={[{ label: "Appointments", active: true }]}
      />
      <div
        ref={calendarWrapperRef}
        className="flex-1 min-h-0 bg-white rounded-2xl border border-[#EEF2F8] flex flex-col overflow-hidden bg-white"
      >
        {/* Toolbar */}
        <div className="shrink-0">
          <RescheduleCalanderHead
            prevDay={prev}
            activePeriod={activePeriod}
            formatDate={fmt}
            nextDay={next}
            currentDate={currentDate}
            setActivePeriod={setActivePeriod}
            onToggleFullscreen={toggleFullscreen}
            selectedTeamIds={selectedTeamIds}
            setSelectedTeamIds={setSelectedTeamIds}
            teamMembers={STAFF}
          />
        </div>

        {/* Two-column body  */}
        <div className="flex flex-1 min-h-0 flex-col md:flex-row overflow-hidden m-7 border border-[#E0E6EB] rounded-xl">
          {/*  LEFT: services panel  */}
          <div className="shrink-0 border-r min-h-0 w-[222px] border-[#EEF2F8] flex flex-col">
            <div className="shrink-0 border-r border-b border-[#E0E6EB] px-5 flex flex-col justify-center bg-[#F3F3FF] h-[88px]">
              <p className="text-base font-semibold font-manrope text-[#29343D]">
                Available Services
              </p>
              <p className="text-sm font-manrope text-[#98A4AE] mt-1">
                Drag services to schedule appointemnts
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, s)}
                  onDragEnd={onDragEnd}
                  className="flex items-center justify-between px-2.5 py-[5px] select-none cursor-grab active:cursor-grabbing hover:brightness-95 transition-all"
                  style={{
                    background: "#DDDBFF",
                    borderLeft: "3px solid #635BFF",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  <div>
                    <p className="text-sm font-medium font-manrope text-[#635BFF] leading-6">
                      {s.name}
                    </p>
                    <p className="text-[12px] font-normal font-manrope text-[#635BFF] leading-4">
                      {s.duration}
                    </p>
                  </div>
                  <div className="text-[#635BFF] cursor-grab ml-2 opacity-50">
                    <GripVertical size={16} color="#635BFF" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ── Calendar Grids ── */}
          {activePeriod === "Day" && (
            <RescheduleDayView
              STAFF={STAFF}
              SERVICES={SERVICES}
              SLOTS={SLOTS}
              appointments={appointments}
              TIME_W={TIME_W}
              ROW_H={ROW_H}
              MIN_COL={MIN_COL}
              hoverCell={hoverCell}
              onOver={onOver}
              onDrop={onDrop}
              removeAppt={removeAppt}
            />
          )}
          {activePeriod === "Week" && (
            <RescheduleWeekView
              STAFF={STAFF}
              SERVICES={SERVICES}
              SLOTS={SLOTS}
              appointments={appointments}
              TIME_W={TIME_W}
              ROW_H={ROW_H}
              MIN_COL={MIN_COL}
              hoverCell={hoverCell}
              onOver={onOver}
              onDrop={onDrop}
              removeAppt={removeAppt}
              currentDate={currentDate}
              selectedTeamIds={selectedTeamIds}
            />
          )}
          {activePeriod === "Month" && (
            <RescheduleMonthView
              STAFF={STAFF}
              SERVICES={SERVICES}
              appointments={appointments}
              hoverCell={hoverCell}
              onOver={onOver}
              onDrop={onDrop}
              removeAppt={removeAppt}
              currentDate={currentDate}
              selectedTeamIds={selectedTeamIds}
            />
          )}
        </div>
        <div className="shrink-0 flex justify-end p-[30px_30px] pt-[0px]">
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 text-white bg-[#635BFF] hover:bg-[#4f49e0] font-semibold font-manrope rounded-[12px] transition-colors cursor-pointer shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
