import React, { useState, useRef } from "react";
import { X, UploadCloud, CheckCircle2, ChevronDown } from "lucide-react";

interface UploadMediaModalProps {
  onClose: () => void;
}

export default function UploadMediaModal({ onClose }: UploadMediaModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-white rounded-lg w-full max-w-[500px] p-6 relative z-10 shadow-xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1E293B]">Upload Media</h2>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors p-1 rounded-lg hover:bg-[#F1F5F9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors cursor-pointer text-center
              ${dragActive ? 'border-[#635BFF] bg-[#F5F3FF]' : 'border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'}
              ${selectedFile ? 'border-[#22C55E] bg-[#F0FDF4]' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*,video/*"
            />

            {selectedFile ? (
              <>
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-4 text-[#22C55E]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-[14px] font-bold text-[#1E293B] mb-1">{selectedFile.name}</div>
                <div className="text-[12px] font-medium text-[#64748B]">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4 text-[#64748B]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-[14px] font-bold text-[#1E293B] mb-1">Click or drag file to this area to upload</div>
                <div className="text-[12px] font-medium text-[#64748B]">Support for a single image or video upload.</div>
              </>
            )}
          </div>

          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-1.5">File Name</label>
              <input
                type="text"
                defaultValue={selectedFile ? selectedFile.name : ""}
                placeholder="Enter file name"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#1E293B]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:flex-1">
                <label className="block text-[13px] font-bold text-[#1E293B] mb-1.5">Category</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#1E293B] cursor-pointer">
                    <option>Haircut</option>
                    <option>Coloring</option>
                    <option>Styling</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="w-full sm:flex-1">
                <label className="block text-[13px] font-bold text-[#1E293B] mb-1.5">Publish Status</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#1E293B] cursor-pointer">
                    <option>Publish to social media</option>
                    <option>Keep private</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-[13px] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!selectedFile}
            onClick={onClose}
            className="bg-[#635BFF] text-white px-8 py-2 rounded-lg text-[13px] font-bold hover:bg-[#524be0] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
