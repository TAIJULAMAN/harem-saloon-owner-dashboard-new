"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, Home, Play, Volume2, Maximize, MoreVertical,
  FileText, Eye, Download, UploadCloud, Trash2, X, Check,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon
} from "lucide-react";

const mockImportedData = Array.from({ length: 10 }).map((_, i) => ({
  id: `#00${i + 1}`,
  name: "Haircut",
  description: "Lorem ipsu...",
  default_duration: "45 min",
  price: "€ 270",
  vat: "€ 70",
  category: "Category 1",
  post_break_min: "45 min",
}));

export default function ImportServicesPage() {
  const router = useRouter();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === mockImportedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockImportedData.map(d => d.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleUploadMock = () => {
    setIsFileUploaded(true);
  };

  const handleRemoveFile = () => {
    setIsFileUploaded(false);
    setSelectedIds([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white px-8 py-4 flex items-center justify-between top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/services')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          Import Services
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Home className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Services</span>
        </div>
      </div>

      <div className="py-6 w-full space-y-6">
        <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">

          {/* Video Placeholder */}
          <div className="w-full rounded-[16px] overflow-hidden relative mb-10 shadow-inner group cursor-pointer bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#A18CD1]">

            {/* Video Player */}
            <div className="w-full h-[240px] rounded-lg overflow-hidden relative shadow-sm bg-black">
              <video
                className="w-full h-full object-cover outline-none"
                controls
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Templates Section */}
          <div className="mb-10">
            <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template Card 1 */}
              <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-[#CBD5E1]">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-[#635BFF]" />
                </div>
                <h4 className="text-[13px] font-bold text-[#1E293B]">CSV Template</h4>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-1 mb-4">CSV • 100 KB</p>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"><Eye className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"><Download className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Template Card 2 */}
              <div className="border border-[#E2E8F0] rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-[#CBD5E1]">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-[#635BFF]" />
                </div>
                <h4 className="text-[13px] font-bold text-[#1E293B]">Filled CSV Example</h4>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-1 mb-4">CSV • 100 KB</p>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"><Eye className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"><Download className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Import File Section */}
          <div>
            <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Import File</h3>

            <div
              onClick={handleUploadMock}
              className="border border-dashed border-[#A5B4FC] bg-[#F8FAFC] rounded-lg py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#EEF2FF] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#E0E7FF] flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6 text-[#635BFF]" />
              </div>
              <p className="text-[13px] font-semibold text-[#635BFF]">Drop here or click to browse</p>
            </div>

            {/* Uploaded File Item */}
            {isFileUploaded && (
              <div className="mt-4 border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#635BFF]" />
                  <div>
                    <h4 className="text-[13px] font-bold text-[#635BFF]">originalname.csv</h4>
                    <p className="text-[11px] font-medium text-[#94A3B8]">4.2 MB</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 text-[#F43F5E] hover:bg-[#FFE4E6] rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        {isFileUploaded && (
          <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-[16px] font-bold text-[#1E293B]">Imported List</h2>

              <div className="flex items-center gap-3 h-10">
                {selectedIds.length > 0 && (
                  <>
                    <button className="bg-[#FCE7F3] text-[#EC4899] hover:bg-[#FBCFE8] px-4 py-2 rounded-lg font-bold text-[13px] transition-colors whitespace-nowrap">
                      Mass Rejection
                    </button>
                    <button className="bg-[#10B981] text-white hover:bg-[#059669] px-4 py-2 rounded-lg font-bold text-[13px] transition-colors whitespace-nowrap">
                      Mass approval
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#E2E8F0] rounded-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                      <th className="px-4 py-4 w-12 border-r border-[#E2E8F0]">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
                          checked={selectedIds.length === mockImportedData.length && mockImportedData.length > 0}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">id</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">name</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">description</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">default_duration</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">price</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">vat</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">category</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] border-r border-[#E2E8F0]">post_break_min</th>
                      <th className="px-4 py-4 text-[12px] font-bold text-[#1E293B] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockImportedData.map((row) => (
                      <tr key={row.id} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-4 py-4 border-r border-[#E2E8F0]">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
                            checked={selectedIds.includes(row.id)}
                            onChange={() => toggleSelect(row.id)}
                          />
                        </td>
                        <td className="px-4 py-4 text-[12px] font-bold text-[#635BFF] border-r border-[#E2E8F0]">{row.id}</td>
                        <td className="px-4 py-4 text-[12px] font-semibold text-[#1E293B] border-r border-[#E2E8F0]">{row.name}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0] truncate max-w-[120px]">{row.description}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0]">{row.default_duration}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0]">{row.price}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0]">{row.vat}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0]">{row.category}</td>
                        <td className="px-4 py-4 text-[12px] font-medium text-[#64748B] border-r border-[#E2E8F0]">{row.post_break_min}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-7 h-7 rounded bg-[#FCE7F3] text-[#EC4899] hover:bg-[#FBCFE8] flex items-center justify-center transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-7 h-7 rounded bg-[#ECFDF5] text-[#10B981] hover:bg-[#D1FAE5] flex items-center justify-center transition-colors">
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white border-t border-[#E2E8F0] px-4 py-3 flex items-center justify-end gap-6 text-[12px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span>Items per page:</span>
                  <select className="border border-[#E2E8F0] rounded p-1 outline-none">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
                <span>1-10 of 10</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:text-[#1E293B] disabled:opacity-50"><ChevronLeftIcon className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-[#1E293B] disabled:opacity-50"><ChevronRightIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => router.push('/dashboard/services')}
                className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
