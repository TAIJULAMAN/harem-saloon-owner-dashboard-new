"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Maximize2,
  MoreVertical,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Appointment, AppointmentStatus, mockTeamMembers } from "@/data/data";

interface AppointmentsCalendarProps {
  appointments: Appointment[];
  onEditAppointment: (apt: Appointment) => void;
  onDeleteAppointment: (apt: Appointment) => void;
  onAddAppointment: () => void;
  calendarView?: "month" | "week" | "day";
  setCalendarView?: (view: "month" | "week" | "day") => void;
  currentDate?: Date;
  setCurrentDate?: React.Dispatch<React.SetStateAction<Date>>;
  selectedTeamMember?: string;
  setSelectedTeamMember?: (member: string) => void;
  hideHeader?: boolean;
}

export default function AppointmentsCalendar({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
  onAddAppointment,
  calendarView: propCalendarView,
  setCalendarView: propSetCalendarView,
  currentDate: propCurrentDate,
  setCurrentDate: propSetSetCurrentDate,
  selectedTeamMember: propSelectedTeamMember,
  setSelectedTeamMember: propSetSelectedTeamMember,
  hideHeader = false,
}: AppointmentsCalendarProps) {
  const [internalCalendarView, setInternalCalendarView] = useState<"month" | "week" | "day">("day");
  const [internalCurrentDate, setInternalCurrentDate] = useState(new Date(2025, 7, 5)); // Set default to Aug 5, 2025
  const [internalSelectedTeamMember, setInternalSelectedTeamMember] = useState("all");

  const calendarView = propCalendarView ?? internalCalendarView;
  const setCalendarView = propSetCalendarView ?? setInternalCalendarView;
  const currentDate = propCurrentDate ?? internalCurrentDate;
  const setCurrentDate = propSetSetCurrentDate ?? setInternalCurrentDate;
  const selectedTeamMember = propSelectedTeamMember ?? internalSelectedTeamMember;
  const setSelectedTeamMember = propSetSelectedTeamMember ?? setInternalSelectedTeamMember;

  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [hoveredApt, setHoveredApt] = useState<Appointment | null>(null);
  const [clickedApt, setClickedApt] = useState<Appointment | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const teamDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(e.target as Node)
      ) {
        setIsTeamDropdownOpen(false);
      }

      const target = e.target as HTMLElement;
      if (!target.closest(".apt-card") && !target.closest(".apt-popover")) {
        setClickedApt(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const calculatePopoverPosition = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const popoverWidth = 280;
    const padding = 10;

    let x = rect.right + padding + window.scrollX;
    // Check if it overflows the right side of the window
    if (rect.right + padding + popoverWidth > window.innerWidth) {
      x = rect.left - popoverWidth - padding + window.scrollX;
    }
    // Clamp to screen bounds
    x = Math.max(
      10 + window.scrollX,
      Math.min(x, window.innerWidth - popoverWidth - 10 + window.scrollX),
    );

    setPopoverPosition({
      x,
      y: rect.top - 20 + window.scrollY,
    });
  };

  const handleAptInteraction = (
    e: React.MouseEvent,
    apt: Appointment,
    isClick: boolean,
  ) => {
    if (isClick) {
      e.stopPropagation();
      if (clickedApt?.id === apt.id) {
        setClickedApt(null);
      } else {
        setClickedApt(apt);
        if (!isMobile) {
          calculatePopoverPosition(e.currentTarget);
        }
      }
    } else {
      if (!isMobile) {
        setHoveredApt(apt);
        calculatePopoverPosition(e.currentTarget);
      }
    }
  };

  // Helper to parse dates from format "5 Aug 2025 (10:00 AM - 11:00 AM)"
  const parseAptDate = (dateString: string) => {
    const parts = dateString.split("(")[0].trim().split(" ");
    if (parts.length >= 3) {
      const day = parseInt(parts[0]);
      const monthStr = parts[1]; // e.g. "Aug"
      const year = parseInt(parts[2]);

      const months: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };

      return new Date(year, months[monthStr] || 0, day);
    }
    return new Date();
  };

  // Helper to get appointment hours
  const parseAptHour = (dateString: string) => {
    // Extract e.g. "10:00 AM" from "5 Aug 2025 (10:00 AM - 11:00 AM)"
    const match = dateString.match(/\((\d{1,2}:\d{2}\s*[AP]M)/i);
    if (match) {
      return match[1].trim();
    }
    return "12:00 AM";
  };

  // Map status colors
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "Booked":
        return {
          bg: "bg-[#EEF2FF] border-[#C7D2FE] text-[#635BFF] border-l-[#635BFF]",
          dot: "bg-[#635BFF]",
        };
      case "Started":
        return {
          bg: "bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7] border-l-[#0284C7]",
          dot: "bg-[#0284C7]",
        };
      case "Canceled":
        return {
          bg: "bg-[#FCE7F3] border-[#FBCFE8] text-[#EC4899] border-l-[#EC4899]",
          dot: "bg-[#EC4899]",
        };
      case "Confirmed":
        return {
          bg: "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] border-l-[#10B981]",
          dot: "bg-[#10B981]",
        };
      case "Arrived":
        return {
          bg: "bg-[#FEF9C3] border-[#FDE047] text-[#A16207] border-l-[#A16207]",
          dot: "bg-[#A16207]",
        };
      case "Completed":
        return {
          bg: "bg-[#DCFCE7] border-[#BBF7D0] text-[#15803D] border-l-[#15803D]",
          dot: "bg-[#15803D]",
        };
      default:
        return {
          bg: "bg-[#F1F5F9] border-[#E2E8F0] text-[#64748B] border-l-[#64748B]",
          dot: "bg-[#64748B]",
        };
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    if (calendarView === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
    } else if (calendarView === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    }
  };

  const handleNext = () => {
    if (calendarView === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
    } else if (calendarView === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    }
  };

  // Format date headers
  const getHeaderDateString = () => {
    if (calendarView === "month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else if (calendarView === "week") {
      // Start of week (Sunday)
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString("en-US", { month: "long", day: "2-digit" })} – ${end.toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`;
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
      });
    }
  };

  // Filtered Appointments based on date and team member
  const getFilteredApts = () => {
    return appointments.filter((apt) => {
      const aptDate = parseAptDate(apt.date);
      // Basic match logic for currentDate view
      if (calendarView === "day") {
        return (
          aptDate.getDate() === currentDate.getDate() &&
          aptDate.getMonth() === currentDate.getMonth() &&
          aptDate.getFullYear() === currentDate.getFullYear()
        );
      }
      return true;
    });
  };

  // Hour rows definition
  const hours = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const activeMembers =
    selectedTeamMember === "all"
      ? mockTeamMembers.slice(1)
      : mockTeamMembers.filter((m) => m.id === selectedTeamMember);

  const gridStyle =
    selectedTeamMember === "all"
      ? "grid grid-cols-[70px_repeat(6,1fr)] sm:grid-cols-[100px_repeat(6,1fr)]"
      : "grid grid-cols-[70px_1fr] sm:grid-cols-[100px_1fr]";

  return (
    <div className="flex flex-col space-y-4">
      {/* Calendar Sub-Header */}
      {!hideHeader && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Left Side: Team Selector */}
          <div className="relative" ref={teamDropdownRef}>
            <button
              onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
              className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0">
                <img
                  src={
                    mockTeamMembers.find((t) => t.id === selectedTeamMember)
                      ?.avatarUrl || "/avatar/icon1.png"
                  }
                  alt="Selected Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>
                {mockTeamMembers.find((t) => t.id === selectedTeamMember)?.name ||
                  "All Team"}
              </span>
              <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
            </button>

            {isTeamDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-20 p-1">
                {mockTeamMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      setSelectedTeamMember(member.id);
                      setIsTeamDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-semibold rounded-lg text-left transition-colors ${
                      selectedTeamMember === member.id
                        ? "bg-[#EEF2FF] text-[#635BFF]"
                        : "text-[#475569] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTeamMember === member.id}
                      readOnly
                      className="accent-[#635BFF] rounded mr-2"
                    />
                    <div className="w-5 h-5 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0 mr-1.5 inline-block vertical-middle">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="vertical-middle">{member.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Navigation */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[13px] font-bold text-[#1E293B] font-manrope min-w-[120px] text-center select-none">
              {getHeaderDateString()}
            </span>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] text-[#64748B] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side: View Mode Toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg p-0.5 shrink-0 h-9">
              {(["month", "week", "day"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-colors ${
                    calendarView === view
                      ? "bg-white text-[#1E293B] shadow-sm"
                      : "text-[#64748B] hover:text-[#1E293B]"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F1F5F9] transition-colors shrink-0">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Grid View */}
      {calendarView === "day" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <div
              className={`${selectedTeamMember === "all" ? "min-w-[800px] sm:min-w-[900px]" : "w-full"} flex flex-col`}
            >
              {/* Header: Employee Columns */}
              <div
                className={`${gridStyle} border-b border-[#E2E8F0] bg-[#F8F9FE] sticky top-0 z-10`}
              >
                <div className="p-3 border-r border-[#E2E8F0]"></div>
                {activeMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex flex-col items-center justify-center border-r border-[#E2E8F0] last:border-r-0"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#E2E8F0] mb-1">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[12px] font-bold text-[#1E293B]">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Body: Hour Slots */}
              <div className="flex flex-col divide-y divide-[#E2E8F0]">
                {hours.map((hour, hourIdx) => (
                  <div
                    key={hourIdx}
                    className={`${gridStyle} min-h-[90px] group`}
                  >
                    {/* Hour Axis label */}
                    <div className="p-3 text-[11px] font-bold text-[#94A3B8] border-r border-[#E2E8F0] bg-[#F8F9FE]/30 flex items-start justify-center">
                      {hour}
                    </div>

                    {/* Employee Slots */}
                    {activeMembers.map((member, colIdx) => {
                      // Get appointments on this day, at this hour, for this team member ID
                      const matchedApts = getFilteredApts().filter((apt) => {
                        const aptHour = parseAptHour(apt.date);
                        const assignedColId = String(
                          (parseInt(apt.id) % 6) + 1,
                        ); // Distribute dummy data
                        return aptHour === hour && assignedColId === member.id;
                      });

                      return (
                        <div
                          key={colIdx}
                          className="p-1 border-r border-[#E2E8F0] last:border-r-0 relative hover:bg-[#F8FAFC]/50 transition-colors flex flex-col gap-1 justify-center"
                        >
                          {matchedApts.map((apt) => {
                            const colors = getStatusColor(apt.status);
                            return (
                              <div
                                key={apt.id}
                                onMouseEnter={(e) =>
                                  handleAptInteraction(e, apt, false)
                                }
                                onMouseLeave={() => setHoveredApt(null)}
                                onClick={(e) =>
                                  handleAptInteraction(e, apt, true)
                                }
                                className={`apt-card p-2 rounded-lg border-l-4 ${colors.bg} flex flex-col justify-between text-left cursor-pointer transition-shadow hover:shadow-md h-[78px] overflow-hidden relative`}
                              >
                                <span className="text-[10px] sm:text-[11px] font-bold truncate">
                                  {apt.service} ({apt.client.name.split(" ")[0]}
                                  )
                                </span>
                                <div className="flex flex-wrap items-center justify-between text-[8px] sm:text-[9px] font-medium mt-1 gap-1">
                                  <span className="opacity-80">15 min</span>
                                  <span className="opacity-80 font-bold">
                                    {apt.price}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {calendarView === "week" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[900px] flex flex-col">
              {/* Header: Days of the Week */}
              <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-[#E2E8F0] bg-[#F8F9FE] sticky top-0 z-10">
                <div className="p-3 border-r border-[#E2E8F0]"></div>
                {daysOfWeek.map((day, idx) => {
                  const dayDate = new Date(currentDate);
                  dayDate.setDate(dayDate.getDate() - dayDate.getDay() + idx);
                  return (
                    <div
                      key={idx}
                      className="p-3 flex flex-col items-center justify-center border-r border-[#E2E8F0] last:border-r-0"
                    >
                      <span className="text-[11px] font-bold text-[#64748B] uppercase">
                        {day}
                      </span>
                      <span className="text-[14px] font-extrabold text-[#1E293B] mt-0.5">
                        {String(dayDate.getDate()).padStart(2, "0")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Body: Hour Slots */}
              <div className="flex flex-col divide-y divide-[#E2E8F0]">
                {hours.map((hour, hourIdx) => (
                  <div
                    key={hourIdx}
                    className="grid grid-cols-[100px_repeat(7,1fr)] min-h-[80px]"
                  >
                    {/* Hour Axis label */}
                    <div className="p-3 text-[11px] font-bold text-[#94A3B8] border-r border-[#E2E8F0] bg-[#F8F9FE]/30 flex items-start justify-center">
                      {hour}
                    </div>

                    {/* Day Columns */}
                    {daysOfWeek.map((_, dayIdx) => {
                      const dayDate = new Date(currentDate);
                      dayDate.setDate(
                        dayDate.getDate() - dayDate.getDay() + dayIdx,
                      );

                      const matchedApts = appointments.filter((apt) => {
                        const aptDate = parseAptDate(apt.date);
                        const aptHour = parseAptHour(apt.date);
                        const assignedColId = String(
                          (parseInt(apt.id) % 6) + 1,
                        );
                        const matchesTeam =
                          selectedTeamMember === "all" ||
                          assignedColId === selectedTeamMember;
                        return (
                          aptDate.getDate() === dayDate.getDate() &&
                          aptDate.getMonth() === dayDate.getMonth() &&
                          aptDate.getFullYear() === dayDate.getFullYear() &&
                          aptHour === hour &&
                          matchesTeam
                        );
                      });

                      return (
                        <div
                          key={dayIdx}
                          className="p-1 border-r border-[#E2E8F0] last:border-r-0 relative hover:bg-[#F8FAFC]/50 transition-colors flex flex-col gap-1 justify-center"
                        >
                          {matchedApts.map((apt) => {
                            const colors = getStatusColor(apt.status);
                            return (
                              <div
                                key={apt.id}
                                onMouseEnter={(e) =>
                                  handleAptInteraction(e, apt, false)
                                }
                                onMouseLeave={() => setHoveredApt(null)}
                                onClick={(e) =>
                                  handleAptInteraction(e, apt, true)
                                }
                                className={`apt-card p-1.5 rounded border-l-2 ${colors.bg} text-[10px] font-semibold truncate cursor-pointer transition-shadow hover:shadow`}
                              >
                                {apt.client.name.split(" ")[0]} - {apt.service}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {calendarView === "month" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col">
          <div className="overflow-x-auto">
            <div className="min-w-[800px] border border-[#E2E8F0] rounded-lg overflow-hidden">
              {/* Days of Week */}
              <div className="grid grid-cols-7 bg-[#F8F9FE] border-b border-[#E2E8F0]">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-xs font-bold text-[#64748B] font-manrope border-r border-[#E2E8F0] last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day Cells */}
              <div className="grid grid-cols-7 bg-white">
                {(() => {
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const firstDayOfMonth = new Date(year, month, 1).getDay();

                  const cells: { date: Date; isCurrentMonth: boolean }[] = [];

                  // Trailing
                  const prevMonthDays = new Date(year, month, 0).getDate();
                  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                    cells.push({
                      date: new Date(year, month - 1, prevMonthDays - i),
                      isCurrentMonth: false,
                    });
                  }
                  // Current
                  for (let i = 1; i <= daysInMonth; i++) {
                    cells.push({
                      date: new Date(year, month, i),
                      isCurrentMonth: true,
                    });
                  }
                  // Leading
                  const remaining =
                    cells.length % 7 === 0 ? 0 : 7 - (cells.length % 7);
                  for (let i = 1; i <= remaining; i++) {
                    cells.push({
                      date: new Date(year, month + 1, i),
                      isCurrentMonth: false,
                    });
                  }

                  return cells.map((cell, idx) => {
                    const matchedApts = appointments.filter((apt) => {
                      const aptDate = parseAptDate(apt.date);
                      const assignedColId = String((parseInt(apt.id) % 6) + 1);
                      const matchesTeam =
                        selectedTeamMember === "all" ||
                        assignedColId === selectedTeamMember;
                      return (
                        aptDate.getDate() === cell.date.getDate() &&
                        aptDate.getMonth() === cell.date.getMonth() &&
                        aptDate.getFullYear() === cell.date.getFullYear() &&
                        matchesTeam
                      );
                    });

                    return (
                      <div
                        key={idx}
                        className={`min-h-[100px] p-2 border-b border-r border-[#E2E8F0] last:border-r-0 ${
                          !cell.isCurrentMonth ? "bg-[#F8FAFC]/50" : "bg-white"
                        }`}
                      >
                        <div className="flex justify-end mb-1">
                          <span
                            className={`text-[11px] font-bold ${
                              !cell.isCurrentMonth
                                ? "text-[#CBD5E1]"
                                : "text-[#94A3B8]"
                            }`}
                          >
                            {cell.date.getDate()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {matchedApts.map((apt) => {
                            const colors = getStatusColor(apt.status);
                            return (
                              <div
                                key={apt.id}
                                onMouseEnter={(e) =>
                                  handleAptInteraction(e, apt, false)
                                }
                                onMouseLeave={() => setHoveredApt(null)}
                                onClick={(e) =>
                                  handleAptInteraction(e, apt, true)
                                }
                                className={`apt-card p-1 rounded border-l-2 ${colors.bg} text-[10px] font-bold truncate cursor-pointer transition-shadow hover:shadow`}
                              >
                                {apt.client.name.split(" ")[0]} - {apt.service}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popover Detail Card (Desktop) */}
      {(hoveredApt || clickedApt) && popoverPosition && !isMobile && (
        <div
          className="apt-popover fixed bg-white border border-[#E2E8F0] rounded-xl shadow-2xl p-4 w-[280px] z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            left: popoverPosition.x,
            top: popoverPosition.y,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0">
                <img
                  src={
                    (hoveredApt || clickedApt)?.client.avatarUrl ||
                    "/avatar/icon1.png"
                  }
                  alt={(hoveredApt || clickedApt)?.client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#1E293B] leading-tight">
                  {(hoveredApt || clickedApt)?.client.name}
                </h4>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                (hoveredApt || clickedApt)?.status === "Canceled"
                  ? "bg-red-50 text-red-500 border border-red-100"
                  : (hoveredApt || clickedApt)?.status === "Completed"
                    ? "bg-green-50 text-green-500 border border-green-100"
                    : "bg-indigo-50 text-indigo-500 border border-indigo-100"
              }`}
            >
              {(hoveredApt || clickedApt)?.status}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px]">
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Date
              </span>
              <span className="text-[#1E293B] font-semibold mt-0.5 block">
                {parseAptDate(
                  (hoveredApt || clickedApt)?.date || "",
                ).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Time
              </span>
              <span className="text-[#1E293B] font-semibold mt-0.5 block">
                {parseAptHour((hoveredApt || clickedApt)?.date || "")}
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Service
              </span>
              <span className="text-[#1E293B] font-semibold mt-0.5 block">
                {(hoveredApt || clickedApt)?.service}
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Price
              </span>
              <span className="text-[#1E293B] font-semibold mt-0.5 block">
                {(hoveredApt || clickedApt)?.price}
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Duration
              </span>
              <span className="text-[#1E293B] font-semibold mt-0.5 block">
                15 min
              </span>
            </div>
            <div>
              <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                Employee
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-[#E2E8F0]">
                  <img
                    src="/avatar/icon1.png"
                    alt="Employee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#1E293B] font-semibold">
                  Maria Rodriguez
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popover Detail Card (Mobile Drawer Overlay) */}
      {(hoveredApt || clickedApt) && isMobile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="apt-popover bg-white rounded-2xl shadow-2xl p-5 w-full max-w-sm animate-in fade-in slide-in-from-bottom-10 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0">
                  <img
                    src={
                      (hoveredApt || clickedApt)?.client.avatarUrl ||
                      "/avatar/icon1.png"
                    }
                    alt={(hoveredApt || clickedApt)?.client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[14px] font-extrabold text-[#1E293B] leading-tight">
                    {(hoveredApt || clickedApt)?.client.name}
                  </h4>
                  <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5 block">
                    {(hoveredApt || clickedApt)?.client.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    (hoveredApt || clickedApt)?.status === "Canceled"
                      ? "bg-red-50 text-red-500 border border-red-100"
                      : (hoveredApt || clickedApt)?.status === "Completed"
                        ? "bg-green-50 text-green-500 border border-green-100"
                        : "bg-indigo-50 text-indigo-500 border border-indigo-100"
                  }`}
                >
                  {(hoveredApt || clickedApt)?.status}
                </span>
                <button
                  onClick={() => {
                    setClickedApt(null);
                    setHoveredApt(null);
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-[#F1F5F9] text-[#64748B] hover:text-[#1E293B] rounded-full text-xs font-bold transition-colors ml-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-[12px] mb-5">
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Date
                </span>
                <span className="text-[#1E293B] font-semibold mt-0.5 block">
                  {parseAptDate(
                    (hoveredApt || clickedApt)?.date || "",
                  ).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Time
                </span>
                <span className="text-[#1E293B] font-semibold mt-0.5 block">
                  {parseAptHour((hoveredApt || clickedApt)?.date || "")}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Service
                </span>
                <span className="text-[#1E293B] font-semibold mt-0.5 block">
                  {(hoveredApt || clickedApt)?.service}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Price
                </span>
                <span className="text-[#1E293B] font-semibold mt-0.5 block">
                  {(hoveredApt || clickedApt)?.price}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Duration
                </span>
                <span className="text-[#1E293B] font-semibold mt-0.5 block">
                  15 min
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-bold block uppercase tracking-wider text-[9px]">
                  Employee
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-4.5 h-4.5 rounded-full overflow-hidden bg-[#E2E8F0]">
                    <img
                      src="/avatar/icon1.png"
                      alt="Employee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[#1E293B] font-semibold">
                    Maria Rodriguez
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Drawer Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
              <button
                onClick={() => {
                  const apt = hoveredApt || clickedApt;
                  if (apt) {
                    onEditAppointment(apt);
                    setClickedApt(null);
                    setHoveredApt(null);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#E2E8F0] rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  const apt = hoveredApt || clickedApt;
                  if (apt) {
                    onDeleteAppointment(apt);
                    setClickedApt(null);
                    setHoveredApt(null);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-red-200 bg-red-50 rounded-xl text-[13px] font-bold text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
