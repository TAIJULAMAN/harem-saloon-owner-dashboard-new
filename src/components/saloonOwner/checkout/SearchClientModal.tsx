"use client";

import React from "react";
import { X, Search, ChevronRight } from "lucide-react";

interface SearchClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClient: (client: any) => void;
}

export default function SearchClientModal({ isOpen, onClose, onSelectClient }: SearchClientModalProps) {
  if (!isOpen) return null;

  const clients = [
    { id: 1, name: "Maria Rodriguez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=5" },
    { id: 2, name: "Maria Rodriguez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=9" },
    { id: 3, name: "Maria Rodriguez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=12" },
    { id: 4, name: "Maria Rodriguez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=17" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[500px] shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 mx-4 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[16px] font-bold text-[#1E293B]">Search a Client</h2>
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

        {/* Clients List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-6 custom-scrollbar">
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => onSelectClient(client)}
              className="border border-[#E2E8F0] hover:border-[#635BFF] rounded-[16px] p-3 flex items-center justify-between cursor-pointer transition-colors bg-white group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[12px] overflow-hidden bg-[#E2E8F0]">
                  <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#1E293B]">{client.name}</div>
                  <div className="text-[11px] text-[#94A3B8] font-medium">{client.phone}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#635BFF] group-hover:translate-x-1 transition-transform mr-2" />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="bg-[#635BFF] hover:bg-[#524be0] text-white px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20">
            Add Client
          </button>
        </div>

      </div>
    </div>
  );
}
