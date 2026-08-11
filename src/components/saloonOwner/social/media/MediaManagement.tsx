"use client";

import { useState, useRef, useEffect } from "react";
import { SearchIcon, UploadIcon, X, ChevronRight, ChevronLeft, Zap, Users, Calendar, Trash2, MoreVertical, Download, Eye, Edit2, ChevronDown, ChevronUp, Folder, Plus, Film, List, LayoutGrid } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { MediaCard } from "./MediaCard";

type UsageFilter = "All Media" | "Used" | "Unused";

import { MediaItem, MediaSession, MOCK_SESSIONS, ALL_CLIENTS, ALL_SERVICES, ALL_PROVIDERS } from "./data";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ── Calendar Date Range Picker ────────────────────────────────────────
interface CalendarPickerProps {
  fromDate: string;
  toDate: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onDone: () => void;
  onClear: () => void;
}

function CalendarPicker({ fromDate, toDate, onFromChange, onToChange, onDone, onClear }: CalendarPickerProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [hovered, setHovered] = useState<string | null>(null);

  const toYMD = (d: Date) => d.toISOString().split("T")[0];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (ymd: string) => {
    if (!fromDate || (fromDate && toDate)) {
      onFromChange(ymd);
      onToChange("");
    } else {
      if (ymd < fromDate) {
        onToChange(fromDate);
        onFromChange(ymd);
      } else {
        onToChange(ymd);
      }
    }
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      toYMD(new Date(viewYear, viewMonth, i + 1))
    ),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const activeEnd = toDate || hovered || null;

  const isRangeEdge = (ymd: string) => {
    if (!fromDate || !activeEnd) return false;
    const lo = fromDate <= activeEnd ? fromDate : activeEnd;
    const hi = fromDate <= activeEnd ? activeEnd : fromDate;
    return ymd === lo || ymd === hi;
  };
  const isInRange = (ymd: string) => {
    if (!fromDate || !activeEnd) return false;
    const lo = fromDate <= activeEnd ? fromDate : activeEnd;
    const hi = fromDate <= activeEnd ? activeEnd : fromDate;
    return ymd > lo && ymd < hi;
  };
  const isLoEdge = (ymd: string) => {
    if (!fromDate || !activeEnd) return false;
    return ymd === (fromDate <= activeEnd ? fromDate : activeEnd);
  };
  const isHiEdge = (ymd: string) => {
    if (!fromDate || !activeEnd) return false;
    return ymd === (fromDate <= activeEnd ? activeEnd : fromDate);
  };

  const fmt = (ymd: string) => {
    if (!ymd) return "—";
    const [y, m, d] = ymd.split("-");
    return `${MONTHS[parseInt(m) - 1].slice(0, 3)} ${parseInt(d)}, ${y}`;
  };

  return (
    // FIX 1: Changed left-0 → right-0 so the calendar never overflows off the right edge
    <div
      className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-[#E0E6EB]"
      style={{ width: 320 }}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={15} className="text-[#29343D]" />
        </button>
        <span className="text-sm font-bold text-[#0A2540]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={15} className="text-[#29343D]" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 px-4 pb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 px-4 pb-3">
        {cells.map((ymd, idx) => {
          if (!ymd) return <div key={`empty-${idx}`} style={{ height: 36 }} />;

          const edge = isRangeEdge(ymd);
          const inRange = isInRange(ymd);
          const loEdge = isLoEdge(ymd);
          const hiEdge = isHiEdge(ymd);
          const singleSelected = fromDate === ymd && !activeEnd;

          return (
            <div
              key={ymd}
              onClick={() => handleDayClick(ymd)}
              onMouseEnter={() => { if (fromDate && !toDate) setHovered(ymd); }}
              onMouseLeave={() => setHovered(null)}
              className="relative flex items-center justify-center cursor-pointer"
              style={{ height: 36 }}
            >
              {inRange && <div className="absolute inset-0 bg-[#635BFF]/10" />}
              {loEdge && activeEnd && fromDate !== activeEnd && (
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#635BFF]/10" />
              )}
              {hiEdge && activeEnd && fromDate !== activeEnd && (
                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#635BFF]/10" />
              )}
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-semibold transition-all select-none
                                    ${edge || singleSelected
                    ? "bg-[#635BFF] text-white"
                    : inRange
                      ? "text-[#635BFF]"
                      : "text-[#29343D] hover:bg-gray-100"
                  }`}
              >
                {parseInt(ymd.split("-")[2])}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected range summary */}
      {(fromDate || toDate) && (
        <div className="mx-4 mb-3 flex items-center gap-2 px-3 py-2.5 bg-[#F4F4FF] rounded-xl">
          <div className="flex-1 text-center">
            <p className="text-[9px] font-bold text-[#635BFF] uppercase tracking-wider mb-0.5">From</p>
            <p className="text-[11px] font-semibold text-[#0A2540]">{fmt(fromDate)}</p>
          </div>
          <ChevronRight size={12} className="text-[#635BFF] shrink-0" />
          <div className="flex-1 text-center">
            <p className="text-[9px] font-bold text-[#635BFF] uppercase tracking-wider mb-0.5">To</p>
            <p className="text-[11px] font-semibold text-[#0A2540]">{fmt(toDate)}</p>
          </div>
        </div>
      )}

      {/* FIX 2: Replaced flex-[2] with w-full split using explicit widths */}
      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={onClear}
          style={{ width: "35%" }}
          className="py-2.5 text-sm font-bold text-[#FF6692] border border-[#FFD0DD] rounded-xl hover:bg-[#FFF0F4] transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onDone}
          style={{ width: "65%" }}
          className="py-2.5 text-sm font-bold text-white bg-[#635BFF] rounded-xl hover:opacity-90 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ── Table Row Component ──────────────────────────────────────────────
export type TableAction = "view" | "edit" | "add" | "delete" | "download";

interface MediaTableRowProps {
  session: MediaSession;
  isSelected: boolean;
  onToggleSelect: () => void;
  onAction: (action: TableAction, session: MediaSession) => void;
  selectedMediaItems: string[];
  onToggleMediaItem: (itemId: string) => void;
}

function MediaTableRow({ session, isSelected, onToggleSelect, onAction, selectedMediaItems, onToggleMediaItem }: MediaTableRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuCoords, setMenuCoords] = useState<{ x: number, y: number } | null>(null);
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        (!dropdownRef.current || !dropdownRef.current.contains(e.target as Node))
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleMenuClick = (e: React.MouseEvent) => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuCoords({ x: rect.right, y: rect.bottom });
      setMenuOpen(true);
    }
  };

  return (
    <>
      <tr className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors bg-white">
        <td className="pl-6 pr-2 py-4">
          <Checkbox checked={isSelected} onChange={onToggleSelect} />
        </td>
        <td className="px-2 py-4 text-gray-400">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </td>
        <td className="px-4 py-4 text-[13px] font-medium text-[#94A3B8]">
          {session.id}
        </td>
        <td className="px-4 py-4 text-[13px] font-semibold text-[#1E293B]">
          {session.date}
        </td>
        <td className="px-4 py-4">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#1E293B]">{session.clientName}</span>
            <span className="text-[11px] text-[#94A3B8]">{session.clientSubtext}</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {session.services.map((service, idx) => (
              <span key={idx} className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium text-indigo-500 bg-indigo-50">
                {service}
              </span>
            ))}
          </div>
        </td>
        <td className="px-4 py-4 text-[13px] font-medium text-[#64748B]">
          {session.managedBy}
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-2 text-[#64748B]">
            <Folder size={14} />
            <span className="text-[13px] font-medium">{session.items.length}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-1 relative" ref={menuRef}>
            <button
              onClick={() => onAction('download', session)}
              className="p-2 text-gray-400 hover:text-[#635BFF] transition-colors rounded-lg hover:bg-indigo-50"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleMenuClick}
              className="p-2 text-gray-400 hover:text-[#635BFF] transition-colors rounded-lg hover:bg-indigo-50"
            >
              <MoreVertical size={18} />
            </button>

            {menuOpen && menuCoords && typeof window !== 'undefined' && createPortal(
              <div
                ref={dropdownRef}
                className="fixed z-[100] w-[160px] bg-white rounded-xl border border-gray-100 py-2 font-manrope shadow-lg"
                style={{ top: menuCoords.y + 4, left: menuCoords.x - 160 }}
              >
                <button onClick={() => { onAction('view', session); setMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-[#4B5563] hover:bg-gray-50 transition-colors">
                  <Eye size={16} className="text-[#9CA3AF]" />
                  View Details
                </button>
                <button onClick={() => { onAction('edit', session); setMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-[#4B5563] hover:bg-gray-50 transition-colors">
                  <Edit2 size={16} className="text-[#9CA3AF]" />
                  Edit
                </button>
                <button onClick={() => { onAction('add', session); setMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-[#4B5563] hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-[#9CA3AF]" />
                  Add Files
                </button>
                <button
                  onClick={() => { onAction('delete', session); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-[13px] text-[#F43F5E] hover:bg-[#FFF1F2] transition-colors"
                >
                  <Trash2 size={16} className="text-[#F43F5E]" />
                  Delete
                </button>
              </div>,
              document.body
            )}
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <td colSpan={9} className="px-6 py-5">
            <div className="flex flex-wrap gap-4 items-center">
              {session.items.map(item => {
                const isItemSel = selectedMediaItems.includes(item.id);
                return (
                  <div key={item.id} className="relative w-28 h-28 rounded-2xl bg-gray-100 flex flex-col justify-center items-center overflow-hidden group">
                    {item.type === 'video' && (item.src.startsWith('blob:') || item.src.match(/\.(mp4|webm|ogg)$/i)) ? (
                      <video src={`${item.src}#t=0.001`} className="absolute inset-0 w-full h-full object-cover" preload="metadata" muted playsInline />
                    ) : (
                      <Image src={item.src} alt="" fill className="object-cover" />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center z-20">
                      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                        <button onClick={() => setLightboxItem(item)} className="w-8 h-8 rounded-full bg-white text-[#0A2540] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm">
                          <Eye size={16} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => alert("Downloading " + item.fileName)} className="w-8 h-8 rounded-full bg-white text-[#0A2540] flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm">
                          <Download size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    <div
                      onClick={() => onToggleMediaItem(item.id)}
                      className={`absolute top-2 right-2 z-30 w-5 h-5 rounded flex items-center justify-center cursor-pointer shadow-sm border transition-colors ${isItemSel ? "bg-[#635BFF] border-[#635BFF]" : "bg-white border-gray-100"}`}
                    >
                      {isItemSel && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {item.type === 'video' && <Film size={24} className="text-white z-10 drop-shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:opacity-0 transition-opacity" />}
                  </div>
                );
              })}
              <div onClick={() => onAction('add', session)} className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col justify-center items-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors bg-transparent">
                <Plus size={24} strokeWidth={2} className="mb-1 text-gray-300" />
                <span className="text-[12px] font-medium text-gray-400">Add</span>
              </div>
            </div>
          </td>
        </tr>
      )}
      {/* Lightbox Modal for Table Row */}
      {lightboxItem && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-md">
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white flex flex-col items-center gap-1 transition-colors z-50"
          >
            <X size={24} />
            {/* <span className="text-[10px] font-manrope font-semibold">Close [</span> */}
          </button>

          <div className="w-full max-w-5xl h-[80vh] relative flex items-center justify-center">
            {lightboxItem.type === "video" ? (
              lightboxItem.videoUrl && lightboxItem.videoUrl.includes("youtube") ? (
                <iframe
                  src={lightboxItem.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full max-h-[80vh] aspect-video rounded-xl shadow-2xl bg-black border-none"
                />
              ) : (
                <video
                  src={lightboxItem.videoUrl || lightboxItem.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-xl shadow-2xl bg-black"
                />
              )
            ) : (
              <Image
                src={lightboxItem.src}
                alt={lightboxItem.fileName}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                width={1200}
                height={800}
                unoptimized
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────
const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`flex items-center justify-center min-w-[18px] w-[18px] h-[18px] rounded-[5px] transition-all duration-150 cursor-pointer
            ${checked ? "bg-[#635BFF] border-0" : "bg-white border-[1.5px] border-gray-300"}`}
  >
    {checked && (
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────
export default function MediaManagement() {
  const [mediaType] = useState<string>("All Type");
  const [usageFilter] = useState<UsageFilter>("All Media");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sessions, setSessions] = useState<MediaSession[]>(MOCK_SESSIONS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Date range
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Modals
  const [activeModal, setActiveModal] = useState<"clients" | "services" | "upload" | "view" | "delete" | "providers" | null>(null);
  const [selectedSessionForAction, setSelectedSessionForAction] = useState<MediaSession | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState(1);
  const [selectedMediaItems, setSelectedMediaItems] = useState<string[]>([]);

  // Filter selections
  const [selectedClients, setSelectedClients] = useState<string[]>(["Maria Rodriguez", "John Smith"]);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Hair Treatment", "Facial Care"]);
  const [clientSearch, setClientSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  // Upload wizard
  const [wizardClient, setWizardClient] = useState<string | null>(null);
  const [wizardClientSearch, setWizardClientSearch] = useState("");
  const [wizardServices, setWizardServices] = useState<string[]>([]);
  const [wizardProviders, setWizardProviders] = useState<string[]>([]);
  const [wizardProviderSearch, setWizardProviderSearch] = useState("");
  const [wizardNotes, setWizardNotes] = useState("");
  const [wizardFiles, setWizardFiles] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        id: Math.random().toString(36).substr(2, 9),
        fileName: f.name,
        type: f.type.startsWith('video/') ? 'video' as const : 'photo' as const,
        uploadedBy: wizardClient || "Me",
        uploadedAt: new Date().toLocaleString(),
        published: false,
        src: URL.createObjectURL(f)
      }));
      setWizardFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleCompleteUpload = () => {
    if (!wizardClient || wizardFiles.length === 0) return;

    if (editingSessionId) {
      setSessions(prev => prev.map(s => s.id === editingSessionId ? {
        ...s,
        clientName: wizardClient,
        clientSubtext: wizardNotes || "New Session",
        services: wizardServices,
        managedBy: wizardProviders.length > 0 ? wizardProviders.join(", ") : "Current User",
        items: wizardFiles
      } : s));
    } else {
      const newSession: MediaSession = {
        id: Math.random().toString(36).substr(2, 8),
        date: new Date().toLocaleDateString(),
        clientName: wizardClient,
        clientSubtext: wizardNotes || "New Session",
        services: wizardServices,
        managedBy: wizardProviders.length > 0 ? wizardProviders.join(", ") : "Current User",
        items: wizardFiles
      };
      setSessions(prev => [newSession, ...prev]);
    }

    setActiveModal(null);
    setEditingSessionId(null);
  };

  const handleAction = (action: TableAction, session: MediaSession) => {
    if (action === 'download') {
      session.items.forEach(item => {
        const a = document.createElement('a');
        a.href = item.src;
        a.download = item.fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
      return;
    }

    if (action === 'edit' || action === 'add') {
      setWizardClient(session.clientName);
      setWizardServices(session.services);
      setWizardProviders(session.managedBy && session.managedBy !== "Current User" ? session.managedBy.split(", ") : []);
      setWizardNotes(session.clientSubtext);
      setWizardFiles(session.items);
      setEditingSessionId(session.id);
      setUploadStep(action === 'edit' ? 1 : 3);
      setActiveModal("upload");
      return;
    }

    setSelectedSessionForAction(session);
    setActiveModal(action);
  };

  // Close date picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    if (showDatePicker) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showDatePicker]);

  const toggleClient = (client: string) =>
    setSelectedClients(prev => prev.includes(client) ? prev.filter(c => c !== client) : [...prev, client]);

  const toggleService = (service: string) =>
    setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);

  const clearFilters = () => {
    setSelectedClients([]);
    setSelectedServices([]);
    setSearch("");
    setFromDate("");
    setToDate("");
  };

  const filteredClientList = ALL_CLIENTS.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const filteredServiceList = ALL_SERVICES.filter(s =>
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const filtered = sessions.filter((s) => {
    // For now we just filter by search on client name or id
    const matchSearch = search ? (s.clientName.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()) || s.services.some(srv => srv.toLowerCase().includes(search.toLowerCase()))) : true;
    const matchClient = selectedClients.length === 0 || selectedClients.includes(s.clientName);
    const matchService = selectedServices.length === 0 || s.services.some(srv => selectedServices.includes(srv));

    let matchDate = true;
    if (fromDate || toDate) {
      try {
        const sessionDate = new Date(s.date);
        if (!isNaN(sessionDate.getTime())) {
          const ymd = sessionDate.toISOString().split('T')[0];
          if (fromDate && ymd < fromDate) matchDate = false;
          if (toDate && ymd > toDate) matchDate = false;
        }
      } catch (e) { }
    }

    return matchSearch && matchClient && matchService && matchDate;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedClients, selectedServices, fromDate, toDate]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedSessions = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const allSelected = paginatedSessions.length > 0 && paginatedSessions.every((s) => selected.includes(s.id));

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(prev => prev.filter(id => !paginatedSessions.find(s => s.id === id)));
    } else {
      setSelected(prev => Array.from(new Set([...prev, ...paginatedSessions.map(s => s.id)])));
    }
  };

  const handleDelete = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    setSelected(prev => prev.filter(i => i !== id));
  };

  const toggleMediaItem = (itemId: string) => {
    setSelectedMediaItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };

  const handleMassDeletion = () => {
    setSessions(prev => prev.filter(s => !selected.includes(s.id)));
    setSelected([]);
  };

  const dateLabel = fromDate || toDate
    ? `${fromDate || "..."} → ${toDate || "..."}`
    : "Select Date Range";

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      <div className="">

        {/* ── Filter Bar ── */}
        <div className="bg-white rounded-xl">
          <h4 className="px-6 pt-6 pb-3 text-lg font-bold text-[#29343D] font-manrope">
            Media Library
          </h4>

          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 rounded-lg w-full p-3 border border-[#E0E6EB] bg-white">
              <SearchIcon size={18} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID, files, service, date, or description..."
                className="outline-none bg-transparent w-full text-sm font-normal text-[#29343D]"
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between px-6 pb-6 gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full">

              {/* Clients */}
              <button
                onClick={() => { setClientSearch(""); setActiveModal("clients"); }}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white cursor-pointer"
              >
                <Users size={16} className="text-gray-400" /> {selectedClients.length} Clients
              </button>

              {/* Services */}
              <button
                onClick={() => { setServiceSearch(""); setActiveModal("services"); }}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white cursor-pointer"
              >
                <Zap size={16} className="text-gray-400" /> {selectedServices.length} Services
              </button>

              {/* Date Range — relative wrapper so dropdown anchors here */}
              <div className="relative" ref={datePickerRef}>
                <button
                  onClick={() => setShowDatePicker(v => !v)}
                  className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-semibold bg-white transition-colors cursor-pointer
                                        ${showDatePicker || fromDate || toDate
                      ? "border-[#635BFF] text-[#635BFF]"
                      : "border-[#E0E6EB] text-[#29343D]"
                    }`}
                >
                  <Calendar size={16} className="text-[#635BFF]" />
                  {dateLabel}
                </button>

                {showDatePicker && (
                  <CalendarPicker
                    fromDate={fromDate}
                    toDate={toDate}
                    onFromChange={setFromDate}
                    onToChange={setToDate}
                    onDone={() => setShowDatePicker(false)}
                    onClear={() => { setFromDate(""); setToDate(""); }}
                  />
                )}
              </div>

              <button onClick={clearFilters} className="text-[#FF6692] text-sm font-bold border border-[#E0E6EB] px-4 py-2.5 rounded-lg cursor-pointer">
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* ── Upload Button ── */}
        <button
          onClick={() => {
            setUploadStep(1);
            setWizardClient(null);
            setWizardClientSearch("");
            setWizardServices([]);
            setWizardProviders([]);
            setWizardNotes("");
            setWizardFiles([]);
            setEditingSessionId(null);
            setActiveModal("upload");
          }}
          className="flex flex-col items-start gap-4 justify-center rounded-lg w-[180px] p-[20px] bg-[#635BFF] cursor-pointer mb-6 mt-6 shadow-lg shadow-indigo-100 hover:opacity-90 transition-opacity"
        >
          <UploadIcon color="white" />
          <span className="text-start text-white font-manrope font-bold text-lg">Add Media</span>
        </button>

        {/* ── Media Table ── */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b border-[#E2E8F0] gap-4">
            <div
              onClick={toggleSelectAll}
              className="flex items-center gap-2 font-manrope font-semibold text-[13.5px] text-[#635BFF] hover:opacity-75 transition-opacity cursor-pointer"
            >
              <Checkbox checked={allSelected} onChange={toggleSelectAll} />
              {allSelected ? "Unselect All Items" : "Select All Items"}
              {!allSelected && selected.length > 0 && (
                <span className="ml-1 text-[11px] font-medium font-manrope px-2 py-0.5 rounded-full bg-[#EBFAF0] text-[#36C76C]">
                  {selected.length} selected
                </span>
              )}
            </div>

            {selected.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                {/* View Toggle */}
                <div className="flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#635BFF]" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <List size={18} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#635BFF]" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <LayoutGrid size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <button onClick={handleMassDeletion}
                  className="font-manrope font-medium cursor-pointer text-[13px] px-4 py-2 rounded-lg bg-[#FFF1F2] text-[#F43F5E] hover:bg-[#FFE4E6] transition-colors">
                  Mass Deletion
                </button>
                <button
                  onClick={() => alert(`Proceeding to use ${selected.length} sessions and ${selectedMediaItems.length} specific files for publishing!`)}
                  className="font-manrope font-medium cursor-pointer text-[13px] px-4 py-2 rounded-lg bg-[#14B8A6] text-white hover:bg-[#0D9488] transition-colors"
                >
                  Use Media
                </button>
              </div>
            )}

            {/* If no selected, still show view toggle */}
            {selected.length === 0 && (
              <div className="flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#635BFF]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <List size={18} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#635BFF]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <LayoutGrid size={18} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {viewMode === "list" ? (
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                    <th className="w-12 pl-6 pr-2 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">
                      <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                    </th>
                    <th className="px-2 py-4"></th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">ID</th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">Date</th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">Client</th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">Services</th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">Managed By</th>
                    <th className="px-4 py-4 text-[13px] font-semibold text-[#64748B] font-manrope">Files</th>
                    <th className="px-6 py-4 text-[13px] font-semibold text-[#64748B] font-manrope text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSessions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-16 text-center text-sm font-manrope text-gray-400">
                        No media found
                      </td>
                    </tr>
                  ) : (
                    paginatedSessions.map((session) => (
                      <MediaTableRow
                        key={session.id}
                        session={session}
                        isSelected={selected.includes(session.id)}
                        onToggleSelect={() => toggleSelect(session.id)}
                        onAction={handleAction}
                        selectedMediaItems={selectedMediaItems}
                        onToggleMediaItem={toggleMediaItem}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="min-h-[350px] p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedSessions.flatMap(s => s.items).length === 0 ? (
                <div className="col-span-full py-16 text-center text-sm font-manrope text-gray-400">
                  No media found
                </div>
              ) : (
                paginatedSessions.flatMap(s => s.items).map(item => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    selected={selectedMediaItems.includes(item.id)}
                    onSelect={() => toggleMediaItem(item.id)}
                    onDelete={() => alert("Delete media item")}
                  />
                ))
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 border-t border-[#E2E8F0] bg-white gap-4">
              <span className="text-[13px] font-medium text-gray-500 font-manrope text-center sm:text-left">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-[13px] font-bold flex items-center justify-center transition-colors ${currentPage === i + 1 ? "bg-[#635BFF] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}

      {/* Clients Modal */}
      {activeModal === "clients" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
            <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Client</h3>
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {filteredClientList.map((client, i) => (
                <div
                  key={i}
                  onClick={() => toggleClient(client.name)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors
                                        ${selectedClients.includes(client.name) ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-[#635BFF] flex items-center justify-center font-bold text-sm">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0A2540]">{client.name}</p>
                      <p className="text-xs text-gray-400">{client.email}</p>
                    </div>
                  </div>
                  <Checkbox checked={selectedClients.includes(client.name)} onChange={() => toggleClient(client.name)} />
                </div>
              ))}
              {filteredClientList.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-6">No clients found</p>
              )}
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
          </div>
        </div>
      )}

      {/* Services Modal */}
      {activeModal === "services" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
            <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Services</h3>
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {filteredServiceList.map((name, i) => (
                <div
                  key={i}
                  onClick={() => toggleService(name)}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors
                                        ${selectedServices.includes(name) ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                >
                  <Checkbox checked={selectedServices.includes(name)} onChange={() => toggleService(name)} />
                  <div>
                    <p className="text-sm font-bold text-[#0A2540]">{name}</p>
                    <p className="text-xs text-gray-400">Beauty</p>
                  </div>
                </div>
              ))}
              {filteredServiceList.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-6">No services found</p>
              )}
            </div>
            <div className="mt-4 p-3 bg-indigo-50 text-[#635BFF] font-bold text-sm text-center rounded-xl">
              {selectedServices.length} services selected
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
          </div>
        </div>
      )}

      {/* Upload Wizard */}
      {activeModal === "upload" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-8">Add Media Upload</h3>

            {/* Step indicators */}
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center w-full max-w-xs">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 1 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>1</div>
                <div className={`flex-1 h-1 transition-all ${uploadStep >= 2 ? "bg-[#635BFF]" : "bg-gray-100"}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 2 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>2</div>
                <div className={`flex-1 h-1 transition-all ${uploadStep >= 3 ? "bg-[#635BFF]" : "bg-gray-100"}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 3 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>3</div>
              </div>
            </div>

            <div className="min-h-[300px]">
              {uploadStep === 1 && (
                <div className="space-y-4">
                  <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center mb-6">Step 1: Select Client</p>
                  <div className="relative mb-6">
                    <SearchIcon className="absolute left-3 top-5 text-gray-300" size={18} />
                    <input type="text" placeholder="Search by name or email..."
                      value={wizardClientSearch}
                      onChange={(e) => setWizardClientSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border border-[#E0E6EB] rounded-xl outline-none" />
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {ALL_CLIENTS.filter(c => c.name.toLowerCase().includes(wizardClientSearch.toLowerCase()) || c.email.toLowerCase().includes(wizardClientSearch.toLowerCase())).map((client, i) => (
                      <div
                        key={i}
                        onClick={() => setWizardClient(client.name)}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors
                                                    ${wizardClient === client.name ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 text-[#635BFF] flex items-center justify-center font-bold text-lg">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-[#0A2540]">{client.name}</p>
                          <p className="text-xs text-gray-400">{client.email}</p>
                        </div>
                      </div>
                    ))}
                    {ALL_CLIENTS.filter(c => c.name.toLowerCase().includes(wizardClientSearch.toLowerCase()) || c.email.toLowerCase().includes(wizardClientSearch.toLowerCase())).length === 0 && (
                      <p className="text-center text-sm text-gray-400 py-6">No clients found</p>
                    )}
                  </div>
                </div>
              )}

              {uploadStep === 2 && (
                <div className="space-y-6">
                  <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center">Step 2: Services & Details</p>
                  <div>
                    <label className="text-sm font-bold text-[#0A2540] flex items-center gap-2 mb-2">
                      <Zap size={16} className="text-[#635BFF]" />
                      Services Provided
                    </label>
                    <select
                      value=""
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && !wizardServices.includes(val))
                          setWizardServices(prev => [...prev, val]);
                      }}
                      className="w-full p-4 border border-[#E0E6EB] rounded-xl outline-none bg-white text-gray-400"
                    >
                      <option value="" disabled>Select services...</option>
                      {ALL_SERVICES.filter(s => !wizardServices.includes(s)).map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                    {wizardServices.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {wizardServices.map(s => (
                          <span key={s} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-indigo-50 text-[#635BFF] rounded-full">
                            {s}
                            <button onClick={() => setWizardServices(prev => prev.filter(n => n !== s))}><X size={11} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0A2540] flex items-center gap-2 mb-2">
                      <Users size={16} className="text-[#635BFF]" />
                      Service Providers
                    </label>
                    <div
                      onClick={() => setActiveModal("providers")}
                      className="w-full p-4 border border-[#E0E6EB] rounded-xl cursor-pointer bg-white flex items-center gap-3 text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Users size={18} className="text-[#635BFF]" />
                      <span className={wizardProviders.length > 0 ? "text-[#0A2540] font-bold text-sm" : "text-sm"}>
                        {wizardProviders.length > 0 ? wizardProviders.join(", ") : "Select employees..."}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0A2540] flex items-center gap-2 mb-2">
                      <Edit2 size={16} className="text-gray-400" />
                      Additional Information <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={wizardNotes}
                      onChange={(e) => setWizardNotes(e.target.value)}
                      className="w-full p-4 border border-[#E0E6EB] rounded-xl h-32 outline-none"
                      placeholder="Add required notes about this media set..."
                    />
                    {!wizardNotes && (
                      <p className="text-red-500 text-xs mt-2">This field is required</p>
                    )}
                  </div>
                </div>
              )}

              {uploadStep === 3 && (
                <div className="space-y-6">
                  <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center">Step 3: Upload Media</p>

                  {wizardFiles.length === 0 ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-indigo-100 rounded-3xl p-12 bg-indigo-50/20 cursor-pointer hover:bg-indigo-50 transition-colors text-center"
                    >
                      <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} />
                      <UploadIcon className="mx-auto text-[#635BFF] mb-4" size={40} />
                      <h4 className="text-lg font-bold text-[#0A2540] mb-2">Drop your magic here ✨</h4>
                      <p className="text-sm text-gray-400 mb-8">Drag and drop images or videos</p>
                      <button className="px-8 py-4 bg-[#635BFF] text-white font-bold rounded-2xl shadow-lg pointer-events-none">Choose Files</button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-[#0A2540]">{wizardFiles.length} files selected</h4>
                        <button onClick={() => fileInputRef.current?.click()} className="text-sm text-[#635BFF] font-bold hover:underline">
                          Add more
                        </button>
                        <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
                        {wizardFiles.map(file => (
                          <div key={file.id} className="relative aspect-square rounded-xl bg-gray-100 overflow-hidden group border border-gray-200">
                            {file.type === 'video' && (file.src.startsWith('blob:') || file.src.match(/\.(mp4|webm|ogg)$/i)) ? (
                              <video src={`${file.src}#t=0.001`} className="absolute inset-0 w-full h-full object-cover" preload="metadata" muted playsInline />
                            ) : (
                              <Image src={file.src} alt={file.fileName || "Media"} fill className="object-cover" />
                            )}
                            {file.type === 'video' && <Film size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 drop-shadow-md" />}
                            <button
                              onClick={() => setWizardFiles(prev => prev.filter(f => f.id !== file.id))}
                              className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow hover:text-red-500 hover:bg-red-50 transition-all z-20"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FIX 3: Replaced flex-[2] with explicit style widths so buttons never get cut off */}
            <div className="flex gap-4 mt-10 w-full">
              {uploadStep > 1 && (
                <button
                  onClick={() => setUploadStep(prev => prev - 1)}
                  style={{ width: "35%" }}
                  className="py-4 border border-gray-200 rounded-xl font-bold text-[#0A2540] hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (uploadStep === 3) {
                    handleCompleteUpload();
                  } else {
                    if (uploadStep === 1 && !wizardClient) return;
                    if (uploadStep === 2 && !wizardNotes) return;
                    setUploadStep(prev => prev + 1);
                  }
                }}
                disabled={(uploadStep === 1 && !wizardClient) || (uploadStep === 2 && !wizardNotes) || (uploadStep === 3 && wizardFiles.length === 0)}
                style={{ width: uploadStep > 1 ? "65%" : "100%" }}
                className="py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadStep === 3 ? "Complete" : "Next"}
                {uploadStep < 3 && <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {activeModal === "view" && selectedSessionForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-8">Session Details</h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
                  <p className="text-lg font-bold text-[#0A2540]">{selectedSessionForAction.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-lg font-bold text-[#0A2540]">{selectedSessionForAction.date}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#0A2540] mb-3">Services Provided</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedSessionForAction.services.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-indigo-50 text-[#635BFF] rounded-full text-xs font-bold">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#0A2540] mb-3">Notes & Details</p>
                <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedSessionForAction.clientSubtext}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-[#0A2540] mb-3">Media Files ({selectedSessionForAction.items.length})</p>
                <div className="grid grid-cols-4 gap-4 max-h-60 overflow-y-auto">
                  {selectedSessionForAction.items.map(file => (
                    <div key={file.id} className="relative aspect-square rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      {file.type === 'video' && (file.src.startsWith('blob:') || file.src.match(/\.(mp4|webm|ogg)$/i)) ? (
                        <video src={file.src} className="absolute inset-0 w-full h-full object-cover" preload="metadata" muted playsInline />
                      ) : (
                        <Image src={file.src} alt={file.fileName} fill className="object-cover" />
                      )}
                      {file.type === 'video' && <Film size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 drop-shadow-md" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setActiveModal(null)} className="w-full mt-8 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity">Close Details</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {activeModal === "delete" && selectedSessionForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">Delete Session?</h3>
            <p className="text-sm text-gray-500 mb-8 px-4">
              Are you sure you want to delete this media session for <span className="font-bold text-[#0A2540]">{selectedSessionForAction.clientName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3.5 border border-gray-200 rounded-xl font-bold text-[#0A2540] hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => {
                handleDelete(selectedSessionForAction.id);
                setActiveModal(null);
                setSelectedSessionForAction(null);
              }} className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Providers Modal */}
      {activeModal === "providers" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setActiveModal("upload")} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h3 className="text-xl font-bold text-[#635BFF] flex items-center gap-2 mb-6">
              <Users size={20} />
              Select Service Providers
            </h3>
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-3.5 text-indigo-300" size={18} />
              <input type="text" placeholder="Search employees..."
                value={wizardProviderSearch}
                onChange={(e) => setWizardProviderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-indigo-100 rounded-xl outline-none text-sm text-[#0A2540]" />
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {ALL_PROVIDERS.filter(p => p.name.toLowerCase().includes(wizardProviderSearch.toLowerCase())).map((provider, i) => {
                const isSelected = wizardProviders.includes(provider.name);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (isSelected) setWizardProviders(prev => prev.filter(n => n !== provider.name));
                      else setWizardProviders(prev => [...prev, provider.name]);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all
                                ${isSelected ? "border-[#635BFF]" : "border-gray-100 hover:border-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        {provider.image ? (
                          <Image src={provider.image} alt={provider.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-[#635BFF] font-bold text-lg">
                            {provider.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <p className="font-bold text-[#0A2540]">{provider.name}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-[#635BFF] rounded text-white flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveModal("upload")} className="w-full mt-6 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
              ✓ Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}