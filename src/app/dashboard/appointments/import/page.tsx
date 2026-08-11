"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Eye,
  Trash2,
  Check,
  X,
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";
import Modal from "@/components/saloonOwner/common/Modal";

interface ImportedAppointment {
  id: string;
  startAt: string;
  endAt: string;
  clientRef: string;
  serviceRef: string;
  staffRef: string;
  status: string;
  note: string;
}

export default function ImportAppointmentsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHoveringDropzone, setIsHoveringDropzone] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<ImportedAppointment | null>(null);

  // Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(currentProgress) ? 0 : currentProgress);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  // Mock data for imported appointments list
  const mockImportedData = [
    {
      id: "#001",
      startAt: "20/05/2025 10:15",
      endAt: "20/05/2025 12:25",
      clientRef: "#037",
      serviceRef: "#501",
      staffRef: "#031",
      status: "Booked",
      note: "Lorem ipsum...",
    },
    {
      id: "#002",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#022",
      serviceRef: "#501",
      staffRef: "#032",
      status: "Started",
      note: "Lorem ipsum...",
    },
    {
      id: "#003",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#037",
      serviceRef: "#501",
      staffRef: "#031",
      status: "Cancelled",
      note: "Lorem ipsum...",
    },
    {
      id: "#004",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#022",
      serviceRef: "#501",
      staffRef: "#032",
      status: "Confirmed",
      note: "Lorem ipsum...",
    },
    {
      id: "#005",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#037",
      serviceRef: "#501",
      staffRef: "#031",
      status: "Arrived",
      note: "Lorem ipsum...",
    },
    {
      id: "#006",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#022",
      serviceRef: "#501",
      staffRef: "#032",
      status: "Completed",
      note: "Lorem ipsum...",
    },
    {
      id: "#007",
      startAt: "20/05/2025 12:15",
      endAt: "20/05/2025 13:25",
      clientRef: "#037",
      serviceRef: "#501",
      staffRef: "#031",
      status: "Arrived",
      note: "Lorem ipsum...",
    },
    {
      id: "#008",
      startAt: "20/05/2025 12:45",
      endAt: "20/05/2025 13:55",
      clientRef: "#022",
      serviceRef: "#501",
      staffRef: "#032",
      status: "Arrived",
      note: "Lorem ipsum...",
    },
    {
      id: "#009",
      startAt: "20/05/2025 13:15",
      endAt: "20/05/2025 15:25",
      clientRef: "#037",
      serviceRef: "#501",
      staffRef: "#031",
      status: "Cancelled",
      note: "Lorem ipsum...",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === mockImportedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockImportedData.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Drag and Drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDropzone(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDropzone(true);
  };

  const handleDragLeave = () => {
    setIsHoveringDropzone(false);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full space-y-6 pb-24">
      {/* Header bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/appointments"
            className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1 rounded-lg hover:bg-[#EEF2FF]"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">
            Import Appointments
          </h1>
        </div>
        <div className="text-[12px] font-medium text-[#94A3B8] flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          /{" "}
          <span className="bg-[#EEF2FF] text-[#635BFF] px-2 py-1 rounded-lg">
            Appointments
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 space-y-8">
        {/* Video Banner Poster */}
        <div className="w-full h-[250px] sm:h-[350px] relative bg-[#F8FAFC] rounded-lg overflow-hidden shadow-sm group">
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="/banner/banner1.png"
            className="w-full h-full object-cover cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          />
          {/* Bottom Gradient for Controls */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none transition-opacity duration-300"></div>

          {/* Video Controls */}
          <div
            className={`absolute bottom-4 left-5 right-5 flex flex-col gap-2.5 transition-opacity duration-300 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between text-white">
              {/* Left Side - Play Button */}
              <button
                onClick={togglePlay}
                className="hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                )}
              </button>

              {/* Right Side - Icons */}
              <div className="flex items-center gap-4">
                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className="hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  {isMuted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  )}
                </button>
                {/* Fullscreen */}
                <button
                  onClick={toggleFullScreen}
                  className="hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </button>
                {/* More Options */}
                <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              onClick={handleProgressClick}
              className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer mt-0.5 group/progress"
            >
              <div
                className="h-full bg-white rounded-full relative transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="space-y-4">
          <h2 className="text-[14px] font-bold text-[#1E293B]">Templates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#635BFF] transition-colors group cursor-pointer shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#635BFF] mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-1">
                CSV Template
              </div>
              <div className="text-[11px] text-[#94A3B8] font-medium mb-4">
                CSV • 3.2 KB
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#635BFF] transition-colors group cursor-pointer shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#635BFF] mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-1">
                Filled CSV Example
              </div>
              <div className="text-[11px] text-[#94A3B8] font-medium mb-4">
                CSV • 3.2 KB
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Import File Section */}
        <div className="space-y-4">
          <h2 className="text-[14px] font-bold text-[#1E293B]">Import File</h2>

          {/* Dropzone */}
          <div
            className={`border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              isHoveringDropzone
                ? "border-[#635BFF] bg-[#EEF2FF]"
                : "border-[#635BFF]/40 hover:border-[#635BFF] hover:bg-[#F8FAFC]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleBrowse}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.pdf"
            />
            <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#635BFF] mb-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div className="text-[12px] font-medium text-[#635BFF]">
              Drop here or click to browse
            </div>
          </div>

          {/* Selected File Card */}
          {selectedFile && (
            <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between bg-white animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="text-[#635BFF]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#635BFF]">
                    {selectedFile.name}
                  </div>
                  <div className="text-[11px] font-medium text-[#94A3B8]">
                    {formatFileSize(selectedFile.size)}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="text-[#F43F5E] hover:bg-[#FFE4E6] p-1.5 rounded-lg transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Imported List Section (rendered conditionally based on file selection to mimic real workflow) */}
      {selectedFile && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
          {/* Table Header Controls */}
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#1E293B]">Imported List</h2>
            <div className="flex items-center gap-3">
              {selectedRows.length > 0 ? (
                <>
                  <button className="bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#F43F5E] px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors">
                    Mass Reject
                  </button>
                  <button className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors">
                    Mass Approve
                  </button>
                </>
              ) : (
                <>
                  <button className="border border-slate-100 text-slate-350 bg-slate-50/50 cursor-not-allowed px-4 py-1.5 rounded-lg text-[12px] font-medium">
                    Mass Reject
                  </button>
                  <button className="border border-slate-100 text-slate-350 bg-slate-50/50 cursor-not-allowed px-4 py-1.5 rounded-lg text-[12px] font-medium">
                    Mass Approve
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Interactive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[5%]">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${
                        selectedRows.length === mockImportedData.length
                          ? "bg-[#635BFF] border-[#635BFF] text-white"
                          : selectedRows.length > 0
                          ? "bg-[#635BFF] border-[#635BFF] text-white"
                          : "bg-white border-[#CBD5E1]"
                      }`}
                    >
                      {selectedRows.length === mockImportedData.length ? (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : selectedRows.length > 0 ? (
                        <svg
                          width="10"
                          height="2"
                          viewBox="0 0 10 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    id
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    start_at
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    end_at
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    client_ref
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    service_ref
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    staff_ref
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    status
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">
                    note
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockImportedData.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="px-6 py-3 border-r border-[#E2E8F0]">
                        <button
                          onClick={() => toggleSelectRow(row.id)}
                          className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${
                            selectedRows.includes(row.id)
                              ? "bg-[#635BFF] border-[#635BFF] text-white"
                              : "bg-white border-[#CBD5E1]"
                          }`}
                        >
                          {selectedRows.includes(row.id) && (
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-semibold text-[#635BFF]">
                        {row.id}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.startAt}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.endAt}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.clientRef}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.serviceRef}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.staffRef}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.status}
                      </td>
                      <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">
                        {row.note}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="w-7 h-7 rounded bg-[#FFE4E6] text-[#F43F5E] flex items-center justify-center hover:bg-[#FECDD3] transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            className="w-7 h-7 rounded bg-[#CCFBF1] text-[#14B8A6] flex items-center justify-center hover:bg-[#99F6E4] transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4 stroke-[3px]" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRowId(expandedRowId === row.id ? null : row.id);
                            }}
                            className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center text-[#635BFF] transition-colors"
                          >
                            {expandedRowId === row.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedRowId === row.id && (
                      <tr className="bg-[#F8FAFC]/60">
                        <td colSpan={10} className="px-6 py-6 border-b border-[#E2E8F0]">
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
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                  row.status === "Booked" ? "bg-amber-100 text-amber-700" :
                                  row.status === "Started" ? "bg-sky-100 text-sky-700" :
                                  row.status === "Cancelled" ? "bg-rose-100 text-rose-700" :
                                  row.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                                  "bg-indigo-50 text-indigo-600"
                                }`}>
                                  {row.status === "Booked" ? "Overdue" :
                                   row.status === "Started" ? "Doing" :
                                   row.status === "Cancelled" ? "Canceled" :
                                   row.status === "Completed" ? "Completed" : "To Do"}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                  row.status === "Booked" ? "border-amber-500 text-amber-600" :
                                  row.status === "Started" ? "border-sky-500 text-sky-600" :
                                  row.status === "Cancelled" ? "border-rose-500 text-rose-600" :
                                  row.status === "Completed" ? "border-emerald-500 text-emerald-600" :
                                  "border-indigo-500 text-indigo-600"
                                }`}>
                                  {row.status === "Cancelled" ? <X className="w-4 h-4 stroke-[3px]" /> :
                                   row.status === "Completed" ? <Check className="w-4 h-4 stroke-[3px]" /> : "1"}
                                </div>
                                <div className="text-center">
                                  <div className="text-[11px] font-extrabold text-[#1E293B]">12:00-12:05</div>
                                  <div className="text-[10px] font-bold text-[#475569]">Haircut</div>
                                  <div className="text-[10px] font-medium text-slate-400">Angelica</div>
                                </div>
                              </div>

                              {/* Step 2 */}
                              <div className="flex flex-col items-center z-10 space-y-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                  row.status === "Cancelled" ? "bg-rose-100 text-rose-700" :
                                  row.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                                  "bg-slate-100 text-slate-500"
                                }`}>
                                  {row.status === "Cancelled" ? "Canceled" :
                                   row.status === "Completed" ? "Completed" : "To Do"}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                  row.status === "Cancelled" ? "border-rose-500 text-rose-600" :
                                  row.status === "Completed" ? "border-emerald-500 text-emerald-600" :
                                  "border-slate-300 text-slate-500"
                                }`}>
                                  {row.status === "Cancelled" ? <X className="w-4 h-4 stroke-[3px]" /> :
                                   row.status === "Completed" ? <Check className="w-4 h-4 stroke-[3px]" /> : "2"}
                                </div>
                                <div className="text-center">
                                  <div className="text-[11px] font-extrabold text-[#1E293B]">12:05-12:10</div>
                                  <div className="text-[10px] font-bold text-[#475569]">Haircut</div>
                                  <div className="text-[10px] font-medium text-slate-400">Angelica</div>
                                </div>
                              </div>

                              {/* Step 3 */}
                              <div className="flex flex-col items-center z-10 space-y-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
                                  row.status === "Cancelled" ? "bg-rose-100 text-rose-700" :
                                  row.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                                  "bg-slate-100 text-slate-500"
                                }`}>
                                  {row.status === "Cancelled" ? "Canceled" :
                                   row.status === "Completed" ? "Completed" : "To Do"}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] border-2 bg-white ${
                                  row.status === "Cancelled" ? "border-rose-500 text-rose-600" :
                                  row.status === "Completed" ? "border-emerald-500 text-emerald-600" :
                                  "border-slate-300 text-slate-500"
                                }`}>
                                  {row.status === "Cancelled" ? <X className="w-4 h-4 stroke-[3px]" /> :
                                   row.status === "Completed" ? <Check className="w-4 h-4 stroke-[3px]" /> : "3"}
                                </div>
                                <div className="text-center">
                                  <div className="text-[11px] font-extrabold text-[#1E293B]">12:10-12:15</div>
                                  <div className="text-[10px] font-bold text-[#475569]">Haircut</div>
                                  <div className="text-[10px] font-medium text-slate-400">Angelica</div>
                                </div>
                              </div>
                            </div>

                            {/* Action Row */}
                            <button
                              onClick={() => {
                                setSelectedRowData(row);
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(mockImportedData.length / 5)}
            totalItems={mockImportedData.length}
            itemsPerPage={5}
            itemName="appointments"
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/dashboard/appointments"
          className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-3 rounded-lg text-[14px] font-bold shadow-lg shadow-[#635BFF]/30 transition-colors animate-in zoom-in-95 duration-300 block text-center"
        >
          Save
        </Link>
      </div>
      {/* Service Receipt Modal */}
      {isReceiptOpen && selectedRowData && (() => {
        const totalVal = 170.00;
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
                    2025-000{selectedRowData.id}
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
                      <span>PIVA: <strong className="text-[#475569]">IT12345678901</strong></span>
                      <span>Tax Code: <strong className="text-[#475569]">12345678901</strong></span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      PEC: <strong className="text-[#475569]">amministrazione@pec.salonflow.it</strong>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Recipient Code: <strong className="text-[#475569]">XXXXXXX</strong>
                    </div>
                    <div className="pt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-400">
                      <span>Tel: <strong className="text-[#475569]">+39 02 1234567</strong></span>
                      <span>Email: <strong className="text-[#475569]">info@salonflow.it</strong></span>
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
                      Amelia Rodriguez (Ref: {selectedRowData.clientRef})
                    </div>
                    <div>Via Esempio, 458</div>
                    <div>10100 Turin (TO) - Italy</div>
                    <div className="pt-1.5 text-[11px] text-slate-400">
                      Tax Code: <strong className="text-[#475569]">RSTGPP90A01L219Y</strong>
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
                        Haircut (Ref: {selectedRowData.serviceRef})
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
                    <div className="text-[#1E293B] font-extrabold mt-1">Credit Card</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Payment Date
                    </div>
                    <div className="text-[#1E293B] font-extrabold mt-1">12/10/2024</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Amount Paid
                    </div>
                    <div className="text-[#1E293B] font-extrabold mt-1">€{totalVal.toFixed(2)}</div>
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
                  <li>Invoice issued pursuant to art. 21 of Presidential Decree 26 October 1972, n. 633 and subsequent amendments.</li>
                  <li>VAT paid by the purchaser pursuant to art. 17, paragraph 5, of Presidential Decree 26 October 1972, n. 633.</li>
                  <li>Digitally signed electronic document pursuant to Legislative Decree 82/2005.</li>
                  <li>Replacement storage of documents pursuant to the Ministerial Decree of 17 June 2014.</li>
                  <li>Competent court: Milan. Applicable law: Italian.</li>
                </ul>
              </div>

              {/* Footer info */}
              <div className="text-center text-[10px] font-semibold text-[#94A3B8] pt-2 border-t border-slate-100">
                SalonFlow Srl - Via Roma, 123 - 20121 Milan (MI) - VAT number IT12345678901 - Share Capital: € 10,000.00 i.v. - REA MI-1234567 - SDI Code: XXXXXXX - www.salonflow.it
              </div>
            </div>
          </Modal>
        );
      })()}
    </div>
  );
}
