"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Check,
  X,
  FileText,
  Maximize2,
} from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/saloonOwner/common/Pagination";
import Modal from "@/components/saloonOwner/common/Modal";

import {
  dummyAppointments,
  Appointment,
  AppointmentStatus,
  mockTeamMembers,
} from "../../../data/data";
import Image from "next/image";
import AppointmentsCalendar from "@/components/saloonOwner/appointments/AppointmentsCalendar";

export default function AppointmentsPage() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 5)); // Set default to Aug 5, 2025
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const teamDropdownRef = React.useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (calendarView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (calendarView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (calendarView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (calendarView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const getHeaderDateString = () => {
    if (calendarView === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } else if (calendarView === "week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString("en-US", { month: "long", day: "2-digit" })} – ${end.toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`;
    } else {
      return currentDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "2-digit" });
    }
  };

  const parseAptDate = (dateString: string) => {
    const parts = dateString.split("(")[0].trim().split(" ");
    if (parts.length >= 3) {
      const day = parseInt(parts[0]);
      const monthStr = parts[1]; // e.g. "Aug"
      const year = parseInt(parts[2]);
      
      const months: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      
      return new Date(year, months[monthStr] || 0, day);
    }
    return new Date();
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      setOpenMenuId(null);
      setIsMoreOpen(false);
      setActiveSubMenu(null);
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(e.target as Node)
      ) {
        setIsTeamDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const [appointmentsData, setAppointmentsData] =
    useState<Appointment[]>(dummyAppointments);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [viewType, setViewType] = useState<"calendar" | "table">("table");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (!selectedAppointment) return;
    setAppointmentsData(
      appointmentsData.filter((a) => a.id !== selectedAppointment.id),
    );
    setIsDeleteOpen(false);
  };

  const handleDownload = () => {
    setIsDownloadOpen(false);
  };

  const getStatusStyle = (status: AppointmentStatus) => {
    switch (status) {
      case "Booked":
        return "bg-[#EEF2FF] text-[#635BFF]";
      case "Started":
        return "bg-[#F0F9FF] text-[#0369A1]";
      case "Canceled":
        return "bg-[#FFE4E6] text-[#F43F5E]";
      case "Confirmed":
        return "bg-[#ECFEFF] text-[#0891B2]";
      case "Arrived":
        return "bg-[#FFF7ED] text-[#C2410C]";
      case "Completed":
        return "bg-[#F0FDF4] text-[#15803D]";
      default:
        return "bg-[#F1F5F9] text-[#475569]";
    }
  };

  const filteredData = appointmentsData.filter((apt) => {
    const matchesStatus = statusFilter === "All" || apt.status === statusFilter;
    const matchesSearch = apt.client.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const assignedColId = String((parseInt(apt.id) % 6) + 1);
    const matchesTeam = selectedTeamMember === "all" || assignedColId === selectedTeamMember;

    const aptDate = parseAptDate(apt.date);
    const matchesDate = (
      aptDate.getDate() === currentDate.getDate() &&
      aptDate.getMonth() === currentDate.getMonth() &&
      aptDate.getFullYear() === currentDate.getFullYear()
    );

    return matchesStatus && matchesSearch && matchesTeam && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <h1 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">
            Appointments
          </h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="lg:hidden justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-3.5 py-2 rounded-lg font-semibold text-[13px] flex items-center gap-1.5 transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* View Toggle (Calendar / Table) */}
          <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg p-1 shrink-0 h-10">
            <button
              onClick={() => setViewType("calendar")}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                viewType === "calendar"
                  ? "bg-[#E0E7FF] text-[#635BFF]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewType("table")}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                viewType === "table"
                  ? "bg-[#E0E7FF] text-[#635BFF]"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Table View
            </button>
          </div>

          {/* More Actions Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                setIsMoreOpen(!isMoreOpen);
                setActiveSubMenu(null);
              }}
              className="w-10 h-10 flex items-center justify-center bg-[#F1F5F9] text-[#1E293B] rounded-xl hover:bg-[#E2E8F0] transition-colors shrink-0"
            >
              <MoreVertical className="w-4 h-4 text-[#1E293B]" />
            </button>
            {isMoreOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-1.5 z-30"
                onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
              >
                {/* Settings nested dropdown */}
                <div
                  className="relative w-full"
                  onMouseEnter={() => setActiveSubMenu("settings")}
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  <button
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] rounded-xl transition-colors text-left ${
                      activeSubMenu === "settings"
                        ? "bg-[#F1F5F9]"
                        : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span>Settings</span>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </button>
                  {activeSubMenu === "settings" && (
                    <div className="absolute right-full top-0 mr-1.5 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        href="/dashboard/appointments/settings?tab=general"
                        onClick={() => {
                          setIsMoreOpen(false);
                          setActiveSubMenu(null);
                        }}
                        className="w-full block text-left px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
                      >
                        General settings
                      </Link>
                      <Link
                        href="/dashboard/appointments/settings?tab=notifications"
                        onClick={() => {
                          setIsMoreOpen(false);
                          setActiveSubMenu(null);
                        }}
                        className="w-full block text-left px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
                      >
                        Notifications & Communication
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/dashboard/appointments/import"
                  onClick={() => {
                    setIsMoreOpen(false);
                  }}
                  className="w-full block text-left px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] rounded-xl transition-colors"
                >
                  Import Appointments
                </Link>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    alert("Exporting data...");
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] rounded-xl transition-colors"
                >
                  Export Data
                </button>
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-auto flex-1 sm:flex-initial">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Booked">Booked</option>
              <option value="Started">Started</option>
              <option value="Canceled">Canceled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Arrived">Arrived</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="hidden lg:flex justify-center bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-semibold text-[13px] items-center gap-1.5 transition-colors shadow-sm shadow-[#635BFF]/20 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Appointment
          </button>
        </div>
      </div>

      {/* Calendar Sub-Header */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Left Side: Team Selector */}
        <div className="relative" ref={teamDropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTeamDropdownOpen(!isTeamDropdownOpen);
            }}
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
            <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-1">
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

      {viewType === "table" ? (
        <>
          {/* Main Table Container */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[5%]">
                      ID
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[25%]">
                      Client
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[15%]">
                      Service
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[20%]">
                      Scheduled Date
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[10%]">
                      Price
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[15%]">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[13px] font-bold text-[#1E293B] font-manrope text-center w-[10%]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((apt) => (
                    <React.Fragment key={apt.id}>
                      <tr className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors group">
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <span className="text-[13px] font-bold text-[#1E293B]">
                            #{apt.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F1F5F9] relative">
                              {apt.client.avatarUrl ? (
                                <Image
                                  fill
                                  src={apt.client.avatarUrl}
                                  alt={apt.client.name}
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#1E293B]">
                                {apt.client.name}
                              </div>
                              <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                                {apt.client.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <span className="text-[13px] font-semibold text-[#64748B]">
                            {apt.service}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <span className="text-[13px] font-semibold text-[#64748B]">
                            {apt.date}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <span className="text-[13px] font-bold text-[#1E293B]">
                            {apt.price}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E2E8F0]">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(apt.status)}`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r-0 relative">
                          <div className="flex items-center justify-center gap-2">
                            <div
                              className="action-menu-trigger w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center cursor-pointer select-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                setOpenMenuId(
                                  openMenuId === apt.id ? null : apt.id,
                                );
                              }}
                            >
                              <MoreVertical className="w-4 h-4 text-[#64748B]" />
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRowId(
                                  expandedRowId === apt.id ? null : apt.id,
                                );
                              }}
                              className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center text-[#635BFF] transition-colors"
                            >
                              {expandedRowId === apt.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {openMenuId === apt.id && (
                            <div
                              className="action-menu-dropdown absolute right-6 top-[70%] mt-1 w-44 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-1.5 z-30 text-left"
                              onClick={(e) =>
                                e.nativeEvent.stopImmediatePropagation()
                              }
                            >
                              <Link
                                href={`/dashboard/appointments/${apt.id}`}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                                onClick={() => setOpenMenuId(null)}
                              >
                                <Eye className="w-4 h-4 text-[#635BFF]" />
                                <span>View Details</span>
                              </Link>
                              <button
                                onClick={() => {
                                  setSelectedAppointment(apt);
                                  setIsEditOpen(true);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors text-left"
                              >
                                <Edit className="w-4 h-4 text-[#0EA5E9]" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAppointment(apt);
                                  setIsDeleteOpen(true);
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-[#475569] hover:bg-red-50 rounded-lg transition-colors text-left"
                              >
                                <Trash2 className="w-4 h-4 text-[#EF4444]" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>

                      {expandedRowId === apt.id && (
                        <tr className="bg-[#F8FAFC]/60">
                          <td
                            colSpan={7}
                            className="px-6 py-6 border-b border-[#E2E8F0]"
                          >
                            <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <h3 className="text-[13px] font-bold text-[#475569] tracking-wider uppercase">
                                Booking Order
                              </h3>

                              {/* Steps container */}
                              <div className="flex items-center justify-between w-full max-w-[620px] relative px-6">
                                {/* Connector line */}
                                <div className="absolute top-[28px] left-[50px] right-[50px] h-[2.5px] bg-slate-200 z-0"></div>

                                {/* Step 1 */}
                                <div className="flex flex-col items-center z-10 space-y-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                      apt.status === "Booked"
                                        ? "bg-amber-55 bg-amber-100 text-amber-700"
                                        : apt.status === "Started"
                                          ? "bg-sky-100 text-sky-700"
                                          : apt.status === "Canceled"
                                            ? "bg-rose-100 text-rose-700"
                                            : apt.status === "Completed"
                                              ? "bg-emerald-100 text-emerald-700"
                                              : "bg-indigo-50 text-indigo-600"
                                    }`}
                                  >
                                    {apt.status === "Booked"
                                      ? "Overdue"
                                      : apt.status === "Started"
                                        ? "Doing"
                                        : apt.status === "Canceled"
                                          ? "Canceled"
                                          : apt.status === "Completed"
                                            ? "Completed"
                                            : "To Do"}
                                  </span>
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                      apt.status === "Booked"
                                        ? "border-amber-500 text-amber-600"
                                        : apt.status === "Started"
                                          ? "border-sky-500 text-sky-600 animate-pulse"
                                          : apt.status === "Canceled"
                                            ? "border-rose-500 text-rose-600"
                                            : apt.status === "Completed"
                                              ? "border-emerald-500 text-emerald-600"
                                              : "border-indigo-500 text-indigo-600"
                                    }`}
                                  >
                                    {apt.status === "Canceled" ? (
                                      <X className="w-4 h-4 stroke-[3px]" />
                                    ) : apt.status === "Completed" ? (
                                      <Check className="w-4 h-4 stroke-[3px]" />
                                    ) : (
                                      "1"
                                    )}
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[11px] font-extrabold text-[#1E293B]">
                                      12:00-12:05
                                    </div>
                                    <div className="text-[10px] font-bold text-[#475569]">
                                      {apt.service}
                                    </div>
                                    <div className="text-[10px] font-medium text-slate-400">
                                      Angelica
                                    </div>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-center z-10 space-y-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                      apt.status === "Canceled"
                                        ? "bg-rose-100 text-rose-700"
                                        : apt.status === "Completed"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {apt.status === "Canceled"
                                      ? "Canceled"
                                      : apt.status === "Completed"
                                        ? "Completed"
                                        : "To Do"}
                                  </span>
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                      apt.status === "Canceled"
                                        ? "border-rose-500 text-rose-600"
                                        : apt.status === "Completed"
                                          ? "border-emerald-500 text-emerald-600"
                                          : "border-slate-300 text-slate-500"
                                    }`}
                                  >
                                    {apt.status === "Canceled" ? (
                                      <X className="w-4 h-4 stroke-[3px]" />
                                    ) : apt.status === "Completed" ? (
                                      <Check className="w-4 h-4 stroke-[3px]" />
                                    ) : (
                                      "2"
                                    )}
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[11px] font-extrabold text-[#1E293B]">
                                      12:05-12:10
                                    </div>
                                    <div className="text-[10px] font-bold text-[#475569]">
                                      {apt.service}
                                    </div>
                                    <div className="text-[10px] font-medium text-slate-400">
                                      Angelica
                                    </div>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-center z-10 space-y-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                      apt.status === "Canceled"
                                        ? "bg-rose-100 text-rose-700"
                                        : apt.status === "Completed"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {apt.status === "Canceled"
                                      ? "Canceled"
                                      : apt.status === "Completed"
                                        ? "Completed"
                                        : "To Do"}
                                  </span>
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                      apt.status === "Canceled"
                                        ? "border-rose-500 text-rose-600"
                                        : apt.status === "Completed"
                                          ? "border-emerald-500 text-emerald-600"
                                          : "border-slate-300 text-slate-500"
                                    }`}
                                  >
                                    {apt.status === "Canceled" ? (
                                      <X className="w-4 h-4 stroke-[3px]" />
                                    ) : apt.status === "Completed" ? (
                                      <Check className="w-4 h-4 stroke-[3px]" />
                                    ) : (
                                      "3"
                                    )}
                                  </div>
                                  <div className="text-center">
                                    <div className="text-[11px] font-extrabold text-[#1E293B]">
                                      12:10-12:15
                                    </div>
                                    <div className="text-[10px] font-bold text-[#475569]">
                                      {apt.service}
                                    </div>
                                    <div className="text-[10px] font-medium text-slate-400">
                                      Angelica
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Row */}
                              <button
                                onClick={() => {
                                  setSelectedAppointment(apt);
                                  setIsReceiptOpen(true);
                                }}
                                className="bg-[#EEF2FF] hover:bg-[#D3DCFF] text-[#635BFF] px-6 py-2.5 rounded-xl font-bold text-[12px] transition-all flex items-center gap-2 shadow-sm border border-[#C7D2FE]"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                Print Receipt
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                itemName="appointments"
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      ) : (
        <AppointmentsCalendar
          appointments={appointmentsData}
          onEditAppointment={(apt) => {
            setSelectedAppointment(apt);
            setIsEditOpen(true);
          }}
          onDeleteAppointment={(apt) => {
            setSelectedAppointment(apt);
            setIsDeleteOpen(true);
          }}
          onAddAppointment={() => setIsAddOpen(true)}
          calendarView={calendarView}
          setCalendarView={setCalendarView}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedTeamMember={selectedTeamMember}
          setSelectedTeamMember={setSelectedTeamMember}
          hideHeader={true}
        />
      )}

      {/* --- Modals --- */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Appointment"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Client Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                placeholder="e.g. Maria Rodriguez"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                placeholder="e.g. +39 345 678 9123"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Service
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors appearance-none bg-white cursor-pointer"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Haircut">Haircut</option>
                  <option value="Coloring">Coloring</option>
                  <option value="Styling">Styling</option>
                  <option value="Manicure">Manicure</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Price (€)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                placeholder="e.g. 170"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none"
              placeholder="Add any special notes or requests here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#635BFF] hover:bg-[#524be0] text-white px-4 py-2 rounded-lg font-bold text-[13px] transition-colors mt-4"
          >
            Add Appointment
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Appointment"
      >
        <form onSubmit={handleEdit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Client Name
              </label>
              <input
                type="text"
                defaultValue={selectedAppointment?.client.name}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={selectedAppointment?.client.phone}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Service
              </label>
              <div className="relative">
                <select
                  defaultValue={selectedAppointment?.service}
                  className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors appearance-none bg-white cursor-pointer"
                  required
                >
                  <option value="Haircut">Haircut</option>
                  <option value="Coloring">Coloring</option>
                  <option value="Styling">Styling</option>
                  <option value="Manicure">Manicure</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Price
              </label>
              <input
                type="text"
                defaultValue={selectedAppointment?.price}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Date
              </label>
              <input
                type="text"
                defaultValue={selectedAppointment?.date.split("(")[0].trim()}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
                Time
              </label>
              <input
                type="text"
                defaultValue={selectedAppointment?.date
                  .split("(")[1]
                  ?.replace(")", "")}
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#1E293B] mb-1">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none"
              placeholder="Add any special notes or requests here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#10B981] hover:bg-[#0ea5e9] text-white px-4 py-2 rounded-lg font-bold text-[13px] transition-colors mt-4"
          >
            Save Changes
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        title="Download Receipt"
      >
        <div className="space-y-4 text-center pb-2">
          <p className="text-[14px] font-medium text-[#64748B]">
            Are you sure you want to download the receipt for{" "}
            <span className="font-bold text-[#1E293B]">
              {selectedAppointment?.client.name}
            </span>
            ?
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => setIsDownloadOpen(false)}
              className="px-6 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2 rounded-lg bg-[#06B6D4] text-white text-[13px] font-bold hover:bg-[#0891b2] transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Appointment"
      >
        <div className="space-y-4 text-center pb-2">
          <p className="text-[14px] font-medium text-[#64748B]">
            Are you sure you want to delete the appointment for{" "}
            <span className="font-bold text-[#1E293B]">
              {selectedAppointment?.client.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-6 py-2 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 rounded-lg bg-[#EF4444] text-white text-[13px] font-bold hover:bg-[#DC2626] transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Service Receipt Modal */}
      {isReceiptOpen &&
        selectedAppointment &&
        (() => {
          const totalVal = parseFloat(
            selectedAppointment.price.replace(/[^\d.]/g, "") || "170",
          );
          const taxableVal = (totalVal / 1.22).toFixed(2);
          const vatVal = (totalVal - parseFloat(taxableVal)).toFixed(2);

          return (
            <Modal
              isOpen={isReceiptOpen}
              onClose={() => setIsReceiptOpen(false)}
              maxWidth="max-w-4xl"
              showCloseButton={false}
            >
              <div className="space-y-6">
                {/* Receipt Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <button
                    onClick={() => setIsReceiptOpen(false)}
                    className="flex items-center gap-2 hover:text-[#635BFF] transition-colors group text-left"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#64748B] group-hover:text-[#635BFF]" />
                    <div>
                      <h2 className="text-[15px] font-extrabold text-[#1E293B] font-manrope">
                        Service Receipt
                      </h2>
                      <p className="text-[11px] font-bold text-slate-400">
                        Italian Fiscal Invoice
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => alert("Downloading PDF Receipt...")}
                    className="bg-[#EEF2FF] hover:bg-[#D3DCFF] text-[#635BFF] px-4 py-2 rounded-xl font-bold text-[12px] flex items-center gap-1.5 transition-colors border border-[#C7D2FE] shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>

                {/* Electronic Invoice Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#E2E8F0] rounded-2xl p-4 bg-slate-50/50">
                    <div className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-wider">
                      Electronic Invoice
                    </div>
                    <div className="text-[15px] font-extrabold text-[#1E293B] mt-1.5">
                      2025-000{selectedAppointment.id}
                    </div>
                    <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                      Receipt No.
                    </div>
                  </div>

                  <div className="border border-[#E2E8F0] rounded-2xl p-4 bg-slate-50/50">
                    <div className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-wider">
                      Date
                    </div>
                    <div className="text-[15px] font-extrabold text-[#1E293B] mt-1.5">
                      11/30/2024
                    </div>
                    <div className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                      Date Issued
                    </div>
                  </div>
                </div>

                {/* Transferor & Transferee Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Transferor */}
                  <div className="border border-[#E2E8F0] rounded-2xl p-5 space-y-3 bg-white">
                    <h4 className="text-[12px] font-extrabold text-[#1E293B] border-b border-slate-100 pb-2">
                      Transferor/Provider
                    </h4>
                    <div className="space-y-1 text-[12px] font-semibold text-[#475569]">
                      <div className="font-extrabold text-[#1E293B] text-[13px]">
                        Bella Vista Salon
                      </div>
                      <div>Via Roma, 123</div>
                      <div>20121 Milan (MI) - Italy</div>
                      <div className="pt-1.5 flex flex-wrap gap-x-3 text-[11px] text-slate-400">
                        <span>
                          PIVA:{" "}
                          <strong className="text-[#475569]">
                            IT12345678901
                          </strong>
                        </span>
                        <span>
                          Tax Code:{" "}
                          <strong className="text-[#475569]">
                            12345678901
                          </strong>
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        PEC:{" "}
                        <strong className="text-[#475569]">
                          amministrazione@pec.salonflow.it
                        </strong>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Recipient Code:{" "}
                        <strong className="text-[#475569]">XXXXXXX</strong>
                      </div>
                      <div className="pt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-400">
                        <span>
                          Tel:{" "}
                          <strong className="text-[#475569]">
                            +39 02 1234567
                          </strong>
                        </span>
                        <span>
                          Email:{" "}
                          <strong className="text-[#475569]">
                            info@salonflow.it
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transferee */}
                  <div className="border border-[#E2E8F0] rounded-2xl p-5 space-y-3 bg-white">
                    <h4 className="text-[12px] font-extrabold text-[#1E293B] border-b border-slate-100 pb-2">
                      Transferee/Client
                    </h4>
                    <div className="space-y-1 text-[12px] font-semibold text-[#475569]">
                      <div className="font-extrabold text-[#1E293B] text-[13px]">
                        {selectedAppointment.client.name}
                      </div>
                      <div>Via Esempio, 458</div>
                      <div>10100 Turin (TO) - Italy</div>
                      <div className="pt-1.5 text-[11px] text-slate-400">
                        Tax Code:{" "}
                        <strong className="text-[#475569]">
                          RSTGPP90A01L219Y
                        </strong>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Phone:{" "}
                        <strong className="text-[#475569]">
                          {selectedAppointment.client.phone}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Description Table */}
                <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0] text-[11px] font-extrabold text-[#1E293B] uppercase tracking-wider">
                        <th className="px-5 py-3 border-r border-[#E2E8F0] w-[40%]">
                          Service Name
                        </th>
                        <th className="px-5 py-3 border-r border-[#E2E8F0] text-center w-[15%]">
                          Amount
                        </th>
                        <th className="px-5 py-3 border-r border-[#E2E8F0] text-right w-[15%]">
                          Unit Price
                        </th>
                        <th className="px-5 py-3 border-r border-[#E2E8F0] text-center w-[15%]">
                          VAT Rate
                        </th>
                        <th className="px-5 py-3 text-right w-[15%]">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-[12px] font-semibold text-[#475569] border-b border-slate-100 last:border-b-0">
                        <td className="px-5 py-4 border-r border-[#E2E8F0] font-extrabold text-[#1E293B]">
                          {selectedAppointment.service}
                        </td>
                        <td className="px-5 py-4 border-r border-[#E2E8F0] text-center">
                          1
                        </td>
                        <td className="px-5 py-4 border-r border-[#E2E8F0] text-right">
                          €{taxableVal}
                        </td>
                        <td className="px-5 py-4 border-r border-[#E2E8F0] text-center">
                          22%
                        </td>
                        <td className="px-5 py-4 text-right font-extrabold text-[#1E293B]">
                          €{totalVal.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* VAT & Totals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* VAT Summary */}
                  <div className="border border-[#E2E8F0] rounded-2xl p-4 space-y-2 bg-white">
                    <div className="text-[11px] font-extrabold text-[#1E293B] uppercase tracking-wider mb-2">
                      VAT Summary
                    </div>
                    <div className="flex justify-between text-[12px] font-semibold text-[#475569] border-b border-slate-100 pb-1.5">
                      <span>Rate</span>
                      <span>22%</span>
                    </div>
                    <div className="flex justify-between text-[12px] font-semibold text-[#475569] border-b border-slate-100 pb-1.5">
                      <span>Taxable</span>
                      <span>€{taxableVal}</span>
                    </div>
                    <div className="flex justify-between text-[12px] font-semibold text-[#475569]">
                      <span>IVA (VAT)</span>
                      <span>€{vatVal}</span>
                    </div>
                  </div>

                  {/* Document Totals */}
                  <div className="border border-[#E2E8F0] rounded-2xl p-4 space-y-2 bg-white">
                    <div className="text-[11px] font-extrabold text-[#1E293B] uppercase tracking-wider mb-2">
                      Document Totals
                    </div>
                    <div className="flex justify-between text-[12px] font-semibold text-[#475569] border-b border-slate-100 pb-1.5">
                      <span>Total Taxable Amount</span>
                      <span>€{taxableVal}</span>
                    </div>
                    <div className="flex justify-between text-[12px] font-semibold text-[#475569] border-b border-slate-100 pb-1.5">
                      <span>Total VAT</span>
                      <span>€{vatVal}</span>
                    </div>
                    <div className="flex justify-between text-[13px] font-extrabold text-[#635BFF]">
                      <span>Document Total</span>
                      <span>€{totalVal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-white space-y-3">
                  <h4 className="text-[12px] font-extrabold text-[#1E293B] border-b border-slate-100 pb-2">
                    Payment Methods
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px] font-semibold text-[#475569]">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Mode
                      </div>
                      <div className="text-[#1E293B] font-extrabold mt-1">
                        Credit Card
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Payment Date
                      </div>
                      <div className="text-[#1E293B] font-extrabold mt-1">
                        12/10/2024
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Amount Paid
                      </div>
                      <div className="text-[#1E293B] font-extrabold mt-1">
                        €{totalVal.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        Status
                      </div>
                      <div className="mt-1">
                        <span className="inline-flex px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-full">
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Notes */}
                <div className="border border-[#E2E8F0] rounded-2xl p-5 bg-slate-50/50 space-y-2">
                  <h4 className="text-[12px] font-extrabold text-[#1E293B]">
                    Legal Notes
                  </h4>
                  <ul className="list-disc pl-4 text-[11px] font-semibold text-[#64748B] space-y-1">
                    <li>
                      Invoice issued pursuant to art. 21 of Presidential Decree
                      26 October 1972, n. 633 and subsequent amendments.
                    </li>
                    <li>
                      VAT paid by the purchaser pursuant to art. 17, paragraph
                      5, of Presidential Decree 26 October 1972, n. 633.
                    </li>
                    <li>
                      Digitally signed electronic document pursuant to
                      Legislative Decree 82/2005.
                    </li>
                    <li>
                      Replacement storage of documents pursuant to the
                      Ministerial Decree of 17 June 2014.
                    </li>
                    <li>Competent court: Milan. Applicable law: Italian.</li>
                  </ul>
                </div>

                {/* Footer info */}
                <div className="text-center text-[10px] font-semibold text-[#94A3B8] pt-2 border-t border-slate-100">
                  SalonFlow Srl - Via Roma, 123 - 20121 Milan (MI) - VAT number
                  IT12345678901 - Share Capital: € 10,000.00 i.v. - REA
                  MI-1234567 - SDI Code: XXXXXXX - www.salonflow.it
                </div>
              </div>
            </Modal>
          );
        })()}
    </div>
  );
}
