"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Clock, CalendarDays, ChevronDown, ChevronUp, X } from "lucide-react";

interface CalendarSettingsPanelProps {
  startHour: number;
  endHour: number;
  slotDuration: number;
  slotHeight: number;
  onStartHourChange: (h: number) => void;
  onEndHourChange: (h: number) => void;
  onSlotDurationChange: (min: number) => void;
  onSlotHeightChange: (px: number) => void;
}

const SLOT_DURATION_OPTIONS = [5, 10, 15, 30, 60, 90];

function formatHour(h: number) {
  if (h === 0) return "00:00";
  if (h < 10) return `0${h}:00`;
  return `${h}:00`;
}

function StepButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] bg-white text-[#29343D] text-lg font-bold shrink-0 hover:bg-[#F4F6FA] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
    >
      {children}
    </button>
  );
}

export default function CalendarSettingsPanel({
  startHour,
  endHour,
  slotDuration,
  slotHeight,
  onStartHourChange,
  onEndHourChange,
  onSlotDurationChange,
  onSlotHeightChange,
}: CalendarSettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const [slotOpen, setSlotOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; right: number }>({
    top: 0,
    right: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setPanelPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const visibleHours = endHour - startHour;

  // Slider
  const sliderValue = Math.round(((slotHeight - 40) / 80) * 9) + 1;
  const handleSliderChange = (val: number) => {
    const px = Math.round(40 + ((val - 1) / 9) * 80);
    onSlotHeightChange(px);
  };

  const previewRowHeight = Math.max(24, (slotHeight / 60) * slotDuration);
  const sliderPercent = ((sliderValue - 1) / 9) * 100;

  const panel = (
    <div
      ref={panelRef}
      className="font-manrope fixed z-50 w-[340px] bg-white border border-[#E0E6EB] rounded-[12px] shadow-xl shadow-black/10 overflow-y-auto"
      style={{
        top: panelPos.top,
        right: panelPos.right,
        maxHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-[#E0E6EB] bg-white">
        <h3 className="text-[15px] font-bold text-[#29343D] m-0">
          Calendar settings
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="p-1 rounded-full border-none bg-transparent cursor-pointer text-[#98A4AE] hover:bg-[#F4F6FA] transition-colors flex items-center"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {/*Section 1*/}
        <div className="border border-[#E0E6EB] rounded-[10px] overflow-hidden">
          <button
            onClick={() => setTimeRangeOpen((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-none cursor-pointer hover:bg-[#F0F2F5] transition-colors"
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#29343D]">
              <Clock size={14} color="#635BFF" />
              Visible time range
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#526B7A] bg-white border border-[#E0E6EB] px-2 py-0.5 rounded-[6px]">
                {formatHour(startHour)} - {formatHour(endHour)}
              </span>
              {timeRangeOpen ? (
                <ChevronUp size={14} color="#98A4AE" />
              ) : (
                <ChevronDown size={14} color="#98A4AE" />
              )}
            </span>
          </button>

          {timeRangeOpen && (
            <div className="px-4 pb-4 pt-3 flex flex-col gap-4">
              {/* Start time Stepper */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  Start time
                </p>
                <div className="flex items-center gap-2">
                  <StepButton
                    onClick={() =>
                      onStartHourChange(Math.max(0, startHour - 1))
                    }
                    disabled={startHour <= 0}
                  >
                    -
                  </StepButton>
                  <div className="flex-1 h-9 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] text-[14px] font-bold text-[#29343D] bg-white">
                    {formatHour(startHour)}
                  </div>
                  <StepButton
                    onClick={() =>
                      onStartHourChange(Math.min(endHour - 1, startHour + 1))
                    }
                    disabled={startHour >= endHour - 1}
                  >
                    +
                  </StepButton>
                </div>
              </div>

              {/* End time Stepper */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  End time
                </p>
                <div className="flex items-center gap-2">
                  <StepButton
                    onClick={() =>
                      onEndHourChange(Math.max(startHour + 1, endHour - 1))
                    }
                    disabled={endHour <= startHour + 1}
                  >
                    -
                  </StepButton>
                  <div className="flex-1 h-9 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] text-[14px] font-bold text-[#29343D] bg-white">
                    {formatHour(endHour)}
                  </div>
                  <StepButton
                    onClick={() => onEndHourChange(Math.min(24, endHour + 1))}
                    disabled={endHour >= 24}
                  >
                    +
                  </StepButton>
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E0E6EB] rounded-[8px] px-3 py-2">
                <Clock size={13} color="#98A4AE" />
                <span className="text-[12px] text-[#526B7A] font-semibold">
                  {visibleHours}h visible. {formatHour(startHour)} to{" "}
                  {formatHour(endHour)}
                </span>
              </div>

              {/* Mini preview */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  Preview
                </p>
                <div className="border border-[#E0E6EB] rounded-[8px] overflow-hidden">
                  <div className="bg-[#F3F3FF] px-3 py-1.5 text-[11px] font-bold text-[#29343D] border-b border-[#E0E6EB]">
                    Mon
                  </div>
                  <div className="relative h-20 bg-white">
                    {Array.from({ length: Math.min(visibleHours, 4) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className="absolute left-0 right-0 flex"
                          style={{
                            top: `${(i / Math.min(visibleHours, 4)) * 80}px`,
                            height: `${80 / Math.min(visibleHours, 4)}px`,
                          }}
                        >
                          <div className="w-10 text-[9px] text-[#98A4AE] font-semibold border-r border-b border-[#E0E6EB] pt-0.5 pl-1 shrink-0">
                            {formatHour(startHour + i)}
                          </div>
                          <div className="flex-1 border-b border-[#E0E6EB] relative">
                            {i === 1 && (
                              <div className="absolute inset-1 bg-[#EEF2FF] border-l-2 border-[#635BFF] rounded-r-[3px] flex items-center px-1.5">
                                <span className="text-[9px] font-bold text-[#635BFF] truncate">
                                  Team meeting
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="border border-[#E0E6EB] rounded-[10px] overflow-hidden">
          <button
            onClick={() => setSlotOpen((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-none cursor-pointer hover:bg-[#F0F2F5] transition-colors"
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-[#29343D]">
              <CalendarDays size={14} color="#635BFF" />
              Slot duration & height
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#526B7A] bg-white border border-[#E0E6EB] px-2 py-0.5 rounded-[6px]">
                {slotDuration} min
              </span>
              {slotOpen ? (
                <ChevronUp size={14} color="#98A4AE" />
              ) : (
                <ChevronDown size={14} color="#98A4AE" />
              )}
            </span>
          </button>

          {slotOpen && (
            <div className="px-4 pb-4 pt-3 flex flex-col gap-4">
              {/* Duration stepper */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  Slot duration
                </p>
                <div className="flex items-center gap-2">
                  <StepButton
                    onClick={() => {
                      const idx = SLOT_DURATION_OPTIONS.indexOf(slotDuration);
                      if (idx > 0)
                        onSlotDurationChange(SLOT_DURATION_OPTIONS[idx - 1]);
                    }}
                    disabled={SLOT_DURATION_OPTIONS.indexOf(slotDuration) === 0}
                  >
                    -
                  </StepButton>
                  <div className="flex-1 h-9 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] text-[14px] font-bold text-[#29343D] bg-white">
                    {slotDuration} min
                  </div>
                  <StepButton
                    onClick={() => {
                      const idx = SLOT_DURATION_OPTIONS.indexOf(slotDuration);
                      if (idx < SLOT_DURATION_OPTIONS.length - 1)
                        onSlotDurationChange(SLOT_DURATION_OPTIONS[idx + 1]);
                    }}
                    disabled={
                      SLOT_DURATION_OPTIONS.indexOf(slotDuration) ===
                      SLOT_DURATION_OPTIONS.length - 1
                    }
                  >
                    +
                  </StepButton>
                </div>
              </div>

              {/* Height slider */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  Slot height in calendar view
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      accentColor: "#635BFF",
                      background: `linear-gradient(to right, #635BFF 0%, #635BFF ${sliderPercent}%, #E0E6EB ${sliderPercent}%, #E0E6EB 100%)`,
                    }}
                  />
                  <span className="text-[13px] font-bold text-[#29343D] min-w-[16px] text-right">
                    {sliderValue}
                  </span>
                </div>
              </div>

              {/* Preview */}
              <div>
                <p className="text-[10px] font-bold text-[#98A4AE] uppercase tracking-wider mb-2">
                  Preview
                </p>
                <div className="border border-[#E0E6EB] rounded-[8px] overflow-hidden">
                  {[0, 1].map((rowIdx) => {
                    const rowMinutes = rowIdx * slotDuration;
                    const rowH = Math.floor(rowMinutes / 60);
                    const rowM = rowMinutes % 60;
                    const timeLabel = `${String(9 + rowH).padStart(2, "0")}:${String(rowM).padStart(2, "0")}`;
                    return (
                      <div
                        key={rowIdx}
                        className={`flex ${rowIdx === 0 ? "border-b border-[#E0E6EB]" : ""}`}
                        style={{ height: previewRowHeight }}
                      >
                        <div className="w-10 text-[9px] text-[#98A4AE] font-semibold border-r border-[#E0E6EB] flex items-start pt-0.5 pl-1 shrink-0">
                          {timeLabel}
                        </div>
                        <div className="flex-1 relative">
                          {rowIdx === 0 && (
                            <div className="absolute top-0.5 bottom-0.5 left-1 right-1 bg-[#EEF2FF] border-l-2 border-[#635BFF] rounded-r-[3px] flex items-center px-1.5">
                              <span className="text-[9px] font-bold text-[#635BFF] truncate">
                                Team meeting
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-manrope">
      <button
        ref={buttonRef}
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[8px] border text-[14px] font-semibold transition-colors cursor-pointer
          ${
            open
              ? "bg-[#DDDBFF] border-[#635BFF] text-[#635BFF]"
              : "bg-white border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"
          }`}
      >
        <CalendarDays size={15} />
        Calendar settings
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(panel, document.body)
        : null}
    </div>
  );
}
