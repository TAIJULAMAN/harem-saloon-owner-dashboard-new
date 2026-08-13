"use client";

import { useRef } from "react";
import { FileText, Eye, Download } from "lucide-react";
import ImportIcon from "./ImportIcon";
import VideoPlayer from "./VideoPlayer";
import PageHeader from "@/components/common-component/PageHeader";

export default function ImportAppointmentContent() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* ── Top Bar ── */}
      <PageHeader
        title="Import Appointments"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Appointments", active: true }]}
      />
      <div className="w-full md:bg-white bg-transparent border border-[#EFF4FA] rounded-[20px] overflow-hidden mt-[30px]">
        {/* ── Content ── */}
        <div className="p-0 md:p-[30px] sm:p-8 space-y-7">
          {/* Video */}
          <VideoPlayer />

          {/* Templates */}
          <div>
            <h2 className="text-base font-bold font-manrope text-[#29343D] mb-4">
              Templates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[692px]">
              {[
                { name: "CSV Template", meta: "CSV • 100 KB" },
                { name: "Filled CSV Example", meta: "CSV • 100 KB" },
              ].map((tpl) => (
                <div
                  key={tpl.name}
                  className="border border-[#EFF4FA] rounded-[14px] p-4 flex flex-col items-center gap-3 shadow-md"
                >
                  <div className="w-10 h-10 bg-[#F1F2FE] rounded-full flex items-center justify-center">
                    <FileText size={18} className="text-[#635BFF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold font-manrope text-[#29343D]">
                      {tpl.name}
                    </p>
                    <p className="text-xs font-manrope text-[#98A4AE] mt-1">
                      {tpl.meta}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-12 h-12 bg-[#EEEEFF] rounded-[8px] flex items-center justify-center transition-colors cursor-pointer">
                      <Eye fill="#635BFF" color="#EEEEFF" size={28} />
                    </button>
                    <button className="w-12 h-12 bg-[#EEEEFF] rounded-[8px] flex items-center justify-center transition-colors cursor-pointer">
                      <Download size={18} className="text-[#0A2540]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Import File */}
          <div>
            <h2 className="text-base font-bold font-manrope text-[#29343D] mb-4">
              Import File
            </h2>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
              }}
              className={
                "w-full rounded-[14px] border-2 border-dashed border-[#635BFF] cursor-pointer transition-all flex flex-col items-center justify-center py-12 gap-3"
              }
            >
              <ImportIcon />
              <p className="text-sm font-semibold font-manrope text-[#635BFF]">
                Drop here or click to browse
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
