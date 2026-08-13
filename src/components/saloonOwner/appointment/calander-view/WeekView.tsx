"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState, useEffect } from "react";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";
import NewAppointmentModal from "./NewAppointmentModal";
function DragGhost({
  appt,
  statusColor,
  x,
  y,
  width,
  height,
  startTime,
  endTime,
}: {
  appt: CalAppointment;
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  x: number;
  y: number;
  width: number;
  height: number;
  startTime: string;
  endTime: string;
}) {
  const c = statusColor[appt.status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-l-gray-300",
  };

  const borderColorMap: Record<string, string> = {
    "border-l-[#635BFF]": "#635BFF",
    "border-l-[#16CDC7]": "#16CDC7",
    "border-l-[#FFD648]": "#FFD648",
    "border-l-[#FF6692]": "#FF6692",
    "border-l-[#36C76C]": "#36C76C",
  };
  const borderColor = borderColorMap[c.border] ?? "#635BFF";

  const bgColorMap: Record<string, string> = {
    "bg-[#F3F0FF]": "#F3F0FF",
    "bg-[#E6FFFE]": "#E6FFFE",
    "bg-[#FFFBEA]": "#FFFBEA",
    "bg-[#FFF0F3]": "#FFF0F3",
    "bg-[#EDFBF3]": "#EDFBF3",
  };
  const bgColor = bgColorMap[c.bg] ?? "#ffffff";

  const textColorMap: Record<string, string> = {
    "text-[#635BFF]": "#635BFF",
    "text-[#16CDC7]": "#16CDC7",
    "text-[#E6B800]": "#E6B800",
    "text-[#FF6692]": "#FF6692",
    "text-[#36C76C]": "#36C76C",
  };
  const textColor = textColorMap[c.text] ?? "#0A2540";

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width,
        height,
        pointerEvents: "none",
        willChange: "transform",
        zIndex: 9999,
        backgroundColor: bgColor,
        color: textColor,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: "0px 8px 8px 0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
        outline: `2px solid ${borderColor}`,
        outlineOffset: "-2px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p className="font-manrope font-semibold truncate text-[12px]">
          {appt.service}
        </p>
        <p
          className="font-manrope font-normal truncate text-[11px]"
          style={{ opacity: 0.75 }}
        >
          {appt.clientName}
        </p>
        <p className="font-manrope font-semibold text-[10px] mt-0.5">
          {startTime} â€“ {endTime}
        </p>
      </div>
    </div>
  );
}

export default function WeekView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  isSameDay,
  HOURS,
  HOUR_HEIGHT,
  formatHour,
  timeToMinutes,
  WEEK_DAYS,
  getWeekStart,
  statusColor,
  statusBadgeColor,
  onAppointmentCreate,
  onAppointmentUpdate,
  slotDuration,
  offsetTop = 160,
}: {
  date: Date;
  selectedMemberIds: string[];
  teamMembers: { id: string; name: string; avatar: string }[];
  allAppointments: CalAppointment[];
  isSameDay: (a: Date, b: Date) => boolean;
  HOURS: number[];
  HOUR_HEIGHT: number;
  formatHour: (hour: number) => string;
  timeToMinutes: (time: string) => number;
  WEEK_DAYS: string[];
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor: Record<AppStatus, string>;
  getWeekStart: (date: Date) => Date;
  onAppointmentCreate?: (appt: CalAppointment) => void;
  onAppointmentUpdate?: (appt: CalAppointment) => void;
  slotDuration: number;
  offsetTop?: number;
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
    date: Date;
  } | null>(null);

  // â”€â”€ Drag state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [dragState, setDragState] = useState<{
    appt: CalAppointment;
    ghostX: number;
    ghostY: number;
    ghostWidth: number;
    ghostHeight: number;
    snappedStartMin: number;
    snappedEndMin: number;
    targetDayIndex: number;
    grabOffsetY: number;
  } | null>(null);
  const isDraggingApptRef = useRef(false);
  const dragStateRef = useRef(dragState);
  useEffect(() => { dragStateRef.current = dragState; }, [dragState]);

  // â”€â”€ Selection state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectionPreview, setSelectionPreview] = useState<{
    startMin: number;
    endMin: number;
    dayIndex: number;
  } | null>(null);
  const isSelectingRef = useRef(false);
  const selectionDataRef = useRef<{
    startMin: number;
    endMin: number;
    dayIndex: number;
  } | null>(null);

  // â”€â”€ Fix: prevent container onClick from immediately closing modal â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const justSelectedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const slotsPerHour = 60 / slotDuration;
  const slotPxHeight = HOUR_HEIGHT / slotsPerHour;
  const weekStart = getWeekStart(date);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const memberAppts = allAppointments.filter((a) =>
    selectedMemberIds.includes(a.employeeId)
  );

  const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const formatDuration = (s: number, e: number) => {
    const d = e - s;
    if (d <= 0) return "0 min";
    if (d < 60) return `${d} min`;
    const h = Math.floor(d / 60), m = d % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  };

  // â”€â”€â”€ Global mousemove / mouseup for dragging â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!isDraggingApptRef.current || !dragStateRef.current) return;
      const ds = dragStateRef.current;

      const colEls = gridRef.current?.querySelectorAll<HTMLElement>("[data-day-col]");
      let targetDayIndex = ds.targetDayIndex;
      let targetColEl: HTMLElement | null = null;

      colEls?.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (ev.clientX >= r.left && ev.clientX <= r.right) {
          targetDayIndex = parseInt(el.dataset.dayIndex ?? "0", 10);
          targetColEl = el;
        }
      });

      const duration = ds.snappedEndMin - ds.snappedStartMin;
      let snappedStart = ds.snappedStartMin;

      if (targetColEl) {
        const rect = (targetColEl as HTMLElement).getBoundingClientRect();
        const offsetY = ev.clientY - rect.top - ds.grabOffsetY;
        const rawMin = HOURS[0] * 60 + (offsetY / HOUR_HEIGHT) * 60;
        snappedStart = Math.max(
          HOURS[0] * 60,
          Math.round(rawMin / slotDuration) * slotDuration
        );
      }

      setDragState((prev) =>
        prev
          ? {
            ...prev,
            ghostX: ev.clientX - ds.grabOffsetY * 0.3,
            ghostY: ev.clientY - ds.grabOffsetY,
            snappedStartMin: snappedStart,
            snappedEndMin: snappedStart + duration,
            targetDayIndex,
          }
          : null
      );
    };

    const onUp = () => {
      if (!isDraggingApptRef.current || !dragStateRef.current) return;
      isDraggingApptRef.current = false;
      const ds = dragStateRef.current;

      onAppointmentUpdate?.({
        ...ds.appt,
        date: days[ds.targetDayIndex],
        startTime: minutesToTime(ds.snappedStartMin),
        endTime: minutesToTime(ds.snappedEndMin),
      });
      setDragState(null);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [HOURS, HOUR_HEIGHT, slotDuration, days, onAppointmentUpdate]);

  // Global mousemove / mouseup for selection
  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!isSelectingRef.current || !selectionDataRef.current) return;
      const colEls = gridRef.current?.querySelectorAll<HTMLElement>("[data-day-col]");
      colEls?.forEach((el) => {
        if (parseInt(el.dataset.dayIndex ?? "-1") !== selectionDataRef.current!.dayIndex) return;
        const rect = el.getBoundingClientRect();
        if (ev.clientX < rect.left || ev.clientX > rect.right) return;
        const offsetY = ev.clientY - rect.top;
        const currentMin =
          HOURS[0] * 60 + Math.floor(offsetY / slotPxHeight) * slotDuration;
        if (currentMin >= selectionDataRef.current!.startMin) {
          selectionDataRef.current!.endMin = currentMin + slotDuration;
          setSelectionPreview({ ...selectionDataRef.current! });
        }
      });
    };

    const onUp = () => {
      if (!isSelectingRef.current || !selectionDataRef.current) return;
      isSelectingRef.current = false;
      justSelectedRef.current = true;
      const { startMin, endMin, dayIndex } = selectionDataRef.current;
      setSelectedSlot({
        startTime: minutesToTime(startMin),
        endTime: minutesToTime(endMin),
        date: days[dayIndex],
      });
      setSelectionPreview(null);
      selectionDataRef.current = null;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [HOURS, slotDuration, slotPxHeight, days]);

  const handlePillMouseDown = (
    appt: CalAppointment,
    e: React.MouseEvent,
    pillEl: HTMLElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const pillRect = pillEl.getBoundingClientRect();
    const grabOffsetY = e.clientY - pillRect.top;
    const duration = timeToMinutes(appt.endTime) - timeToMinutes(appt.startTime);
    const pillHeight = Math.max((duration / 60) * HOUR_HEIGHT, 28);

    isDraggingApptRef.current = true;
    setDragState({
      appt,
      ghostX: e.clientX - grabOffsetY * 0.3,
      ghostY: e.clientY - grabOffsetY,
      ghostWidth: pillRect.width,
      ghostHeight: pillHeight,
      snappedStartMin: timeToMinutes(appt.startTime),
      snappedEndMin: timeToMinutes(appt.endTime),
      targetDayIndex: days.findIndex((d) => isSameDay(d, appt.date)),
      grabOffsetY,
    });
  };

  const handleColumnMouseDown = (
    e: React.MouseEvent,
    dayIndex: number,
    colEl: HTMLElement
  ) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    const rect = colEl.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const startMin =
      HOURS[0] * 60 + Math.floor(offsetY / slotPxHeight) * slotDuration;
    isSelectingRef.current = true;
    selectionDataRef.current = { startMin, endMin: startMin + slotDuration, dayIndex };
    setSelectionPreview({ startMin, endMin: startMin + slotDuration, dayIndex });
  };

  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    if (isDraggingApptRef.current) return;
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setPreview({
      appt,
      x: rect.left - containerRect.left + rect.width + 8,
      y: rect.top - containerRect.top,
    });
  };

  const handleResizeEnd = (appt: CalAppointment, newEndTime: string) => {
    onAppointmentUpdate?.({ ...appt, endTime: newEndTime });
  };

  const handleCreateAppointment = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
  ) => {
    if (!selectedSlot) return;
    onAppointmentCreate?.({
      id: `appt-${Date.now()}`,
      ...data,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
    setSelectedSlot(null);
  };

  const ghostStart = dragState ? minutesToTime(dragState.snappedStartMin) : "";
  const ghostEnd = dragState ? minutesToTime(dragState.snappedEndMin) : "";

  return (
    <>
      {dragState && (
        <DragGhost
          appt={dragState.appt}
          statusColor={statusColor}
          x={dragState.ghostX}
          y={dragState.ghostY}
          width={dragState.ghostWidth}
          height={dragState.ghostHeight}
          startTime={ghostStart}
          endTime={ghostEnd}
        />
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div
            ref={containerRef}
            className="relative flex flex-col md:m-[30px] m-[15px] border border-[#E0E6EB] rounded-xl overflow-hidden"
            onClick={() => {
              if (justSelectedRef.current) {
                justSelectedRef.current = false;
                return;
              }
              setPreview(null);
              setSelectedSlot(null);
            }}
          >
            <div
              className="overflow-y-auto overflow-x-auto"
              style={{ height: `calc(100svh - ${offsetTop}px)` }}
              css-scrollbar=""
            >
              <style>{`
                [css-scrollbar]::-webkit-scrollbar { width: 0px; height: 0px; }
                [css-scrollbar] { scrollbar-width: none; }
              `}</style>

              <div className="min-w-[1000px]">

                {/* â”€â”€ Sticky day header â€” inside scroll container â”€â”€ */}
                <div className="sticky top-0 z-20 flex border-b border-[#E0E6EB] bg-[#F3F3FF] rounded-t-xl">
                  <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]" />
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-[80px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0"
                    >
                      <p className="text-xs font-manrope font-semibold text-[#29343D]">
                        {WEEK_DAYS[d.getDay()]} {String(d.getDate()).padStart(2, "0")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* â”€â”€ Grid â”€â”€ */}
                <div ref={gridRef} className="flex">
                  {/* Time labels */}
                  <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]">
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="relative border-b border-[#E0E6EB]"
                        style={{ height: HOUR_HEIGHT }}
                      >
                        <span className="absolute top-1 left-2 text-[10px] font-manrope text-[#98A4AE]">
                          {formatHour(h)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Day columns */}
                  {days.map((d, di) => {
                    const dayAppts = memberAppts.filter((a) => isSameDay(a.date, d));
                    const colHeight = HOURS.length * HOUR_HEIGHT;

                    return (
                      <div
                        key={di}
                        data-day-col
                        data-day-index={di}
                        className="flex-1 min-w-[80px] border-r border-[#E0E6EB] last:border-r-0 relative"
                        style={{ height: colHeight }}
                        onMouseDown={(e) => {
                          if ((e.target as HTMLElement).closest("[data-pill]")) return;
                          handleColumnMouseDown(e, di, e.currentTarget);
                        }}
                      >
                        {/* Hour grid lines */}
                        {HOURS.map((h) => (
                          <div
                            key={h}
                            className="absolute left-0 right-0 border-b border-[#E0E6EB]"
                            style={{ top: (h - HOURS[0]) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                          >
                            <div className="absolute inset-0 flex flex-col pointer-events-none">
                              {Array.from({ length: slotsPerHour }).map((_, i) => (
                                <div
                                  key={i}
                                  className="flex-1 border-b border-[#E0E6EB]/50 last:border-b-0"
                                />
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* â”€â”€ Drop snap indicator â”€â”€ */}
                        {dragState?.targetDayIndex === di && (
                          <div
                            className="absolute left-0.5 right-0.5 pointer-events-none z-20"
                            style={{
                              top: Math.max(0, ((dragState.snappedStartMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT),
                              height: Math.max(28, ((dragState.snappedEndMin - dragState.snappedStartMin) / 60) * HOUR_HEIGHT),
                            }}
                          >
                            <div className="w-full h-full border-2 border-dashed border-[#635BFF] bg-[#635BFF]/8 rounded-[0px_8px_8px_0px] flex flex-col justify-center px-2 py-1">
                              <p className="font-manrope font-semibold truncate text-[11px] text-[#635BFF]">
                                {dragState.appt.service}
                              </p>
                              <p className="font-manrope text-[10px] text-[#635BFF]/70">
                                {ghostStart} â€“ {ghostEnd}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* â”€â”€ Selection preview â”€â”€ */}
                        {selectionPreview?.dayIndex === di && (
                          <div
                            className="absolute left-0 right-0 pointer-events-none z-10"
                            style={{
                              top: Math.max(0, ((selectionPreview.startMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT),
                              height: Math.max(slotPxHeight, ((selectionPreview.endMin - selectionPreview.startMin) / 60) * HOUR_HEIGHT),
                            }}
                          >
                            <div className="w-full h-full border-2 border-[#635BFF] bg-[#635BFF]/10 flex flex-col justify-between px-1 py-1">
                              <span className="text-[9px] font-bold text-white bg-[#635BFF] px-1 rounded self-start">
                                {minutesToTime(selectionPreview.startMin)}
                              </span>
                              <span className="text-[10px] font-bold text-[#635BFF] bg-white border border-[#635BFF] px-1 rounded shadow-sm self-center">
                                {formatDuration(selectionPreview.startMin, selectionPreview.endMin)}
                              </span>
                              <span className="text-[9px] font-bold text-white bg-[#635BFF] px-1 rounded self-end">
                                {minutesToTime(selectionPreview.endMin)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* â”€â”€ Appointment pills â”€â”€ */}
                        {dayAppts.map((appt) => {
                          const startMin = timeToMinutes(appt.startTime);
                          const endMin = timeToMinutes(appt.endTime);
                          const top = ((startMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT;
                          const height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, 24);
                          const isBeingDragged = dragState?.appt.id === appt.id;

                          return (
                            <div
                              key={appt.id}
                              data-pill
                              style={{
                                position: "absolute",
                                top,
                                left: 1,
                                right: 1,
                                height,
                                opacity: isBeingDragged ? 0.4 : 1,
                                transition: "opacity 0.1s",
                                zIndex: isBeingDragged ? 1 : 10,
                              }}
                              onMouseDown={(e) => {
                                if ((e.target as HTMLElement).closest("[data-resize]")) return;
                                handlePillMouseDown(appt, e, e.currentTarget);
                              }}
                            >
                              <AppPill
                                appt={appt}
                                statusColor={statusColor}
                                onClick={handlePillClick}
                                onResizeEnd={handleResizeEnd}
                                slotDuration={slotDuration}
                                slotPxHeight={slotPxHeight}
                                HOUR_HEIGHT={HOUR_HEIGHT}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {preview && (
              <PreviewCard
                appt={preview.appt}
                onClose={() => setPreview(null)}
                statusBadgeColor={statusBadgeColor}
                style={{
                  top: Math.min(preview.y, 300),
                  left: Math.min(preview.x, 600),
                }}
              />
            )}
          </div>
        </div>
      </div>

      {selectedSlot && (
        <NewAppointmentModal
          memberId={selectedMemberIds[0]}
          startTime={selectedSlot.startTime}
          endTime={selectedSlot.endTime}
          date={selectedSlot.date}
          teamMembers={teamMembers}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleCreateAppointment}
        />
      )}
    </>
  );
}
