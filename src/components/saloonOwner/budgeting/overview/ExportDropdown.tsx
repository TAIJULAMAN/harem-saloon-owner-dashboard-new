"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { DownloadIcon } from "./DownloadIcon";

interface ExportDropdownProps {
  reportMonth: string;
}

export function ExportDropdown({ reportMonth }: ExportDropdownProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = (format: string) => {
    setExportOpen(false);
    let content = "";
    let mimeType = "";
    let extension = "";

    if (format === 'PDF') {
      content = "Monthly Report Summary\n\nTotal Income: €23,850\nTotal Expenses: €23,850\n\n(This is a simulated PDF export)";
      mimeType = "text/plain";
      extension = "txt";
    } else {
      content = "Category,Amount\nTotal Income,23850\nTotal Expenses,23850\nProducts,670\nInternet,120\n";
      mimeType = "text/csv";
      extension = "csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `monthly_report_${reportMonth.toLowerCase()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setExportOpen(!exportOpen)}
        className="flex items-center gap-2 bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#D6D9FF] transition-colors"
      >
        <DownloadIcon className="w-4 h-4" />
        Export Monthly Report
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exportOpen ? "rotate-180" : ""}`} />
      </button>
      {exportOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => handleExport('PDF')}
            className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-[#1E293B] text-sm font-medium transition-colors"
          >
            PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] text-[#1E293B] text-sm font-medium transition-colors"
          >
            Excel
          </button>
        </div>
      )}
    </div>
  );
}
