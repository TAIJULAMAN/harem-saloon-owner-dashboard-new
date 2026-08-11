import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  error?: string;
}

const COMMON_ICONS = [
  "Activity", "Airplay", "AlarmClock", "AlignCenter", "AlignJustify", "AlignLeft",
  "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Bell", "Briefcase",
  "Calendar", "Camera", "Check", "ChevronDown", "ChevronUp", "Clock",
  "CreditCard", "Database", "DollarSign", "Edit", "Eye", "File", "FileText",
  "Folder", "Globe", "Heart", "Home", "Image", "Inbox", "Info", "Link",
  "Lock", "Mail", "Map", "MessageCircle", "Monitor", "Music", "Package",
  "Paperclip", "Phone", "Plus", "Search", "Send", "Settings", "Shield",
  "ShoppingCart", "Star", "Tag", "Trash", "TrendingUp", "User", "Users",
  "Video", "Wifi", "Zap"
];

export default function IconPicker({ value, onChange, error }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredIcons = COMMON_ICONS.filter(icon =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SelectedIcon = (LucideIcons as any)[value];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Icon <span className="text-[#EF4444]">*</span></label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border ${error ? "border-[#EF4444]" : "border-[#E2E8F0]"
          } rounded-lg text-[14px] focus:outline-none focus:border-[#635BFF] transition-colors`}
      >
        <div className="flex items-center gap-3">
          {SelectedIcon && <SelectedIcon className="w-5 h-5 text-[#64748B]" />}
          <span className={value ? "text-[#1E293B]" : "text-[#94A3B8]"}>
            {value || "Select an icon"}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-[#94A3B8] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-[#E2E8F0]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-[13px] bg-[#F8FAFC] border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-[#635BFF]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-2 scrollbar-hide">
            {filteredIcons.length === 0 ? (
              <div className="p-3 text-center text-[13px] text-[#94A3B8]">No icons found</div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {filteredIcons.map((iconName) => {
                  const Icon = (LucideIcons as any)[iconName];
                  if (!Icon) return null;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        onChange(iconName);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors ${value === iconName ? "bg-[#EEF2FF] text-[#635BFF]" : "text-[#64748B]"
                        }`}
                      title={iconName}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-[13px] text-[#EF4444]">{error}</p>}
    </div>
  );
}
