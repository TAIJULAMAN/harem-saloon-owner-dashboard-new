"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IView from "./reschedule/IView";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import MonthView from "./calander-view/MonthView";
import DayView from "./calander-view/DayView";
import WeekView from "./calander-view/WeekView";
import TeamDropdown from "./calander-view/TeamDropdown";
import CalendarSettingsPanel from "./calander-view/Calendarsettingspanel";

type Period = "Month" | "Week" | "Day";

const statusColor: Record<
  AppStatus,
  { bg: string; text: string; border: string }
> = {
  Booked: {
    bg: "bg-[#F3F0FF]",
    text: "text-[#635BFF]",
    border: "border-l-[#635BFF]",
  },
  Confirmed: {
    bg: "bg-[#E6FFFE]",
    text: "text-[#16CDC7]",
    border: "border-l-[#16CDC7]",
  },
  Arrived: {
    bg: "bg-[#FFFBEA]",
    text: "text-[#E6B800]",
    border: "border-l-[#FFD648]",
  },
  Started: {
    bg: "bg-[#FFF0F3]",
    text: "text-[#FF6692]",
    border: "border-l-[#FF6692]",
  },
  Completed: {
    bg: "bg-[#EDFBF3]",
    text: "text-[#36C76C]",
    border: "border-l-[#36C76C]",
  },
  Canceled: {
    bg: "bg-[#FFF0F3]",
    text: "text-[#FF6692]",
    border: "border-l-[#FF6692]",
  },
};

const statusBadgeColor: Record<AppStatus, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  Completed: "bg-[#EBFAF0] text-[#36C76C]",
  Canceled: "bg-[#FFE5ED] text-[#FF6692]",
};

const teamMembers = [
  { id: "1", name: "Shah Aman", avatar: "/avatar/icon1.png" },
  { id: "2", name: "Hasan Siam", avatar: "/avatar/icon2.png" },
  { id: "3", name: "Hridoy Khan", avatar: "/avatar/icon3.png" },
];

const makeDate = (y: number, m: number, d: number) => new Date(y, m - 1, d);

const allAppointments: CalAppointment[] = [
  ...teamMembers.flatMap((member, mi) => [
    {
      id: `d-${mi}-1`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "09:00",
      endTime: "10:30",
      price: "€ 170",
      duration: "90 min",
      status: "Canceled" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
  ]),
];

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const timeToMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekStart(d: Date) {
  const s = new Date(d);
  s.setDate(s.getDate() - s.getDay());
  return s;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarView() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<Period>("Day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2));
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    teamMembers.map((m) => m.id),
  );
  const [appointments, setAppointments] = useState<CalAppointment[]>(
    allAppointments.slice(0, 1),
  );

  const [visibleStartHour, setVisibleStartHour] = useState(0);
  const [visibleEndHour, setVisibleEndHour] = useState(24);
  const [slotDuration, setSlotDuration] = useState(60);
  const [slotHeight, setSlotHeight] = useState(48);

  const HOURS = Array.from(
    { length: visibleEndHour - visibleStartHour },
    (_, i) => visibleStartHour + i,
  );
  const HOUR_HEIGHT = slotHeight;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      calendarRef.current?.requestFullscreen().catch((err) => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  function formatHour(h: number) {
    if (h === 0) return "12:00 AM";
    if (h < 12) return `${h}:00 AM`;
    if (h === 12) return "12:00 PM";
    return `${h - 12}:00 PM`;
  }

  const isMonthOrWeek = period === "Month" || period === "Week";

  const handleAppointmentCreate = (appt: CalAppointment) =>
    setAppointments((prev) => [...prev, appt]);

  const handleAppointmentUpdate = (appt: CalAppointment) =>
    setAppointments((prev) => prev.map((a) => (a.id === appt.id ? appt : a)));

  const navigate = (dir: -1 | 1) => {
    const d = new Date(currentDate);
    if (period === "Day") d.setDate(d.getDate() + dir);
    else if (period === "Week") d.setDate(d.getDate() + 7 * dir);
    else d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const dateLabel = () => {
    if (period === "Day") {
      return currentDate
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        })
        .replace(",", "");
    }
    if (period === "Week") {
      const ws = getWeekStart(currentDate);
      const we = new Date(ws);
      we.setDate(we.getDate() + 6);
      return `${ws.toLocaleDateString("en-US", { month: "long", day: "2-digit" })} â€“ ${we.toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`;
    }
    return MONTH_NAMES[currentDate.getMonth()];
  };

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    if (p === "Month") setCurrentDate(new Date(2025, 9, 1));
    else if (p === "Week") setCurrentDate(new Date(2025, 8, 1));
    else setCurrentDate(new Date(2025, 8, 2));
  };

  return (
    <div
      ref={calendarRef}
      className="bg-white rounded-xl border border-[#EFF4FA] font-manrope h-full flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-[30px] bg-white z-50">
        {/* Left: team filter */}
        <TeamDropdown
          selectedIds={selectedMemberIds}
          onChange={setSelectedMemberIds}
          singleSelect={isMonthOrWeek}
          teamMembers={teamMembers}
        />

        {/* Center: date nav */}
        <div className="flex items-center border border-[#E8EEFF] rounded-[8px] overflow-hidden">
          <button
            className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={18} className="text-[#635BFF]" />
          </button>
          <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
            {dateLabel()}
          </span>
          <button
            className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => navigate(1)}
          >
            <ChevronRight size={18} className="text-[#635BFF]" />
          </button>
        </div>

        {/* Right: period switcher + settings */}
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden bg-[#F7F9FC]">
            {(["Month", "Week", "Day"] as const).map((p, i) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`relative px-6 py-[10px] text-[16px] font-manrope font-medium transition-all cursor-pointer
                  ${
                    period === p
                      ? "bg-[#DDDBFF] text-[#0A2540]"
                      : "text-[#526B7A] bg-white hover:text-[#29343D]"
                  }
                  ${i !== 2 ? "border-r border-[#E0E6EB]" : ""}
                `}
              >
                {p}
              </button>
            ))}
          </div>

          <div
            className="bg-[#EFF4FA] rounded-[8px] px-4 py-2.5 cursor-pointer hover:bg-[#e0e7f0] transition-colors"
            onClick={toggleFullscreen}
          >
            <IView />
          </div>

          {(period === "Day" || period === "Week") && (
            <CalendarSettingsPanel
              startHour={visibleStartHour}
              endHour={visibleEndHour}
              slotDuration={slotDuration}
              slotHeight={slotHeight}
              onStartHourChange={setVisibleStartHour}
              onEndHourChange={setVisibleEndHour}
              onSlotDurationChange={setSlotDuration}
              onSlotHeightChange={setSlotHeight}
            />
          )}
        </div>
      </div>

      {/* Calendar grid area */}
      <div className="flex-1 overflow-hidden bg-white min-h-0">
        {period === "Day" && (
          <DayView
            date={currentDate}
            selectedMemberIds={selectedMemberIds}
            teamMembers={teamMembers}
            allAppointments={appointments}
            isSameDay={isSameDay}
            HOURS={HOURS}
            HOUR_HEIGHT={HOUR_HEIGHT}
            formatHour={formatHour}
            timeToMinutes={timeToMinutes}
            statusColor={statusColor}
            statusBadgeColor={statusBadgeColor}
            onAppointmentCreate={handleAppointmentCreate}
            onAppointmentUpdate={handleAppointmentUpdate}
            slotDuration={slotDuration}
          />
        )}

        {period === "Week" && (
          <WeekView
            date={currentDate}
            selectedMemberIds={selectedMemberIds}
            teamMembers={teamMembers}
            allAppointments={appointments}
            isSameDay={isSameDay}
            HOURS={HOURS}
            HOUR_HEIGHT={HOUR_HEIGHT}
            formatHour={formatHour}
            timeToMinutes={timeToMinutes}
            statusColor={statusColor}
            statusBadgeColor={statusBadgeColor}
            WEEK_DAYS={WEEK_DAYS}
            getWeekStart={getWeekStart}
            onAppointmentCreate={handleAppointmentCreate}
            onAppointmentUpdate={handleAppointmentUpdate}
            slotDuration={slotDuration}
          />
        )}

        {period === "Month" && (
          <MonthView
            date={currentDate}
            selectedMemberIds={selectedMemberIds}
            teamMembers={teamMembers}
            allAppointments={appointments}
            statusColor={statusColor}
            statusBadgeColor={statusBadgeColor}
            onAppointmentCreate={handleAppointmentCreate}
            onAppointmentUpdate={handleAppointmentUpdate}
          />
        )}
      </div>
    </div>
  );
}
