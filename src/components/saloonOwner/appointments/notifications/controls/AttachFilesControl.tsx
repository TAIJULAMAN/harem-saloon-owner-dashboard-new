"use client";

import React, { useRef } from "react";
import { Upload, X, Paperclip } from "lucide-react";

interface FileItem {
  name: string;
  size: string;
}

interface AttachFilesControlProps {
  attachedFiles: FileItem[];
  onAttachFiles: (files: FileItem[]) => void;
  onRemoveFile: (index: number) => void;
}

export default function AttachFilesControl({
  attachedFiles,
  onAttachFiles,
  onRemoveFile,
}: AttachFilesControlProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      }));
      onAttachFiles(filesArr);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArr = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      }));
      onAttachFiles(filesArr);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-bold text-[#475569]">
        Attach Files *
      </label>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#C7D2FE] bg-[#F8FAFC] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#EEF2FF] transition-colors text-center"
      >
        <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#635BFF] flex items-center justify-center mb-2.5">
          <Upload className="w-5 h-5" />
        </div>
        <span className="text-[12.5px] font-bold text-[#635BFF]">
          Drop here or click to browse
        </span>
      </div>

      {/* Attached Files List */}
      {attachedFiles.length > 0 && (
        <div className="mt-2 space-y-2">
          {attachedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[12px]"
            >
              <div className="flex items-center gap-2 text-[#475569] font-semibold truncate">
                <Paperclip className="w-3.5 h-3.5 text-[#635BFF] shrink-0" />
                <span className="truncate">{file.name}</span>
                <span className="text-[#94A3B8] text-[10.5px]">
                  ({file.size})
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(idx);
                }}
                className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
