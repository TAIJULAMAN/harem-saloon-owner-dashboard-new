"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";
import NewAppointmentModal from "./NewAppointmentModal";

// â”€â”€â”€ Floating drag ghost that follows the cursor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p className="font-manrope font-semibold truncate text-[12px]">{appt.service}</p>
        <p className="font-manrope font-normal truncate text-[11px]" style={{ opacity: 0.75 }}>{appt.clientName}</p>
        <p className="font-manrope font-semibold text-[10px] mt-0.5">{startTime} â€“ {endTime}</p>
      </div>
    </div>
  );
}

export default function DayView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  isSameDay,
  HOURS,
  HOUR_HEIGHT,
  formatHour,
  timeToMinutes,
  statusColor,
  statusBadgeColor,
  onAppointmentCreate,
  onAppointmentUpdate,
  slotDuration,
  // Optional: pass the pixel height of everything above this component
  // (topnav + calendar toolbar + margins). Defaults to 160px.
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
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor: Record<AppStatus, string>;
  onAppointmentCreate?: (appt: CalAppointment) => void;
  onAppointmentUpdate?: (appt: CalAppointment) => void;
  slotDuration: number;
  offsetTop?: number;
}) {
  const [preview, setPreview] = useState<{ appt: CalAppointment; x: number; y: number } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ startTime: string; endTime: string; memberId: string } | null>(null);

  // â”€â”€ Drag state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [dragState, setDragState] = useState<{
    appt: CalAppointment;
    ghostX: number; ghostY: number;
    ghostWidth: number; ghostHeight: number;
    snappedStartMin: number; snappedEndMin: number;
    targetMemberId: string;
    grabOffsetY: number;
  } | null>(null);
  const isDraggingApptRef = useRef(false);
  const dragStateRef = useRef(dragState);
  useEffect(() => { dragStateRef.current = dragState; }, [dragState]);

  // â”€â”€ Selection state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectionPreview, setSelectionPreview] = useState<{ startMin: number; endMin: number; memberId: string } | null>(null);
  const isSelectingRef = useRef(false);
  const selectionDataRef = useRef<{ startMin: number; endMin: number; memberId: string } | null>(null);
  const justSelectedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const slotsPerHour = 60 / slotDuration;
  const slotPxHeight = HOUR_HEIGHT / slotsPerHour;
  const visibleMembers = teamMembers.filter((m) => selectedMemberIds.includes(m.id));
  const dayAppts = allAppointments.filter((a) => isSameDay(a.date, date));

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

  const clientYToSnappedMin = useCallback(
    (clientY: number, colEl: HTMLElement, grabOffsetY = 0) => {
      const rect = colEl.getBoundingClientRect();
      const offsetY = clientY - rect.top - grabOffsetY;
      const rawMin = HOURS[0] * 60 + (offsetY / HOUR_HEIGHT) * 60;
      return Math.round(rawMin / slotDuration) * slotDuration;
    },
    [HOURS, HOUR_HEIGHT, slotDuration]
  );

  // â”€â”€â”€ Drag mousemove / mouseup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!isDraggingApptRef.current || !dragStateRef.current) return;
      const ds = dragStateRef.current;
      const colEls = gridRef.current?.querySelectorAll<HTMLElement>("[data-member-col]");
      let targetMemberId = ds.targetMemberId;
      let targetColEl: HTMLElement | null = null;
      colEls?.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (ev.clientX >= r.left && ev.clientX <= r.right) {
          targetMemberId = el.dataset.memberId ?? ds.targetMemberId;
          targetColEl = el;
        }
      });
      const duration = ds.snappedEndMin - ds.snappedStartMin;
      let snappedStart = ds.snappedStartMin;
      if (targetColEl) {
        const rawStart = clientYToSnappedMin(ev.clientY, targetColEl, ds.grabOffsetY);
        snappedStart = Math.max(HOURS[0] * 60, rawStart);
      }
      setDragState((prev) =>
        prev ? { ...prev, ghostX: ev.clientX - ds.grabOffsetY * 0.3, ghostY: ev.clientY - ds.grabOffsetY, snappedStartMin: snappedStart, snappedEndMin: snappedStart + duration, targetMemberId } : null
      );
    };
    const onUp = () => {
      if (!isDraggingApptRef.current || !dragStateRef.current) return;
      isDraggingApptRef.current = false;
      const ds = dragStateRef.current;
      onAppointmentUpdate?.({
        ...ds.appt,
        startTime: minutesToTime(ds.snappedStartMin),
        endTime: minutesToTime(ds.snappedEndMin),
        employeeId: ds.targetMemberId,
        employeeName: teamMembers.find((m) => m.id === ds.targetMemberId)?.name ?? ds.appt.employeeName,
      });
      setDragState(null);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, [clientYToSnappedMin, HOURS, onAppointmentUpdate, teamMembers]);

  // â”€â”€â”€ Selection mousemove / mouseup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      if (!isSelectingRef.current || !selectionDataRef.current) return;
      const colEls = gridRef.current?.querySelectorAll<HTMLElement>("[data-member-col]");
      colEls?.forEach((el) => {
        if (el.dataset.memberId !== selectionDataRef.current!.memberId) return;
        const rect = el.getBoundingClientRect();
        if (ev.clientX < rect.left || ev.clientX > rect.right) return;
        const offsetY = ev.clientY - rect.top;
        const currentMin = HOURS[0] * 60 + Math.floor(offsetY / slotPxHeight) * slotDuration;
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
      const { startMin, endMin, memberId } = selectionDataRef.current;
      setSelectedSlot({ startTime: minutesToTime(startMin), endTime: minutesToTime(endMin), memberId });
      setSelectionPreview(null);
      selectionDataRef.current = null;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, [HOURS, slotDuration, slotPxHeight]);

  const handlePillMouseDown = (appt: CalAppointment, e: React.MouseEvent, pillEl: HTMLElement) => {
    e.preventDefault();
    e.stopPropagation();
    const pillRect = pillEl.getBoundingClientRect();
    const grabOffsetY = e.clientY - pillRect.top;
    const duration = timeToMinutes(appt.endTime) - timeToMinutes(appt.startTime);
    const pillHeight = Math.max((duration / 60) * HOUR_HEIGHT, 28);
    isDraggingApptRef.current = true;
    setDragState({ appt, ghostX: e.clientX - grabOffsetY * 0.3, ghostY: e.clientY - grabOffsetY, ghostWidth: pillRect.width, ghostHeight: pillHeight, snappedStartMin: timeToMinutes(appt.startTime), snappedEndMin: timeToMinutes(appt.endTime), targetMemberId: appt.employeeId, grabOffsetY });
  };

  const handleColumnMouseDown = (e: React.MouseEvent, memberId: string, colEl: HTMLElement) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    const rect = colEl.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const startMin = HOURS[0] * 60 + Math.floor(offsetY / slotPxHeight) * slotDuration;
    isSelectingRef.current = true;
    selectionDataRef.current = { startMin, endMin: startMin + slotDuration, memberId };
    setSelectionPreview({ startMin, endMin: startMin + slotDuration, memberId });
  };

  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    if (isDraggingApptRef.current) return;
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setPreview({ appt, x: rect.left - containerRect.left + rect.width + 8, y: rect.top - containerRect.top });
  };

  const handleResizeEnd = (appt: CalAppointment, newEndTime: string) => {
    onAppointmentUpdate?.({ ...appt, endTime: newEndTime });
  };

  const handleCreateAppointment = (data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">) => {
    if (!selectedSlot) return;
    onAppointmentCreate?.({ id: `appt-${Date.now()}`, ...data, date, startTime: selectedSlot.startTime, endTime: selectedSlot.endTime });
    setSelectedSlot(null);
  };

  const ghostStartTime = dragState ? minutesToTime(dragState.snappedStartMin) : "";
  const ghostEndTime = dragState ? minutesToTime(dragState.snappedEndMin) : "";

  return (
    <>
      {dragState && (
        <DragGhost
          appt={dragState.appt} statusColor={statusColor}
          x={dragState.ghostX} y={dragState.ghostY}
          width={dragState.ghostWidth} height={dragState.ghostHeight}
          startTime={ghostStartTime} endTime={ghostEndTime}
        />
      )}

      <div
        ref={containerRef}
        className="relative"
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => {
          if (justSelectedRef.current) { justSelectedRef.current = false; return; }
          setPreview(null);
          setSelectedSlot(null);
        }}
      >
        <div className="border border-[#E0E6EB] mx-[15px] md:mx-[30px] my-[15px] md:my-[30px] rounded-xl overflow-hidden">
          <div
            className="overflow-y-auto overflow-x-auto"
            style={{ height: `calc(100svh - ${offsetTop}px)` }}
            css-scrollbar=""
          >
            <style>{`
              [css-scrollbar]::-webkit-scrollbar {
                width: 0px;
                height: 0px;
              }
              /* Firefox */
              [css-scrollbar] {
                scrollbar-width: none;
              }
            `}</style>
            <div className="min-w-[1000px]">

              {/* â”€â”€ Sticky member header â€” sticks to scroll viewport â”€â”€ */}
              <div className="sticky top-0 z-20 bg-[#F3F3FF] border-b border-[#E0E6EB]">
                <div className="flex">
                  <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]" />
                  <div className="flex-1 flex">
                    {visibleMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex-1 min-w-[120px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0"
                      >
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover mb-1.5"
                        />
                        <p className="text-xs font-semibold font-manrope text-[#29343D] text-center">
                          {member.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* â”€â”€ Grid â”€â”€ */}
              <div ref={gridRef} className="flex">
                {/* Time labels */}
                <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]">
                  {HOURS.map((h) => (
                    <div key={h} className="relative border-b border-[#E0E6EB]" style={{ height: HOUR_HEIGHT }}>
                      <span className="absolute top-0 left-2 text-[10px] font-manrope text-[#98A4AE] px-2 whitespace-nowrap">
                        {formatHour(h)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Member columns */}
                {visibleMembers.map((member) => {
                  const memberAppts = dayAppts.filter((a) => a.employeeId === member.id);
                  const colHeight = HOURS.length * HOUR_HEIGHT;

                  return (
                    <div
                      key={member.id}
                      data-member-col
                      data-member-id={member.id}
                      className="flex-1 min-w-[120px] border-r border-[#E0E6EB] last:border-r-0 relative"
                      style={{ height: colHeight }}
                      onMouseDown={(e) => {
                        if ((e.target as HTMLElement).closest("[data-pill]")) return;
                        handleColumnMouseDown(e, member.id, e.currentTarget);
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
                              <div key={i} className="flex-1 border-b border-[#E0E6EB]/50 last:border-b-0" />
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* â”€â”€ Drop snap indicator â”€â”€ */}
                      {dragState?.targetMemberId === member.id && (
                        <div
                          className="absolute left-0.5 right-0.5 pointer-events-none z-20"
                          style={{
                            top: Math.max(0, ((dragState.snappedStartMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT),
                            height: Math.max(28, ((dragState.snappedEndMin - dragState.snappedStartMin) / 60) * HOUR_HEIGHT),
                          }}
                        >
                          <div className="w-full h-full border-2 border-dashed border-[#635BFF] bg-[#635BFF]/8 rounded-[0px_8px_8px_0px] flex flex-col justify-center px-2 py-1">
                            <p className="font-manrope font-semibold truncate text-[11px] text-[#635BFF]">{dragState.appt.service}</p>
                            <p className="font-manrope text-[10px] text-[#635BFF]/70">{ghostStartTime} â€“ {ghostEndTime}</p>
                          </div>
                        </div>
                      )}

                      {/* â”€â”€ Selection preview â”€â”€ */}
                      {selectionPreview?.memberId === member.id && (
                        <div
                          className="absolute left-0 right-0 pointer-events-none z-10"
                          style={{
                            top: Math.max(0, ((selectionPreview.startMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT),
                            height: Math.max(slotPxHeight, ((selectionPreview.endMin - selectionPreview.startMin) / 60) * HOUR_HEIGHT),
                          }}
                        >
                          <div className="w-full h-full border-2 border-[#635BFF] bg-[#635BFF]/10 flex flex-col justify-between px-2 py-1">
                            <span className="text-[10px] font-bold font-manrope text-[#635BFF] bg-white/90 rounded px-1 self-start leading-none py-0.5">
                              {minutesToTime(selectionPreview.startMin)}
                            </span>
                            <span className="text-[11px] font-semibold font-manrope text-[#635BFF] bg-white/90 rounded px-1 self-center leading-none py-0.5">
                              {formatDuration(selectionPreview.startMin, selectionPreview.endMin)}
                            </span>
                            <span className="text-[10px] font-bold font-manrope text-[#635BFF] bg-white/90 rounded px-1 self-end leading-none py-0.5">
                              {minutesToTime(selectionPreview.endMin)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* â”€â”€ Appointment pills â”€â”€ */}
                      {memberAppts.map((appt) => {
                        const startMin = timeToMinutes(appt.startTime);
                        const endMin = timeToMinutes(appt.endTime);
                        const top = ((startMin - HOURS[0] * 60) / 60) * HOUR_HEIGHT;
                        const height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, 28);
                        const isBeingDragged = dragState?.appt.id === appt.id;

                        return (
                          <div
                            key={appt.id}
                            data-pill
                            style={{ position: "absolute", top, left: 2, right: 2, height, opacity: isBeingDragged ? 0.4 : 1, transition: "opacity 0.1s", zIndex: isBeingDragged ? 1 : 10 }}
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
                              baseMinutes={HOURS[0] * 60}
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
        </div>

        {/* Preview card */}
        {preview && (
          <PreviewCard
            appt={preview.appt}
            onClose={() => setPreview(null)}
            statusBadgeColor={statusBadgeColor}
            style={{ top: Math.min(preview.y, 300), left: Math.min(preview.x, 400) }}
          />
        )}

        {/* New Appointment Modal */}
        {selectedSlot && (
          <NewAppointmentModal
            memberId={selectedSlot.memberId}
            startTime={selectedSlot.startTime}
            endTime={selectedSlot.endTime}
            date={date}
            teamMembers={teamMembers}
            onClose={() => setSelectedSlot(null)}
            onConfirm={handleCreateAppointment}
          />
        )}
      </div>
    </>
  );
}
