import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  dayIndex?: number; // Optional: To map to a specific day in the week
}
interface Slot {
  label: string;
  isHour: boolean;
}

export default function RescheduleWeekView({
  STAFF,
  SERVICES,
  SLOTS,
  appointments,
  TIME_W,
  ROW_H,
  MIN_COL,
  hoverCell,
  onOver,
  onDrop,
  removeAppt,
  currentDate,
  selectedTeamIds,
}: {
  STAFF: StaffMember[];
  SERVICES: Service[];
  SLOTS: Slot[];
  appointments: ScheduledAppointment[];
  TIME_W: number;
  ROW_H: number;
  MIN_COL: number;
  hoverCell: { sid: string; idx: number } | null;
  onOver: (e: React.DragEvent, sid: string, idx: number) => void;
  onDrop: (e: React.DragEvent, sid: string, idx: number) => void;
  removeAppt: (idx: number) => void;
  currentDate: Date;
  selectedTeamIds: string[];
}) {
  const [colW, setColW] = useState<number>(MIN_COL);

  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function recalc() {
      if (!containerRef.current) return;
      const avail = containerRef.current.offsetWidth - TIME_W;
      setColW(Math.max(Math.floor(avail / 7), MIN_COL));
    }
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [TIME_W, MIN_COL]);

  const totalW = colW * 7;

  function slide(dir: "l" | "r") {
    const body = bodyRef.current;
    const head = headRef.current;
    if (!body) return;
    body.scrollLeft += dir === "l" ? -(colW * 2) : colW * 2;
    if (head) head.scrollLeft = body.scrollLeft;
  }

  const onBodyScroll = useCallback(() => {
    if (headRef.current && bodyRef.current)
      headRef.current.scrollLeft = bodyRef.current.scrollLeft;
  }, []);

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays(currentDate);

  // If exact one staff is selected, we map the dropping to them, otherwise null (disabled)
  const activeStaffId = selectedTeamIds.length === 1 ? selectedTeamIds[0] : null;

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0 flex flex-col overflow-hidden"
    >
      {/* Week header row */}
      <div className="shrink-0 bg-[#F3F3FF] relative h-[88px]">
        {/* Left arrow */}
        <button
          onClick={() => slide("l")}
          className="absolute z-30 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#DDE3EC] shadow-sm hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          style={{ left: TIME_W - 14 }}
        >
          <ChevronLeft size={14} strokeWidth={2} className="text-[#7A8FA6]" />
        </button>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            position: "absolute",
            left: TIME_W,
            right: 36,
            top: 0,
            bottom: 0,
            overflowX: "hidden",
          }}
        >
          <div
            className="flex h-full border-l border-[#E0E6EB]"
            style={{ width: totalW }}
          >
            {weekDays.map((day, i) => (
              <div
                key={i}
                className="shrink-0 flex flex-col items-center justify-center gap-[6px] border-r border-[#E0E6EB] last:border-r-0"
                style={{ width: colW }}
              >
                <span className="text-sm font-semibold font-manrope text-[#29343D]">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-[12px] font-manrope text-[#98A4AE]">
                  {day.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => slide("r")}
          className="absolute z-30 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#DDE3EC] shadow-sm hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          style={{ right: 6 }}
        >
          <ChevronRight size={14} strokeWidth={2} className="text-[#7A8FA6]" />
        </button>
      </div>

      {/* Grid */}
      <div
        ref={bodyRef}
        className="flex-1 overflow-auto"
        onScroll={onBodyScroll}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D1D9E8 transparent",
        }}
      >
        <div
          className="relative"
          style={{ width: TIME_W + totalW, height: SLOTS.length * ROW_H }}
        >
          {SLOTS.map((slot, idx) => (
            <div
              key={idx}
              className="absolute flex w-full"
              style={{ top: idx * ROW_H, height: ROW_H }}
            >
              {/* Time gutter */}
              <div
                className={`shrink-0 relative border-r ${slot.isHour ? "border-t" : ""} border-[#E0E6EB]`}
                style={{ width: TIME_W }}
              >
                {slot.isHour && (
                  <span
                    className="absolute right-3 text-[12px] font-manrope text-[#999] whitespace-nowrap leading-none"
                    style={{ top: 7 }}
                  >
                    {slot.label}
                  </span>
                )}
              </div>

              {/* Day cells */}
              {weekDays.map((day, dayIdx) => {
                const uniqueDropId = `day_${dayIdx}`;
                const isHover =
                  hoverCell?.sid === uniqueDropId && hoverCell?.idx === idx;
                
                // Determine logic for dropping
                const canDrop = activeStaffId !== null;

                return (
                  <div
                    key={dayIdx}
                    className={`shrink-0 border-r border-[#EEF2F8] last:border-r-0 transition-colors
                      ${slot.isHour ? "border-t border-t-[#DDE3EC]" : "border-t border-t-[#F2F4F7]"}
                      ${isHover && canDrop ? "bg-[#F0EEFF]" : "hover:bg-[#FAFAFE]"}
                      ${!canDrop ? "cursor-not-allowed" : ""}
                    `}
                    style={{ width: colW, height: ROW_H }}
                    onDragOver={(e) => {
                      if (!canDrop) return;
                      onOver(e, uniqueDropId, idx);
                    }}
                    onDrop={(e) => {
                      if (!canDrop) return;
                      // Pass both the staffId and the dayIndex string so parent knows which day
                      onDrop(e, `${activeStaffId}_${dayIdx}`, idx);
                    }}
                  />
                );
              })}
            </div>
          ))}

          {/* Appointment overlays */}
          {appointments.map((appt, i) => {
            if (appt.staffId !== activeStaffId && activeStaffId !== null) return null;
            const dayIdx = appt.dayIndex || 0;
            const svc = SERVICES.find((s) => s.id === appt.serviceId);
            
            return (
              <div
                key={i}
                className="absolute z-10 bg-[#ECEAFF] rounded-[7px] px-2.5 py-1.5"
                style={{
                  top: appt.startSlot * ROW_H + 1,
                  left: TIME_W + dayIdx * colW + 3,
                  width: colW - 6,
                  height: appt.duration * ROW_H - 2,
                  borderLeft: "3px solid #635BFF",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold font-manrope text-[#635BFF] leading-tight">
                      {svc?.name}
                    </p>
                    <p className="text-[9px] font-manrope text-[#635BFF] opacity-70">
                      {svc?.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => removeAppt(i)}
                    className="text-[#635BFF] opacity-40 hover:opacity-80 text-sm leading-none cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
