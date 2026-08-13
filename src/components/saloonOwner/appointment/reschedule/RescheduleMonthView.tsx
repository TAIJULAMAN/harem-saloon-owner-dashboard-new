import React from "react";
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
  dayIndex?: number;
}

export default function RescheduleMonthView({
  STAFF,
  SERVICES,
  appointments,
  hoverCell,
  onOver,
  onDrop,
  removeAppt,
  currentDate,
  selectedTeamIds,
}: {
  STAFF: StaffMember[];
  SERVICES: Service[];
  appointments: ScheduledAppointment[];
  hoverCell: { sid: string; idx: number } | null;
  onOver: (e: React.DragEvent, sid: string, idx: number) => void;
  onDrop: (e: React.DragEvent, sid: string, idx: number) => void;
  removeAppt: (idx: number) => void;
  currentDate: Date;
  selectedTeamIds: string[];
}) {
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Empty padding cells
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const monthDays = getMonthDays(currentDate);
  const activeStaffId = selectedTeamIds.length === 1 ? selectedTeamIds[0] : null;

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-white">
      {/* Month Header */}
      <div className="shrink-0 flex items-center justify-between border-b border-[#E0E6EB] bg-[#F3F3FF] px-4 py-3 h-[88px]">
        <div className="grid grid-cols-7 w-full">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold font-manrope text-[#29343D]">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto bg-[#F7F9FC] p-4">
        <div className="grid grid-cols-7 gap-2 h-full auto-rows-[minmax(100px,1fr)]">
          {monthDays.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="bg-transparent" />;
            }

            const dayIdx = day.getDate();
            const uniqueDropId = `month_day_${dayIdx}`;
            const isHover = hoverCell?.sid === uniqueDropId && hoverCell?.idx === 0;
            const canDrop = activeStaffId !== null;

            return (
              <div
                key={dayIdx}
                className={`relative flex flex-col bg-white border border-[#E0E6EB] rounded-lg p-2 overflow-hidden transition-colors
                  ${isHover && canDrop ? "bg-[#F0EEFF] border-[#635BFF]" : "hover:shadow-sm"}
                  ${!canDrop ? "cursor-not-allowed opacity-80" : ""}
                `}
                onDragOver={(e) => {
                  if (!canDrop) return;
                  onOver(e, uniqueDropId, 0); // slot 0 for month view
                }}
                onDrop={(e) => {
                  if (!canDrop) return;
                  // Pass activeStaffId and day index in the staff string so parent knows
                  onDrop(e, `${activeStaffId}_month_${dayIdx}`, 0);
                }}
              >
                <span className="text-sm font-semibold font-manrope text-[#29343D] mb-1">
                  {day.getDate()}
                </span>

                {/* Render appointments for this day */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-1 no-scrollbar">
                  {appointments.map((appt, i) => {
                    // In a real app we'd map appt date to this day. 
                    // For now we map using dayIndex as the date component.
                    if (appt.staffId !== activeStaffId && activeStaffId !== null) return null;
                    const apptDay = appt.dayIndex || 1; // Default to 1st if none
                    if (apptDay !== dayIdx) return null;

                    const svc = SERVICES.find((s) => s.id === appt.serviceId);
                    return (
                      <div
                        key={i}
                        className="bg-[#ECEAFF] rounded border-l-[3px] border-l-[#635BFF] px-1.5 py-1 flex items-start justify-between shrink-0"
                      >
                        <p className="text-[10px] font-bold font-manrope text-[#635BFF] leading-tight truncate">
                          {svc?.name}
                        </p>
                        <button
                          onClick={() => removeAppt(i)}
                          className="text-[#635BFF] opacity-40 hover:opacity-80 text-sm leading-none cursor-pointer ml-1"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
