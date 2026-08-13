"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus, ChevronRight, EllipsisVertical } from "lucide-react";
import SearchMemberModal from "./SearchMemberModal";
import CalendarView from "./Calendarview";
import AppointmentTableView from "./AppointmentTableView";
import Link from "next/link";
import { CustomSelect } from "@/components/common/CustomSelect";

import { Status, allAppointments, recentMembers, statusFilters } from "./data";

export default function AppointmentContent() {
  const [activeStatus, setActiveStatus] = useState<Status | "All">("All");
  const [activeView, setActiveView] = useState<"calendar" | "table">(
    "calendar",
  );
  const [activePeriod, setActivePeriod] = useState<"Month" | "Week" | "Day">(
    "Day",
  );
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-08-05T00:00:00"),
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsHovered, setSettingsHovered] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    right: number;
  } | null>(null);

  // Recalculate position whenever menu opens
  useEffect(() => {
    if (menuOpen && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
    }
  }, [menuOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuButtonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      )
        return;
      setMenuOpen(false);
      setSettingsHovered(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close on scroll/resize so it doesn't drift
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => {
      setMenuOpen(false);
      setSettingsHovered(false);
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [menuOpen]);

  const handleNavigate = (dir: number) => {
    const d = new Date(currentDate);
    if (activePeriod === "Day") d.setDate(d.getDate() + dir);
    else if (activePeriod === "Week") d.setDate(d.getDate() + 7 * dir);
    else d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const dateLabel = (() => {
    if (activePeriod === "Day") {
      return currentDate
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        })
        .replace(",", "");
    }
    if (activePeriod === "Week") {
      const s = new Date(currentDate);
      s.setDate(s.getDate() - s.getDay());
      const e = new Date(s);
      e.setDate(e.getDate() + 6);
      return `${s.toLocaleDateString("en-US", { month: "short", day: "2-digit" })} - ${e.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}`;
    }
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  })();

  const filtered = allAppointments.filter((a) => {
    if (activeStatus !== "All" && a.status !== activeStatus) return false;

    const datePart = a.scheduledDate.split("(")[0].trim();
    const apptDate = new Date(datePart);

    if (activePeriod === "Day") {
      return (
        apptDate.getFullYear() === currentDate.getFullYear() &&
        apptDate.getMonth() === currentDate.getMonth() &&
        apptDate.getDate() === currentDate.getDate()
      );
    } else if (activePeriod === "Week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return apptDate >= start && apptDate <= end;
    } else {
      return (
        apptDate.getFullYear() === currentDate.getFullYear() &&
        apptDate.getMonth() === currentDate.getMonth()
      );
    }
  });
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChevronClick = (globalIndex: number) => {
    setExpandedRow((prev) => (prev === globalIndex ? null : globalIndex));
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope space-y-4">
      {searchOpen && (
        <SearchMemberModal
          recentMembers={recentMembers}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {/* Header Card */}
      <div className="bg-white rounded-xl py-4 px-4 sm:px-6 border border-[#EFF4FA]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-lg font-bold font-manrope text-[#29343D]">
            Appointments
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {activeView === "table" && (
              <div className="w-[100px]">
                <CustomSelect
                  value={activeStatus}
                  options={statusFilters}
                  buttonClassName="h-[44px] text-sm font-manrope font-semibold text-[#29343D] w-full"
                  onChange={(val) => {
                    setActiveStatus(val as Status | "All");
                    setCurrentPage(1);
                    setExpandedRow(null);
                  }}
                  align="left"
                />
              </div>
            )}
            {/* Calendar / Table toggle */}
            <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden">
              <button
                onClick={() => setActiveView("calendar")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-manrope font-medium transition-colors cursor-pointer ${activeView === "calendar" ? "bg-[#DDDBFF] text-[#635BFF]" : "text-[#98A4AE] hover:text-[#29343D]"}`}
              >
                <span>Calendar View</span>
              </button>
              <button
                onClick={() => setActiveView("table")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-manrope font-medium transition-colors cursor-pointer ${activeView === "table" ? "bg-[#DDDBFF] text-[#635BFF]" : "text-[#98A4AE] hover:text-[#29343D]"}`}
              >
                <span>Table View</span>
              </button>
            </div>

            {/* 3-dot menu button */}
            <button
              ref={menuButtonRef}
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setSettingsHovered(false);
              }}
              className="w-[44px] h-[44px] flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              <EllipsisVertical size={20} color="#0A2540" />
            </button>
            {menuOpen && dropdownPos && (
              <div
                ref={dropdownRef}
                style={{
                  position: "fixed",
                  top: dropdownPos.top,
                  right: dropdownPos.right,
                  zIndex: 99999,
                }}
              >
                <div className="bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 min-w-[190px]">
                  {/* Settings with sub-menu */}
                  <div
                    className="relative flex items-center justify-between px-4 py-2.5 hover:bg-[#F4F6FA] cursor-pointer"
                    onMouseEnter={() => setSettingsHovered(true)}
                    onMouseLeave={() => setSettingsHovered(false)}
                  >
                    <span className="text-sm font-manrope font-medium text-[#29343D]">
                      Settings
                    </span>
                    <ChevronRight size={15} className="text-[#98A4AE]" />

                    {settingsHovered && (
                      <div
                        className="absolute left-full top-0 ml-1 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 min-w-[220px]"
                        onMouseEnter={() => setSettingsHovered(true)}
                        onMouseLeave={() => setSettingsHovered(false)}
                      >
                        <Link href="/dashboard/appointment/settings">
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                            onClick={() => {
                              setMenuOpen(false);
                              setSettingsHovered(false);
                            }}
                          >
                            General settings
                          </button>
                        </Link>
                        <Link href="/dashboard/appointment/settings?tab=notifications">
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                            onClick={() => {
                              setMenuOpen(false);
                              setSettingsHovered(false);
                            }}
                          >
                            Notifications &amp; Communication
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link href="/dashboard/appointment/import">
                    <button
                      className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                      onClick={() => setMenuOpen(false)}
                    >
                      Import Appointments
                    </button>
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Export Data
                  </button>
                </div>
              </div>
            )}

            <Link href={"/dashboard/appointment/add"}>
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer">
                <Plus size={16} />
                <span className="hidden sm:inline">Add Appointment</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {activeView === "calendar" && <CalendarView />}

      {/* Table Card */}
      {activeView === "table" && (
        <AppointmentTableView
          setSearchOpen={setSearchOpen}
          activePeriod={activePeriod}
          setActivePeriod={setActivePeriod}
          paginated={paginated}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          expandedRow={expandedRow}
          handleChevronClick={handleChevronClick}
          filtered={filtered}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          dateLabel={dateLabel}
          handleNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
