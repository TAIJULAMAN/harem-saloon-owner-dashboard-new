"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  ChevronDown,
  Eye,
  Trash2,
  Download,
  X,
  Facebook,
  Instagram,
  RefreshCw,
  FilePlus2
} from "lucide-react";

export default function DocumentationTab() {
  const [activeSubTab, setActiveSubTab] = useState<"Documents" | "Waivers">("Documents");
  const [activeCategory, setActiveCategory] = useState("All");

  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Mock staged file for upload modal demonstration
  const [stagedFile, setStagedFile] = useState<{ name: string, size: string } | null>({ name: "originalname.pdf", size: "4.2 MB" });

  const categories = ["All", "Contract", "Disciplinary", "Fiscal", "Personal", "Other"];

  const documents = [
    { title: "Contract", category: "Contract", badgeColor: "bg-[#E0F2FE] text-[#0EA5E9]", date: "March 15, 2020" },
    { title: "Disciplinary Letter", category: "Disciplinary", badgeColor: "bg-[#FEF9C3] text-[#EAB308]", date: "March 15, 2020" },
    { title: "Fiscal Document", category: "Fiscal", badgeColor: "bg-[#FCE7F3] text-[#F43F5E]", date: "March 15, 2020" },
    { title: "Documentation", category: "Personal", badgeColor: "bg-[#E0E7FF] text-[#635BFF]", date: "March 15, 2020" },
    { title: "Certificate", category: "Other", badgeColor: "bg-[#F1F5F9] text-[#64748B]", date: "March 15, 2020" },
    { title: "Certificate", category: "Other", badgeColor: "bg-[#F1F5F9] text-[#64748B]", date: "March 15, 2020" },
  ];

  // Handlers for modals
  const handleCloseUploadModal = () => {
    if (stagedFile) {
      setIsCancelModalOpen(true);
    } else {
      setIsUploadModalOpen(false);
    }
  };

  const handleConfirmCancel = () => {
    setStagedFile(null);
    setIsCancelModalOpen(false);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 min-h-[600px]">

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-8 border-b border-[#E2E8F0] mb-8">
        <button
          onClick={() => setActiveSubTab("Documents")}
          className={`pb-4 text-[15px] font-bold relative transition-colors ${activeSubTab === "Documents" ? "text-[#635BFF]" : "text-[#64748B] hover:text-[#1E293B]"
            }`}
        >
          Documents
          {activeSubTab === "Documents" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
          )}
        </button>
        <button
          onClick={() => setActiveSubTab("Waivers")}
          className={`pb-4 text-[15px] font-bold relative transition-colors ${activeSubTab === "Waivers" ? "text-[#635BFF]" : "text-[#64748B] hover:text-[#1E293B]"
            }`}
        >
          Waivers
          {activeSubTab === "Waivers" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full"></div>
          )}
        </button>
      </div>

      {/* View Content */}
      {activeSubTab === "Documents" && (
        <div className="space-y-8 animate-in fade-in duration-300">

          {/* Filters Row */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">

            <div className="flex items-center flex-wrap gap-x-2 gap-y-4">
              <span className="text-[12px] font-bold text-[#94A3B8] mr-2 w-full sm:w-auto">Category</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${activeCategory === cat
                    ? "border-[#635BFF] text-[#635BFF] bg-white"
                    : "border-transparent text-[#64748B] hover:bg-[#F8FAFC]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-bold text-[#94A3B8]">Time</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2 text-[13px] font-medium text-[#1E293B] focus:outline-none focus:border-[#635BFF] min-w-[120px]">
                    <option>All</option>
                    <option>Last 30 Days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="relative flex-1 sm:min-w-[250px] self-end">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[13px] focus:outline-none focus:border-[#635BFF]"
                />
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="self-end bg-[#E0E7FF] text-[#635BFF] px-6 py-2 rounded-lg text-[13px] font-bold hover:bg-[#C7D2FE] transition-colors whitespace-nowrap"
              >
                Upload Document
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((doc, idx) => (
              <div key={idx} className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative flex flex-col items-center justify-center text-center">

                {/* Top Right Badge */}
                <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-lg ${doc.badgeColor}`}>
                  {doc.category}
                </span>

                <div className="w-12 h-12 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-[#635BFF] mb-4">
                  <FileText className="w-6 h-6" />
                </div>

                <h3 className="text-[14px] font-bold text-[#1E293B] mb-1">{doc.title}</h3>
                <div className="text-[12px] font-medium text-[#94A3B8] mb-1">PDF • 2.1 MB</div>
                <div className="text-[12px] font-medium text-[#CBD5E1] mb-6">Updated: {doc.date}</div>

                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 rounded-lg bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center hover:bg-[#C7D2FE] transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#FCE7F3] text-[#F43F5E] flex items-center justify-center hover:bg-[#FBCFE8] transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#64748B] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "Waivers" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Toggle Waiver Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center relative z-10 border-2 border-white">
                    <Facebook className="w-4 h-4" fill="currentColor" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center relative border-2 border-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-[14px] font-bold text-[#635BFF]">Marketing consent</span>
              </div>
              <button className="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-lg border-2 border-transparent bg-[#E0E7FF] transition-colors duration-200 ease-in-out focus:outline-none">
                <span className="pointer-events-none inline-block h-[16px] w-[16px] transform rounded bg-[#635BFF] shadow-sm ring-0 transition duration-200 ease-in-out translate-x-[16px]" />
              </button>
            </div>

            {/* Action Pending Waiver Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-bold text-[#635BFF]">Social media posting</span>
              </div>
              <button className="bg-[#CCFBF1] text-[#0D9488] px-4 py-1.5 rounded-lg text-[12px] font-bold hover:bg-[#99F6E4] transition-colors">
                Sign Now
              </button>
            </div>

            {/* Action Signed Waiver Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-bold text-[#635BFF]">Social Media</span>
                <span className="bg-[#DCFCE7] text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-lg ml-2">Signed</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center hover:bg-[#C7D2FE] transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <div className="relative group">
                  <button className="w-8 h-8 rounded-lg bg-[#FEF9C3] text-[#EAB308] flex items-center justify-center hover:bg-[#FEF08A] transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FEFCE8] border border-[#FEF08A] text-[#EAB308] text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Revoke Signature
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- Modals --- */}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseUploadModal}></div>
          <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative z-50 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">

            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#1E293B]">Upload Documents</h2>
              <button onClick={handleCloseUploadModal} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dropzone */}
            <div className="w-full h-[120px] border-2 border-dashed border-[#C7D2FE] bg-[#F8FAFC] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#EEF2FF] transition-colors">
              <div className="w-12 h-12 bg-[#E0E7FF] rounded-lg flex items-center justify-center text-[#635BFF]">
                <FilePlus2 className="w-6 h-6" />
              </div>
              <span className="text-[13px] font-bold text-[#635BFF]">Drop here or click to browse</span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">File Name *</label>
                <input
                  type="text"
                  placeholder="Enter file name"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-[13px] focus:outline-none focus:border-[#635BFF]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#1E293B] mb-2">Type *</label>
                <div className="relative">
                  <select className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2 text-[13px] text-[#94A3B8] appearance-none focus:outline-none focus:border-[#635BFF] cursor-pointer">
                    <option>Contract</option>
                    <option>Disciplinary</option>
                    <option>Fiscal</option>
                    <option>Personal</option>
                    <option>Others</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Uploaded File Preview */}
            {stagedFile && (
              <div className="w-full border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-[#635BFF]">
                    <FilePlus2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#635BFF]">{stagedFile.name}</div>
                    <div className="text-[12px] font-medium text-[#94A3B8]">{stagedFile.size}</div>
                  </div>
                </div>
                <button onClick={() => setStagedFile(null)} className="text-[#F43F5E] hover:bg-[#FCE7F3] p-1.5 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setStagedFile(null); // Mock success save
                }}
                className="bg-[#635BFF] text-white text-[13px] font-bold px-8 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Nested Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCancelModalOpen(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-[450px] p-6 sm:p-8 relative z-[70] shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-[18px] font-bold text-[#1E293B]">Are you sure you want to cancel?</h2>
            <p className="text-[13px] text-[#64748B] mb-4">
              This action is going to delete the document you are trying to upload.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleConfirmCancel}
                className="bg-[#F8FAFC] text-[#1E293B] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="bg-[#635BFF] text-white text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm"
              >
                Keep Uploading
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
