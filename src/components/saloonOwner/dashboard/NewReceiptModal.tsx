"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, Search, Plus, ChevronRight } from "lucide-react";

interface NewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewReceiptModal({ isOpen, onClose }: NewReceiptModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateIndependent = () => {
    onClose();
    router.push("/dashboard/checkout");
  };

  const appointments = [
    {
      id: 1,
      name: "Maria Rodriguez",
      time: "11:00",
      service: "Haircut",
      teamMember: "Mada",
      estimatedPrice: "€ 350",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      time: "11:00",
      service: "Haircut",
      teamMember: "Mada",
      estimatedPrice: "€ 350",
      avatar: "https://i.pravatar.cc/100?img=9",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      time: "11:00",
      service: "Haircut",
      teamMember: "Mada",
      estimatedPrice: "€ 350",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      time: "11:00",
      service: "Haircut",
      teamMember: "Mada",
      estimatedPrice: "€ 350",
      avatar: "https://i.pravatar.cc/100?img=17",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-[560px] shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 mx-4 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[16px] font-bold text-[#1E293B] mb-1">New Receipt</h2>
            <p className="text-[13px] text-[#94A3B8] font-medium">Select an appointment or create an independent receipt</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Independent Receipt Button */}
        <div
          onClick={handleCreateIndependent}
          className="bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-[16px] p-4 flex items-center justify-between cursor-pointer transition-colors mb-6 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#E0E7FF] flex items-center justify-center text-[#635BFF]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#1E293B]">Create independent Receipt</div>
              <div className="text-[12px] text-[#94A3B8] font-medium">Not linked to any appointment</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#635BFF] group-hover:translate-x-1 transition-transform" />
        </div>

        <h3 className="text-[13px] font-bold text-[#1E293B] mb-4">Or select specific appointment</h3>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search an appointment"
            className="w-full border border-[#E2E8F0] rounded-[12px] pl-4 pr-10 py-3 text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none focus:border-[#635BFF] transition-colors"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Appointments List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {appointments.map((apt) => (
            <div key={apt.id} className="border border-[#E2E8F0] hover:border-[#635BFF] rounded-[16px] p-4 flex items-center justify-between cursor-pointer transition-colors bg-white group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E2E8F0]">
                  <img src={apt.avatar} alt={apt.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#1E293B] mb-0.5">{apt.name} • {apt.time}</div>
                  <div className="text-[11px] text-[#94A3B8] font-medium leading-tight">Service: {apt.service}</div>
                  <div className="text-[11px] text-[#94A3B8] font-medium leading-tight">Team Member: {apt.teamMember}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-[#94A3B8] font-medium uppercase">Estimated</div>
                  <div className="text-[14px] font-bold text-[#635BFF]">{apt.estimatedPrice}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#635BFF] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
