"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { CustomDatePicker } from "../../../../common/CustomDatePicker";
import { InputGroup } from "@/components/common/InputGroup";
import { SelectGroup } from "@/components/common/SelectGroup";
import Image from "next/image";


interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any; // For editing
}

export function AddExpenseModal({ isOpen, onClose, onSave, initialData }: AddExpenseModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
          <h2 className="text-[18px] font-bold text-[#1E293B]">Add Expense</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup label="Cost *" placeholder="Enter cost" />
            <SelectGroup label="Payment Method *" placeholder="Select method" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#1E293B]">Date *</label>
              <CustomDatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                className="w-full"
              />
            </div>
            <InputGroup label="Time *" placeholder="Enter time" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectGroup label="Macro-categories *" placeholder="Select macro-categories" />
            <SelectGroup label="Category *" placeholder="Select category" />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectGroup label="Warranty *" placeholder="None" />
            <InputGroup label="Location *" placeholder="Enter location" />
          </div>

          {/* Row 5 */}
          <InputGroup label="Payee *" placeholder="Enter payee" />

          {/* Row 6 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#1E293B]">Note</label>
            <textarea
              placeholder="Add a note"
              rows={4}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[13px] font-semibold text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors placeholder:text-[#94A3B8] resize-y"
            ></textarea>
          </div>

          {/* Attach */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#1E293B]">Attach receipts/invoices</label>
            <div 
              className="border border-dashed border-[#635BFF] rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-white cursor-pointer hover:bg-[#F8FAFC] transition-colors relative"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <div className="text-[13px] font-bold text-[#1E293B] text-center max-w-[250px] truncate">
                    {selectedFile.name}
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-[12px] font-semibold text-[#EF4444] hover:underline"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <>
                  <Image width={40} height={40} src="/upload.svg" alt="Upload" />
                  <div className="text-[13px] font-bold text-[#635BFF]">
                    Drop here or click to browse
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E2E8F0] flex justify-end">
          <button
            onClick={onSave}
            className="bg-[#635BFF] text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#5249ea] transition-colors"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}


