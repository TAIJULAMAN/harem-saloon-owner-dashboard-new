"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useEffect, useState } from "react";

export default function AppPill({
  appt,
  onClick,
  statusColor,
  onResizeEnd,
  slotDuration = 15,
  HOUR_HEIGHT = 48,
}: {
  appt: CalAppointment;
  onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
  statusColor?: Record<AppStatus, { bg: string; text: string; border: string }>;
  compact?: boolean;
  onResizeEnd?: (appt: CalAppointment, newEndTime: string) => void;
  slotDuration?: number;
  slotPxHeight?: number;
  baseMinutes?: number;
  HOUR_HEIGHT?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [liveEndTime, setLiveEndTime] = useState<string>(appt.endTime);
  const [isResizing, setIsResizing] = useState(false);

  const isResizingRef = useRef(false);
  const lastResizeEndTimeRef = useRef(0);
  const resizeStartYRef = useRef(0);
  const resizeStartEndMinRef = useRef(0);
  const wrapperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);


  const c = statusColor?.[appt.status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-l-gray-300",
  };

  const isCompact = height < 40;
  const isMedium = height >= 40 && height < 64;
  const isTall = height >= 64;

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    wrapperRef.current = ref.current?.parentElement ?? null;
    isResizingRef.current = true;
    setIsResizing(true);
    resizeStartYRef.current = e.clientY;
    resizeStartEndMinRef.current = timeToMinutes(appt.endTime);

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizingRef.current) return;
      const deltaY = ev.clientY - resizeStartYRef.current;
      const pxPerSlot = HOUR_HEIGHT / (60 / slotDuration);
      const deltaMin = Math.round(deltaY / pxPerSlot) * slotDuration;
      const startMin = timeToMinutes(appt.startTime);
      const clampedEnd = Math.max(
        startMin + slotDuration,
        resizeStartEndMinRef.current + deltaMin
      );

      // Live height update
      if (wrapperRef.current) {
        const newHeight = ((clampedEnd - startMin) / 60) * HOUR_HEIGHT;
        wrapperRef.current.style.height = `${Math.max(28, newHeight)}px`;
      }
      // Live time text update
      setLiveEndTime(minutesToTime(clampedEnd));
    };

    const onMouseUp = (ev: MouseEvent) => {
      if (isResizingRef.current) {
        const deltaY = ev.clientY - resizeStartYRef.current;
        const pxPerSlot = HOUR_HEIGHT / (60 / slotDuration);
        const deltaMin = Math.round(deltaY / pxPerSlot) * slotDuration;
        const startMin = timeToMinutes(appt.startTime);
        const clampedEnd = Math.max(
          startMin + slotDuration,
          resizeStartEndMinRef.current + deltaMin
        );
        onResizeEnd?.(appt, minutesToTime(clampedEnd));
        lastResizeEndTimeRef.current = Date.now();
        isResizingRef.current = false;
        setIsResizing(false);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    if (Date.now() - lastResizeEndTimeRef.current < 200) return;
    onClick(appt, e);
  };

  const displayEndTime = isResizing ? liveEndTime : appt.endTime;

  return (
    <div
      ref={ref}
      onClick={handleMainClick}
      className={`
        ${c.bg} ${c.text} ${c.border}
        border-l-4 rounded-[0px_8px_8px_0px]
        w-full h-full
        flex flex-col justify-center
        px-2.5
        cursor-grab active:cursor-grabbing
        overflow-hidden touch-none
        relative group/pill
        ${isResizing ? "ring-2 ring-blue-400 z-50" : ""}
      `}
      style={{
        minHeight: 28,
        paddingTop: isCompact ? 2 : 4,
        paddingBottom: isCompact ? 2 : 4,
      }}
      draggable={false}
    >
      {isCompact && (
        <p className="font-manrope font-semibold truncate leading-none text-[11px]">
          <span>{appt.service}</span>&nbsp;
          <span className="font-normal opacity-75">({appt.clientName})</span>
        </p>
      )}

      {isMedium && (
        <>
          <p className="font-manrope font-semibold truncate leading-tight text-[12px]">
            {appt.service}
          </p>
          <p className="font-manrope font-normal opacity-75 truncate leading-tight text-[11px]">
            {appt.clientName}
          </p>
          {isResizing && (
            <p className="font-manrope font-bold text-[10px] mt-0.5">
              {appt.startTime} â€“ {displayEndTime}
            </p>
          )}
        </>
      )}

      {isTall && (
        <>
          <p className="font-manrope font-semibold truncate leading-tight text-[13px]">
            {appt.service}
          </p>
          <p className="font-manrope font-normal opacity-75 truncate leading-tight text-[11px]">
            {appt.clientName}
          </p>
          <p className="font-manrope font-normal opacity-55 truncate leading-tight text-[10px] mt-0.5">
            {appt.startTime} â€“{" "}
            <span className={isResizing ? "font-bold text-blue-600" : ""}>
              {displayEndTime}
            </span>
          </p>
        </>
      )}

      {onResizeEnd && (
        <div
          onMouseDown={handleResizeMouseDown}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute bottom-0 left-0 right-0 h-[12px]
            flex items-center justify-center
            cursor-ns-resize
            opacity-0 group-hover/pill:opacity-100
            transition-opacity z-20
          "
        >
          <div className="flex gap-[3px] mb-[2px] pointer-events-none bg-black/10 px-2 py-0.5 rounded-full">
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-60" />
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-60" />
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-60" />
          </div>
        </div>
      )}
    </div>
  );
}
