"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { DownloadIcon } from "../overview/DownloadIcon";
import { ExportDropdown } from "../overview/ExportDropdown";

export function ExpenseHeader({ onAddExpense }: { onAddExpense?: () => void }) {
  const [exportOpen, setExportOpen] = useState(false);
  const [reportMonth, setReportMonth] = useState("February");

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

  const handleExport = (type: string) => {
    console.log(`Exporting as ${type}...`);
    setExportOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-xl font-bold text-[#1E293B]">Expense Management</h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <ExportDropdown reportMonth={reportMonth} />

        <button
          onClick={onAddExpense}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#635BFF] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#5249ea] transition-colors"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="truncate">Add Expense</span>
        </button>
      </div>
    </div>
  );
}
