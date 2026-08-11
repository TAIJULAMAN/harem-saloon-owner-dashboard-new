"use client";

import React, { useState } from "react";
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
  X,
  Check,
  ChevronRight,
  Trash2
} from "lucide-react";

import Pagination from "@/components/saloonOwner/common/Pagination";

export default function ImportMembersPage() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Mock Data
  const importedData = Array.from({ length: 19 }).map((_, i) => ({
    id: `#00${i + 1}`,
    name: "Maria Rodriguez",
    email: "maria@beautywellness.com",
    role: "Staff",
    active: i === 0 ? "Inactive" : "Active",
    calendar_color: ["Purple", "Red", "Turquoise", "Green", "Blue", "Yellow", "Black", "Medium Gray", "Light Gray"][i % 9],
    enabled_services: "Hair Cut"
  }));

  const currentData = importedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleAll = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map(d => d.id));
    }
  };

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between top-0 z-10 border-b border-[#E2E8F0] shadow-sm">
        <Link
          href="/dashboard/team/members"
          className="flex items-center gap-2 text-[14px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          Import Members
        </Link>

        <div className="flex items-center gap-2 text-[12px] font-bold text-[#64748B]">
          <Link href="/dashboard" className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <span className="text-[#CBD5E1]">/</span>
          <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-1 rounded-lg">Members</span>
        </div>
      </div>

      <div className="py-6 w-full space-y-6 px-4 pb-24">
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

        {/* Templates Section */}
        <div className="space-y-4">
          <h3 className="text-[14px] font-bold text-[#1E293B] px-2">Templates</h3>
          <div className="flex flex-col sm:flex-row gap-4">

            {/* CSV Template Card */}
            <div className="flex-1 bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#635BFF] mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-bold text-[#1E293B]">CSV Template</h4>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">CSV • 100 KB</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] text-[#64748B] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* CSV Template Card */}
            <div className="flex-1 bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#635BFF] mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-bold text-[#1E293B]">CSV Template</h4>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">CSV • 100 KB</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] text-[#64748B] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filled CSV Example Card */}
            <div className="flex-1 bg-white rounded-lg border border-[#E2E8F0] shadow-sm p-6 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#635BFF] mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-[13px] font-bold text-[#1E293B]">Filled CSV Example</h4>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">CSV • 150 KB</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center hover:bg-[#E0E7FF] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#F8FAFC] text-[#64748B] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Import File Section */}
        <div className="space-y-4">
          <h3 className="text-[14px] font-bold text-[#1E293B] px-2">Import File</h3>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-[#E2E8F0] space-y-4">
            {/* Dropzone */}
            <div
              onClick={() => setIsUploaded(true)}
              className="border-2 border-dashed border-[#C7D2FE] rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#635BFF]">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-[13px] font-bold text-[#635BFF]">
                Drop here or click to browse
              </p>
            </div>

            {/* Uploaded File Item */}
            {isUploaded && (
              <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#635BFF]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#635BFF]">originalname.csv</h4>
                    <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">4.2 MB</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploaded(false)}
                  className="p-2 text-[#FCA5A5] hover:bg-[#FFF1F2] rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Imported List Section (Visible only when file is uploaded) */}
        {isUploaded && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[14px] font-bold text-[#1E293B]">Imported List</h3>
              <div className="flex items-center gap-2">
                <button className="bg-[#FFF1F2] text-[#F43F5E] px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-[#FFE4E6] transition-colors">
                  Mass Proposal
                </button>
                <button className="bg-[#CCFBF1] text-[#0D9488] px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-[#99F6E4] transition-colors">
                  Mass Approval
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#F8F9FE] border-b border-[#E2E8F0]">
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === currentData.length}
                            onChange={toggleAll}
                            className="w-4 h-4 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
                          />
                          id
                        </div>
                      </th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">name</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">email</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">role</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">active</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">calendar_color</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B]">enabled_services</th>
                      <th className="px-6 py-5 text-[12px] font-bold text-[#1E293B] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((row, index) => (
                      <tr key={index} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(row.id)}
                              onChange={() => toggleRow(row.id)}
                              className="w-4 h-4 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
                            />
                            <span className="text-[13px] font-bold text-[#635BFF]">{row.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B] max-w-[120px] truncate">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 text-[12px] font-medium text-[#64748B]">
                          {row.email}
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium text-[#475569]">
                          {row.role}
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium text-[#475569]">
                          {row.active}
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium text-[#475569]">
                          {row.calendar_color}
                        </td>
                        <td className="px-6 py-4 text-[13px] font-medium text-[#475569]">
                          {row.enabled_services}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 rounded-lg bg-[#FFF1F2] text-[#FCA5A5] flex items-center justify-center hover:bg-[#FFE4E6] hover:text-[#F43F5E] transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#86EFAC] flex items-center justify-center hover:bg-[#DCFCE7] hover:text-[#22C55E] transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer with Pagination */}
              <div className="p-4 border-t border-[#E2E8F0]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(importedData.length / itemsPerPage)}
                  totalItems={importedData.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-2.5 rounded-lg font-bold text-[13px] transition-colors">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
