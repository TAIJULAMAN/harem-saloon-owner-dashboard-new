"use client";

import React, { useState, useRef } from "react";
import {
  X,
  ChevronDown,
  Bold,
  Italic,
  Smile,
  Hash,
  MapPin,
  Image as ImageIcon,
  MousePointerClick,
  Check
} from "lucide-react";
import Image from "next/image";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: () => void;
}

const ACCOUNTS = [
  {
    id: "1",
    name: "Maria Rodriguez",
    handle: "@mariarodriguez",
    platform: "in",
    avatar: "/avatar/icon1.png",
  },
  {
    id: "2",
    name: "SalonFlow Official",
    handle: "@salonflow",
    platform: "ig",
    avatar: "/avatar/icon2.png",
  }
];

export function AddPostModal({
  isOpen,
  onClose,
  onSchedule,
}: AddPostModalProps) {
  const [activeTab, setActiveTab] = useState<"Post" | "Reel" | "Story">("Post");
  const [mediaState, setMediaState] = useState<"hidden" | "dropzone" | "uploaded">("hidden");
  
  // New States
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);
  
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleMediaClick = () => {
    if (mediaState === "hidden") setMediaState("dropzone");
    else if (mediaState === "dropzone") setMediaState("hidden");
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedMediaUrl(event.target?.result as string);
        setMediaState("uploaded");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeMedia = () => {
    setUploadedMediaUrl(null);
    setMediaState("hidden");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Helper functions for formatting
  const appendText = (text: string) => {
    setDescription(prev => prev + text);
  };

  const handleSubmit = (action: "draft" | "publish" | "schedule") => {
    console.log("Submitting as", action, {
      account: selectedAccount,
      type: activeTab,
      description,
      location,
      media: uploadedMediaUrl ? "Attached" : "None"
    });
    
    if (action === "schedule") {
      onSchedule();
    } else {
      onClose(); // Just close for draft/publish for now
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1E293B]/50 flex items-center justify-center z-50 p-4 font-manrope">
      <div className="bg-white rounded-[16px] w-full max-w-[640px] flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#1E293B]">Add {activeTab}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-[#64748B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {/* Accounts Section */}
          <div className="mb-6 relative">
            <h3 className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Accounts</h3>
            <div 
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className={`border rounded-[12px] p-3 flex items-center justify-between cursor-pointer transition-colors ${
                isAccountDropdownOpen ? "border-[#635BFF] bg-[#635BFF]/5" : "border-[#E2E8F0] hover:border-[#635BFF]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2E8F0] overflow-hidden shrink-0">
                  <Image
                    width={40}
                    height={40}
                    src={selectedAccount.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1E293B] flex flex-wrap items-center gap-x-1">
                    <span>{selectedAccount.name}</span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="font-semibold text-[#64748B]">
                      {selectedAccount.handle}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
                    Platform:
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold uppercase ${
                      selectedAccount.platform === 'in' ? 'bg-[#0077b5]' : 'bg-[#E1306C]'
                    }`}>
                      {selectedAccount.platform}
                    </div>
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#635BFF] transition-transform ${isAccountDropdownOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Account Dropdown */}
            {isAccountDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-[12px] shadow-lg z-10 overflow-hidden animate-in slide-in-from-top-2">
                {ACCOUNTS.map((account) => (
                  <div 
                    key={account.id}
                    onClick={() => {
                      setSelectedAccount(account);
                      setIsAccountDropdownOpen(false);
                    }}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Image width={32} height={32} src={account.avatar} alt={account.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-[13px] font-bold text-[#1E293B]">{account.name}</p>
                        <p className="text-[11px] font-medium text-[#64748B]">{account.handle}</p>
                      </div>
                    </div>
                    {selectedAccount.id === account.id && <Check className="w-4 h-4 text-[#635BFF]" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-[#F1F5F9] mb-6">
            {(["Post", "Reel", "Story"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#635BFF] text-[#635BFF]"
                    : "border-transparent text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4 relative">
            <h3 className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
              Content
            </h3>

            <div className="relative border border-[#E2E8F0] rounded-[12px] overflow-hidden focus-within:border-[#635BFF] transition-colors bg-white">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 p-4 focus:outline-none resize-none text-[14px] font-medium text-[#1E293B] placeholder:text-[#94A3B8]"
                placeholder="What do you want to share with your audience?"
              ></textarea>

              {/* Media Thumbnails Area */}
              {mediaState === "uploaded" && uploadedMediaUrl && (
                <div className="px-4 pb-14">
                  <div className="relative w-24 h-24 rounded-[8px] overflow-hidden border border-slate-200 group">
                    <Image src={uploadedMediaUrl} alt="Upload" fill className="object-cover" />
                    <button
                      onClick={removeMedia}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Formatting Toolbar */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white">
                <button onClick={() => appendText('**bold** ')} className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-transparent hover:border-slate-200 text-[#64748B] hover:bg-slate-50 transition-colors" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button onClick={() => appendText('_italic_ ')} className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-transparent hover:border-slate-200 text-[#64748B] hover:bg-slate-50 transition-colors" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <button onClick={() => appendText('😊')} className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-transparent hover:border-slate-200 text-[#64748B] hover:bg-slate-50 transition-colors" title="Emoji">
                  <Smile className="w-4 h-4" />
                </button>
                <button onClick={() => appendText('#')} className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-transparent hover:border-slate-200 text-[#64748B] hover:bg-slate-50 transition-colors" title="Hashtag">
                  <Hash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Location Input (if active) */}
          {showLocationInput && (
            <div className="mb-4 animate-in slide-in-from-top-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635BFF] w-4 h-4" />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location..."
                  className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-[10px] text-[14px] font-medium text-[#1E293B] focus:border-[#635BFF] outline-none"
                  autoFocus
                />
                <button onClick={() => setShowLocationInput(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1E293B]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Media Dropzone (if active) */}
          {mediaState === "dropzone" && (
            <div
              onClick={handleDropzoneClick}
              className="mb-4 border-2 border-dashed border-[#635BFF]/40 bg-[#635BFF]/5 rounded-[12px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#635BFF]/10 hover:border-[#635BFF] transition-colors animate-in slide-in-from-top-2"
            >
              <div className="w-12 h-12 bg-white text-[#635BFF] rounded-full flex items-center justify-center shadow-sm">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-bold text-[#635BFF]">
                  Click to upload media
                </p>
                <p className="text-[12px] font-medium text-[#64748B] mt-1">
                  JPG, PNG, MP4 up to 50MB
                </p>
              </div>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,video/*"
          />

          {/* Location & Media Triggers */}
          <div className="flex items-center gap-3 mt-6">
            <button 
              onClick={() => setShowLocationInput(!showLocationInput)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border rounded-[10px] text-[13px] font-bold transition-colors ${showLocationInput || location ? 'border-[#635BFF] text-[#635BFF] bg-[#635BFF]/5' : 'border-[#E2E8F0] text-[#1E293B] hover:bg-slate-50'}`}
            >
              <MapPin className="w-4 h-4" />
              {location || "Location"}
            </button>
            <button
              onClick={handleMediaClick}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 border rounded-[10px] text-[13px] font-bold transition-colors ${mediaState !== 'hidden' ? 'border-[#635BFF] text-[#635BFF] bg-[#635BFF]/5' : 'border-[#E2E8F0] text-[#1E293B] hover:bg-slate-50'}`}
            >
              <ImageIcon className="w-4 h-4" />
              Media
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 bg-slate-50/50 rounded-b-[16px]">
          <button 
            onClick={() => handleSubmit("draft")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[10px] border border-[#635BFF] text-[#635BFF] font-bold text-[14px] hover:bg-[#635BFF]/5 transition-colors"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSubmit("publish")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[10px] bg-[#E0E7FF] text-[#635BFF] font-bold text-[14px] hover:bg-[#D6D9FF] transition-colors"
          >
            Publish Now
          </button>
          <button
            onClick={() => handleSubmit("schedule")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[10px] bg-[#635BFF] text-white font-bold text-[14px] shadow-lg shadow-[#635BFF]/20 hover:opacity-90 transition-opacity"
          >
            Schedule Post
          </button>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
