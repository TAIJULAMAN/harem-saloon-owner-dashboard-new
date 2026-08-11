"use client";

import React from "react";
import { X, Search, ChevronRight, Scissors } from "lucide-react";

interface SearchServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: any) => void;
}

export default function SearchServiceModal({ isOpen, onClose, onSelectService }: SearchServiceModalProps) {
  if (!isOpen) return null;

  const services = [
    { id: 1, name: "Haircut", duration: "45 min", estimatedPrice: "€ 350" },
    { id: 2, name: "Haircut", duration: "45 min", estimatedPrice: "€ 350" },
    { id: 3, name: "Haircut", duration: "45 min", estimatedPrice: "€ 350" },
    { id: 4, name: "Haircut", duration: "45 min", estimatedPrice: "€ 350" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[500px] shadow-2xl p-4 relative animate-in fade-in zoom-in duration-200 mx-4 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[16px] font-bold text-[#1E293B]">Search a Service</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-[#E2E8F0] rounded-[12px] pl-10 pr-4 py-3 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <h3 className="text-[12px] font-bold text-[#1E293B] mb-4">Recent research</h3>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-6 custom-scrollbar">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="border border-[#E2E8F0] hover:border-[#635BFF] rounded-[16px] p-4 flex items-center justify-between cursor-pointer transition-colors bg-white group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center group-hover:bg-[#EEF2FF] transition-colors">
                  <Scissors className="w-5 h-5 text-[#A5B4FC] group-hover:text-[#635BFF] transition-colors transform -rotate-45" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1E293B] mb-0.5">{service.name}</div>
                  <div className="text-[12px] text-[#94A3B8] font-medium">{service.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-[#94A3B8] font-medium uppercase">Estimated</div>
                  <div className="text-[14px] font-bold text-[#635BFF]">{service.estimatedPrice}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#635BFF] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20">
            Add Service
          </button>
        </div>

      </div>
    </div>
  );
}
