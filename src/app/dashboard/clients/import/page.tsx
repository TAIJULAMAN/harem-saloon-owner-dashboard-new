"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Play, Volume2, Maximize, MoreVertical, FileText, Download, Eye, UploadCloud, Trash2, Check, X, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";

export default function ImportClientsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHoveringDropzone, setIsHoveringDropzone] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
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

  // Mock data for imported list
  const mockImportedData = [
    { id: "#001", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "yes", birthDate: "02/01/1990", status: "pending" },
    { id: "#002", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "no", birthDate: "02/01/1990", status: "pending" },
    { id: "#003", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "yes", birthDate: "02/01/1990", status: "pending" },
    { id: "#004", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "no", birthDate: "02/01/1990", status: "pending" },
    { id: "#005", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "no", birthDate: "02/01/1990", status: "pending" },
    { id: "#006", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "yes", birthDate: "02/01/1990", status: "pending" },
    { id: "#007", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "no", birthDate: "02/01/1990", status: "pending" },
    { id: "#008", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "yes", birthDate: "02/01/1990", status: "pending" },
    { id: "#009", firstName: "Maria", lastName: "Rodriguez", phone: "+39 345 678 9123", email: "email@email.com", consent: "no", birthDate: "02/01/1990", status: "pending" },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === mockImportedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockImportedData.map(r => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Simulated file upload handler
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

  // Mock function to "browse" for a file
  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };


  return (
    <div className="w-full space-y-6 pb-24">

      {/* Header bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/clients"
            className="text-[#64748B] hover:text-[#635BFF] transition-colors p-1 rounded-lg hover:bg-[#EEF2FF]"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Import Clients</h1>
        </div>
        <div className="text-[12px] font-medium text-[#94A3B8] flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          / <span className="bg-[#EEF2FF] text-[#635BFF] px-2 py-1 rounded-lg">Clients</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 space-y-8">

        {/* Video Banner Placeholder */}
        <div className="w-full h-[250px] sm:h-[350px] relative bg-[#F8FAFC] rounded-lg overflow-hidden shadow-sm group">
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="/playerBg.png"
            className="w-full h-full object-cover cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          />
          {/* Bottom Gradient for Controls */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none transition-opacity duration-300"></div>

          {/* Video Controls */}
          <div className={`absolute bottom-4 left-5 right-5 flex flex-col gap-2.5 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <div className="flex items-center justify-between text-white">
              {/* Left Side - Play Button */}
              <button onClick={togglePlay} className="hover:opacity-80 transition-opacity flex items-center justify-center">
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>
                )}
              </button>

              {/* Right Side - Icons */}
              <div className="flex items-center gap-4">
                {/* Volume */}
                <button onClick={toggleMute} className="hover:opacity-80 transition-opacity flex items-center justify-center">
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                  )}
                </button>
                {/* Fullscreen */}
                <button onClick={toggleFullScreen} className="hover:opacity-80 transition-opacity flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>
                {/* More Options */}
                <button className="hover:opacity-80 transition-opacity flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" /></svg>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div onClick={handleProgressClick} className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer mt-0.5 group/progress">
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
              <div className="text-[13px] font-bold text-[#1E293B] mb-1">CSV Template</div>
              <div className="text-[11px] text-[#94A3B8] font-medium mb-4">CSV • 108 KB</div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#635BFF] transition-colors group cursor-pointer shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center text-[#635BFF] mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-[13px] font-bold text-[#1E293B] mb-1">Filled CSV Example</div>
              <div className="text-[11px] text-[#94A3B8] font-medium mb-4">CSV • 199 KB</div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] rounded-lg transition-colors" title="Download">
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
            className={`border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${isHoveringDropzone ? 'border-[#635BFF] bg-[#EEF2FF]' : 'border-[#635BFF]/40 hover:border-[#635BFF] hover:bg-[#F8FAFC]'
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
              accept=".csv"
            />
            <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center text-[#635BFF] mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
            </div>
            <div className="text-[12px] font-medium text-[#635BFF]">Drop here or click to browse</div>
          </div>

          {/* Selected File Card */}
          {selectedFile && (
            <div className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between bg-white animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="text-[#635BFF]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#635BFF]">{selectedFile.name}</div>
                  <div className="text-[11px] font-medium text-[#94A3B8]">{formatFileSize(selectedFile.size)}</div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
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
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-3 animate-in fade-in duration-200">
                <button className="bg-[#FFE4E6] hover:bg-[#FECDD3] text-[#F43F5E] px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors">
                  Mass Reapproval
                </button>
                <button className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors">
                  Mass Approval
                </button>
              </div>
            )}
          </div>

          {/* Interactive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0] w-[5%]">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${selectedRows.length === mockImportedData.length
                        ? "bg-[#635BFF] border-[#635BFF] text-white"
                        : selectedRows.length > 0
                          ? "bg-[#635BFF] border-[#635BFF] text-white"
                          : "bg-white border-[#CBD5E1]"
                        }`}
                    >
                      {selectedRows.length === mockImportedData.length ? (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : selectedRows.length > 0 ? (
                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : null}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">id</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">first_name</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">last_name</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">phone</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">email</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">marketing_consent</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope border-r border-[#E2E8F0]">birth_date</th>
                  <th className="px-6 py-4 text-[13px] font-bold text-[#1E293B] font-manrope text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockImportedData.map((row, index) => (
                  <tr key={index} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-3 border-r border-[#E2E8F0]">
                      <button
                        onClick={() => toggleSelectRow(row.id)}
                        className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${selectedRows.includes(row.id) ? "bg-[#635BFF] border-[#635BFF] text-white" : "bg-white border-[#CBD5E1]"
                          }`}
                      >
                        {selectedRows.includes(row.id) && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-semibold text-[#635BFF]">{row.id}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.firstName}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.lastName}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.phone}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.email}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.consent}</td>
                    <td className="px-6 py-3 border-r border-[#E2E8F0] text-[12px] font-medium text-[#1E293B]">{row.birthDate}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-7 h-7 rounded bg-[#FFE4E6] text-[#F43F5E] flex items-center justify-center hover:bg-[#FECDD3] transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                        <button className="w-7 h-7 rounded bg-[#CCFBF1] text-[#14B8A6] flex items-center justify-center hover:bg-[#99F6E4] transition-colors" title="Approve">
                          <Check className="w-4 h-4 stroke-[3px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
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
            itemName="clients"
            onPageChange={setCurrentPage}
          />

        </div>
      )}

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-3 rounded-lg text-[14px] font-bold shadow-lg shadow-[#635BFF]/30 transition-colors animate-in zoom-in-95 duration-300">
          Save
        </button>
      </div>

    </div>
  );
}
