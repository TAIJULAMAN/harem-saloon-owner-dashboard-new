"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  Play,
  Volume2,
  Maximize,
  MoreVertical,
  FileText,
  Eye,
  Download,
  Upload,
  File,
  Trash2,
  X,
  Check
} from "lucide-react";
import Pagination from "@/components/saloonOwner/common/Pagination";

const MOCK_IMPORTED_DATA = [
  { id: "#001", receipt_number: "7891234567895", date: "02/01/2025", client_ref: "#001", total: "€ 270", vat: "€ 70", discount: "€ 10", payment_method: "Cash" },
  { id: "#001", receipt_number: "7891234567895", date: "02/01/2025", client_ref: "#001", total: "€ 270", vat: "€ 70", discount: "€ 10", payment_method: "Credit Card" },
  { id: "#001", receipt_number: "7891234567895", date: "02/01/2025", client_ref: "#001", total: "€ 270", vat: "€ 70", discount: "€ 10", payment_method: "Online Payment" },
  { id: "#001", receipt_number: "7891234567895", date: "02/01/2025", client_ref: "#001", total: "€ 270", vat: "€ 70", discount: "€ 10", payment_method: "Cash" },
  { id: "#001", receipt_number: "7891234567895", date: "02/01/2025", client_ref: "#001", total: "€ 270", vat: "€ 70", discount: "€ 10", payment_method: "Cash" },
];

export default function ImportReceiptsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string>("");
  const [importData, setImportData] = useState(MOCK_IMPORTED_DATA);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + " MB");
      setImportData(MOCK_IMPORTED_DATA); // Load mock data on upload
      setSelectedIndices([]);
      setCurrentPage(1);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + " MB");
      setImportData(MOCK_IMPORTED_DATA);
      setSelectedIndices([]);
      setCurrentPage(1);
    }
  };

  const removeFile = () => {
    setFileName(null);
    setFileSize("");
    setImportData([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleSelectAll = () => {
    if (selectedIndices.length === importData.length) {
      setSelectedIndices([]);
    } else {
      setSelectedIndices(importData.map((_, i) => i));
    }
  };

  const toggleSelect = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const removeRow = (index: number) => {
    setImportData(importData.filter((_, i) => i !== index));
    setSelectedIndices(selectedIndices.filter((i) => i !== index));
  };

  const handleMassAction = () => {
    setImportData(importData.filter((_, i) => !selectedIndices.includes(i)));
    setSelectedIndices([]);
  };

  // Pagination logic
  const totalPages = Math.ceil(importData.length / itemsPerPage) || 1;
  const paginatedData = importData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(prog);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/financial/payments" className="text-[#635BFF] hover:bg-[#EEF2FF] p-1.5 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[14px] font-bold text-[#1E293B] font-manrope">Import Receipts</h1>
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-[#94A3B8]">
          <Home className="w-3.5 h-3.5" />
          <span>/</span>
          <span className="bg-[#EEF2FF] text-[#635BFF] px-2.5 py-1 rounded-lg font-bold">Payments</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 lg:p-8 space-y-8">

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
        <div>
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Templates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-[600px]">
            {/* CSV Template */}
            <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-[#EEF2FF] text-[#635BFF] rounded-full flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-[13px] font-bold text-[#1E293B]">CSV Template</h4>
              <p className="text-[11px] font-medium text-[#94A3B8] mt-1 mb-4">CSV • 100 KB</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] text-[#635BFF] hover:bg-[#EEF2FF] transition-colors border border-[#E2E8F0]">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] transition-colors border border-[#E2E8F0]">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filled CSV Example */}
            <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-[#EEF2FF] text-[#635BFF] rounded-full flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-[13px] font-bold text-[#1E293B]">Filled CSV Example</h4>
              <p className="text-[11px] font-medium text-[#94A3B8] mt-1 mb-4">CSV • 100 KB</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] text-[#635BFF] hover:bg-[#EEF2FF] transition-colors border border-[#E2E8F0]">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#EEF2FF] hover:text-[#635BFF] transition-colors border border-[#E2E8F0]">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Import File Section */}
        <div>
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Import File</h3>

          <div
            className="border border-dashed border-[#A5B4FC] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F8F9FE] transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv,.xlsx,.xls"
            />
            <div className="w-12 h-12 bg-[#EEF2FF] text-[#635BFF] rounded-lg flex items-center justify-center mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</p>
          </div>

          {/* Uploaded File Item */}
          {fileName && (
            <div className="mt-4 border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EEF2FF] text-[#635BFF] rounded-lg flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#635BFF]">{fileName}</div>
                  <div className="text-[11px] font-medium text-[#94A3B8]">{fileSize}</div>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-[#F43F5E] hover:bg-[#FFF1F2] p-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Imported List (Only visible if file uploaded) */}
      {fileName && importData.length > 0 && (
        <div className="bg-[#F8F9FE] rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col">

          <div className="p-4 flex justify-end gap-3 border-b border-[#E2E8F0] bg-white">
            <button
              onClick={handleMassAction}
              disabled={selectedIndices.length === 0}
              className="bg-[#FFF1F2] text-[#F43F5E] px-4 py-2 rounded-lg font-bold text-[12px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100"
            >
              Mass Disapproval
            </button>
            <button
              onClick={handleMassAction}
              disabled={selectedIndices.length === 0}
              className="bg-[#14B8A6] text-white px-4 py-2 rounded-lg font-bold text-[12px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-500"
            >
              Mass Approval
            </button>
          </div>

          <div className="overflow-x-auto min-h-[300px] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded text-[#635BFF] focus:ring-[#635BFF] border-[#CBD5E1]"
                      checked={importData.length > 0 && selectedIndices.length === importData.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">id</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">receipt_number</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">date</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">client_ref</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">total</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">vat</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">discount</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0] whitespace-nowrap font-manrope">payment_method</th>
                  <th className="py-4 px-6 text-[12px] font-bold text-[#1E293B] whitespace-nowrap text-center font-manrope">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {paginatedData.map((item, i) => {
                  const actualIndex = (currentPage - 1) * itemsPerPage + i;
                  return (
                    <tr key={actualIndex} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 border-r border-[#E2E8F0]">
                        <input
                          type="checkbox"
                          className="rounded text-[#635BFF] focus:ring-[#635BFF] border-[#CBD5E1]"
                          checked={selectedIndices.includes(actualIndex)}
                          onChange={() => toggleSelect(actualIndex)}
                        />
                      </td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-bold text-[#635BFF]">{item.id}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569]">{item.receipt_number}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569] whitespace-nowrap">{item.date}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569]">{item.client_ref}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569]">{item.total}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569]">{item.vat}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569]">{item.discount}</td>
                      <td className="py-4 px-6 border-r border-[#E2E8F0] text-[12px] font-medium text-[#475569] whitespace-nowrap">{item.payment_method}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => removeRow(actualIndex)} className="w-7 h-7 flex items-center justify-center bg-[#FFF1F2] text-[#F43F5E] rounded-lg transition-colors hover:bg-red-100">
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => removeRow(actualIndex)} className="w-7 h-7 flex items-center justify-center bg-[#F0FDFA] text-[#14B8A6] rounded-lg transition-colors hover:bg-teal-100">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={importData.length}
              itemsPerPage={itemsPerPage}
              itemName="receipts"
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      {fileName && importData.length > 0 && (
        <div className="flex justify-end pt-2 pb-10">
          <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-3 rounded-lg font-bold text-[14px] transition-colors shadow-sm">
            Save
          </button>
        </div>
      )}
    </div>
  );
}
