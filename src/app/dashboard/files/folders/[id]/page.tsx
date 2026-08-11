"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Upload,
  MoreVertical,
  Pencil,
  Download,
  Move,
  Users,
  Trash2,
  Share2,
  List,
  LayoutGrid,
  Search,
  ChevronLeft,
  Home,
  ChevronDown,
  Check,
  Minus
} from "lucide-react";
import Modal from "@/components/saloonOwner/common/Modal";

interface FileData {
  id: string;
  name: string;
  type: string;
  size: string;
  createdBy: string;
}

const mockFiles: FileData[] = Array(8).fill(null).map((_, i) => ({
  id: `${i + 1}`,
  name: "August Salary",
  type: "PDF",
  size: "20 MB",
  createdBy: "Maria Rodriguez"
}));

const mockMembers = [
  { id: 1, name: "Maria Rodriguez", email: "maria@beautywellness.com", role: "View Only", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria1&backgroundColor=ffdfbf" },
  { id: 2, name: "Maria Rodriguez", email: "maria@beautywellness.com", role: "Edit Content", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria2&backgroundColor=c0aede" },
];

function getFileBadgeStyle(type: string) {
  return 'bg-[#FCE7F3] text-[#DB2777]';
}

export default function FolderDetailsPage() {
  const params = useParams();
  const folderId = params?.id || "1";

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // Modals state
  const [isManagePermissionOpen, setIsManagePermissionOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest('.action-dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(fileId => fileId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedFiles.length === mockFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mockFiles.map(f => f.id));
    }
  };

  const isAllSelected = selectedFiles.length === mockFiles.length && mockFiles.length > 0;
  const isSomeSelected = selectedFiles.length > 0 && selectedFiles.length < mockFiles.length;

  const openManagePermission = () => {
    setActiveDropdown(null);
    setIsManagePermissionOpen(true);
  };

  const openRename = (name: string) => {
    setSelectedItemName(name);
    setActiveDropdown(null);
    setIsRenameOpen(true);
  };

  const openDownload = (name: string) => {
    setSelectedItemName(name);
    setActiveDropdown(null);
    setIsDownloadOpen(true);
  };

  const openDelete = (name: string) => {
    setSelectedItemName(name);
    setActiveDropdown(null);
    setIsDeleteOpen(true);
  };

  const openMove = (name: string) => {
    setSelectedItemName(name);
    setActiveDropdown(null);
    setIsMoveOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      {/* Header bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 sm:p-5 flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/files/folders" className="hover:bg-[#F1F5F9] p-1 rounded-lg transition-colors">
            <ChevronLeft className="w-[18px] h-[18px] text-[#64748B]" />
          </Link>
          <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Salaries</h1>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-[#64748B]">
          <Home className="w-[18px] h-[18px]" />
          <span className="text-[#E2E8F0] text-[16px]">/</span>
          <span className="bg-[#EEF2FF] text-[#635BFF] px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide">
            Files
          </span>
        </div>
      </div>

      {/* Top Action Buttons */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setIsUploadOpen(true)}
          className="bg-[#635BFF] hover:bg-[#524be0] text-white rounded-lg p-4 flex flex-col justify-between gap-5 w-40 shadow-sm transition-colors items-start text-left"
        >
          <Upload className="w-5 h-5" />
          <span className="font-bold text-[14px]">Upload</span>
        </button>
      </div>

      {/* Files List/Grid Area */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={toggleAll}
            >
              <div
                className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center transition-colors ${isAllSelected ? "bg-[#635BFF] border border-[#635BFF]" :
                  isSomeSelected ? "bg-[#F43F5E] border border-[#F43F5E]" :
                    "border-2 border-[#E2E8F0] bg-white group-hover:border-[#CBD5E1]"
                  }`}
              >
                {isAllSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                {isSomeSelected && <Minus className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <span className={`text-[13px] font-bold decoration-2 hover:underline underline-offset-2 ${isAllSelected || isSomeSelected ? "text-[#635BFF]" : "text-[#635BFF]"}`}>
                {isAllSelected ? "Unselect All Files" : "Select All Files"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setIsDeleteOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#F43F5E] rounded-lg text-[12px] font-bold transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
              <button onClick={() => setIsDownloadOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] rounded-lg text-[12px] font-bold transition-colors">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
              <button onClick={() => setIsMoveOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#1E293B] border border-[#E2E8F0] rounded-lg text-[12px] font-bold transition-colors">
                <Move className="w-3.5 h-3.5" />
                Move
              </button>
            </div>
          </div>

          <div className="flex bg-white border border-[#E2E8F0] rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#EEF2FF] text-[#635BFF] shadow-sm' : 'text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F8FAFC]'}`}
            >
              <List className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#EEF2FF] text-[#635BFF] shadow-sm' : 'text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F8FAFC]'}`}
            >
              <LayoutGrid className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockFiles.map((file, i) => (
              <div key={file.id + i} className="border border-[#E2E8F0] rounded-lg p-3 flex flex-col gap-3 relative">
                <div
                  className="absolute top-5 left-5 z-10 cursor-pointer"
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div
                    className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors ${selectedFiles.includes(file.id) ? "bg-[#635BFF] border border-[#635BFF]" : "border-2 border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                      }`}
                  >
                    {selectedFiles.includes(file.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-lg h-36 flex flex-col items-center justify-start border border-[#F1F5F9] pt-5 px-5 overflow-hidden">
                  <div className="w-full bg-white rounded-t-lg border border-[#E2E8F0] border-b-0 h-full flex flex-col shadow-sm">
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#F1F5F9]">
                      <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full"></div>
                      <div className="w-6 h-1.5 bg-[#EEF2FF] rounded-full"></div>
                    </div>
                    <div className="flex flex-col px-3 pt-3 gap-2">
                      <div className="flex items-center justify-between px-1">
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between px-1 py-1.5 bg-[#F8FAFC] rounded-lg">
                        <div className="w-8 h-1 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#E2E8F0] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#E2E8F0] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#F1F5F9] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-1 pb-1 flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-[#1E293B]">{file.name}</span>
                    <span className="text-[12px] font-medium text-[#94A3B8]">{file.type} • {file.size} • Created by {file.createdBy}</span>
                  </div>
                  <div className="relative action-dropdown-container">
                    <button
                      onClick={(e) => toggleDropdown(`file-${file.id}-${i}`, e)}
                      className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]"
                    >
                      <MoreVertical className="w-[18px] h-[18px]" />
                    </button>

                    {activeDropdown === `file-${file.id}-${i}` && (
                      <div
                        className="absolute right-0 top-full mt-1 z-[60] min-w-[220px] bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-[#E2E8F0] py-2 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownItem icon={<Pencil className="w-[15px] h-[15px] text-[#38BDF8]" />} label="Rename" onClick={() => openRename(file.name)} />
                        <DropdownItem icon={<Download className="w-[15px] h-[15px] text-[#64748B]" />} label="Download" onClick={() => openDownload(file.name)} />
                        <DropdownItem icon={<Move className="w-[15px] h-[15px] text-[#A855F7]" />} label="Move" onClick={() => openMove(file.name)} />
                        <DropdownItem icon={<Share2 className="w-[15px] h-[15px] text-[#2DD4BF]" />} label="Publish social media post" />
                        <DropdownItem icon={<Users className="w-[15px] h-[15px] text-[#FBBF24]" />} label="Manage Permission" onClick={openManagePermission} />
                        <DropdownItem icon={<Trash2 className="w-[15px] h-[15px] text-[#F43F5E]" />} label="Delete" textColor="text-[#F43F5E]" onClick={() => openDelete(file.name)} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockFiles.map((file, i) => (
              <div key={file.id + i} className="border border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors bg-white shadow-sm">
                <div className="flex items-center gap-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors ${selectedFiles.includes(file.id) ? "bg-[#635BFF] border border-[#635BFF]" : "border-2 border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                        }`}
                    >
                      {selectedFiles.includes(file.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                  </div>

                  <div className="w-11 h-11 border border-[#E2E8F0] rounded-lg flex items-center justify-center shrink-0 bg-[#F8FAFC] shadow-sm">
                    <div className="relative flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8]">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span className={`absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-black px-[3px] py-0.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${getFileBadgeStyle(file.type)}`}>
                        {file.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-[#1E293B]">{file.name}</span>
                    <span className="text-[12px] font-medium text-[#94A3B8]">{file.type} • {file.size} • Created by {file.createdBy}</span>
                  </div>
                </div>
                <div className="relative action-dropdown-container">
                  <button
                    onClick={(e) => toggleDropdown(`file-${file.id}-${i}`, e)}
                    className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]"
                  >
                    <MoreVertical className="w-[18px] h-[18px]" />
                  </button>

                  {activeDropdown === `file-${file.id}-${i}` && (
                    <div
                      className="absolute right-0 top-full mt-1 z-[60] min-w-[220px] bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] border border-[#E2E8F0] py-2 flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownItem icon={<Pencil className="w-[15px] h-[15px] text-[#38BDF8]" />} label="Rename" onClick={() => openRename(file.name)} />
                      <DropdownItem icon={<Download className="w-[15px] h-[15px] text-[#64748B]" />} label="Download" onClick={() => openDownload(file.name)} />
                      <DropdownItem icon={<Move className="w-[15px] h-[15px] text-[#A855F7]" />} label="Move" onClick={() => openMove(file.name)} />
                      <DropdownItem icon={<Share2 className="w-[15px] h-[15px] text-[#2DD4BF]" />} label="Publish social media post" />
                      <DropdownItem icon={<Users className="w-[15px] h-[15px] text-[#FBBF24]" />} label="Manage Permission" onClick={openManagePermission} />
                      <DropdownItem icon={<Trash2 className="w-[15px] h-[15px] text-[#F43F5E]" />} label="Delete" textColor="text-[#F43F5E]" onClick={() => openDelete(file.name)} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODALS (Reusing exact same ones from previous pages) --- */}

      {/* Manage Permissions Modal */}
      <Modal isOpen={isManagePermissionOpen} onClose={() => setIsManagePermissionOpen(false)} title="Manage Permissions">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#1E293B]">Add Member <span className="text-[#EF4444]">*</span></label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search a member"
                onFocus={() => setIsSearchDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 200)}
                className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-all placeholder:text-[#94A3B8]"
              />
              <Search className="w-[18px] h-[18px] text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              {isSearchDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-[60] py-2 flex flex-col">
                  <button className="px-4 py-2.5 text-left text-[13.5px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors">View Only</button>
                  <button className="px-4 py-2.5 text-left text-[13.5px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors">Add Files</button>
                  <button className="px-4 py-2.5 text-left text-[13.5px] font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors">Edit Content</button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1E293B]">People with Access</h3>
            <div className="flex flex-col gap-4">
              {mockMembers.map((member, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-lg object-cover mix-blend-multiply bg-[#F8FAFC]" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#1E293B]">{member.name}</span>
                      <span className="text-[12px] text-[#94A3B8] font-medium">{member.email}</span>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      defaultValue={member.role}
                      className="appearance-none bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 pr-8 text-[13px] text-[#94A3B8] font-medium outline-none cursor-pointer focus:border-[#635BFF] transition-colors"
                    >
                      <option value="View Only">View Only</option>
                      <option value="Edit Content">Edit Content</option>
                      <option value="Add Folder">Add Folder</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button onClick={() => setIsManagePermissionOpen(false)} className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Upload Files Modal */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Files">
        <div className="space-y-6">
          <div className="w-full border-2 border-dashed border-[#A5B4FC] rounded-lg p-10 flex flex-col items-center justify-center gap-4 bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#635BFF]" />
            </div>
            <span className="text-[13.5px] font-bold text-[#635BFF]">Drop here or click to browse</span>
          </div>
          <div className="pt-2 flex justify-end">
            <button onClick={() => setIsUploadOpen(false)} className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20">
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Rename Modal */}
      <Modal isOpen={isRenameOpen} onClose={() => setIsRenameOpen(false)} title="Rename">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#1E293B]">New Name <span className="text-[#1E293B]">*</span></label>
            <input
              type="text"
              defaultValue={selectedItemName}
              placeholder="Enter new name"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-all placeholder:text-[#94A3B8]"
            />
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <button onClick={() => setIsRenameOpen(false)} className="px-6 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => setIsRenameOpen(false)} className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20">
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Download Modal */}
      <Modal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} title="Download">
        <div className="flex flex-col gap-6 pt-2">
          <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
            Do you want to download <span className="font-bold text-[#1E293B]">{selectedItemName}</span> to your device?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsDownloadOpen(false)} className="px-6 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => setIsDownloadOpen(false)} className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#635BFF] hover:bg-[#524be0] shadow-sm shadow-[#635BFF]/20 rounded-lg transition-colors">
              Download
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete">
        <div className="flex flex-col gap-6 pt-2">
          <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-[#1E293B]">{selectedItemName}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setIsDeleteOpen(false)} className="px-6 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => setIsDeleteOpen(false)} className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#EF4444] hover:bg-[#DC2626] shadow-sm shadow-[#EF4444]/20 rounded-lg transition-colors">
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Move Modal */}
      <Modal isOpen={isMoveOpen} onClose={() => setIsMoveOpen(false)} title="Move Folder">
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search a folder"
              className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-all placeholder:text-[#94A3B8]"
            />
            <Search className="w-[18px] h-[18px] text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="space-y-3">
            <h3 className="text-[14px] font-bold text-[#1E293B]">Suggestions</h3>
            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-2">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-transparent hover:border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#F8FAFC] rounded-lg flex items-center justify-center border border-[#F1F5F9] shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V10C22 8.89543 21.1046 8 20 8H12L10 4H4Z" fill="#A5B4FC" />
                      <path d="M12 14H16" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-bold text-[#1E293B]">Employess</span>
                    <span className="text-[12px] font-medium text-[#94A3B8]">Created by Maria Rodriguez</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button onClick={() => setIsMoveOpen(false)} className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20">
              Save
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

function DropdownItem({ icon, label, textColor = "text-[#475569]", onClick }: { icon: React.ReactNode, label: string, textColor?: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full px-4 py-2.5 text-left text-[13px] font-medium ${textColor} hover:bg-[#F8FAFC] flex items-center gap-3 transition-colors`}>
      {icon}
      {label}
    </button>
  );
}
