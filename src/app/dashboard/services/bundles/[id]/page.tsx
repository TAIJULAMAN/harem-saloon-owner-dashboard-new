"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home, Check, Plus, Trash2 } from "lucide-react";
import AddServiceToBundleModal from "@/components/saloonOwner/services/AddServiceToBundleModal";
import AddMemberToBundleModal from "@/components/saloonOwner/services/AddMemberToBundleModal";

export default function ViewBundlePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();

  const [services, setServices] = useState([
    { id: "1", name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: "2", name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: "3", name: "Hair Color", duration: "15 min", price: "€ 170" },
  ]);

  const [members, setMembers] = useState([
    { id: "1", name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: "2", name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=5" },
    { id: "3", name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=9" },
  ]);

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const handleAddService = (service: any) => {
    if (!services.find(s => s.id === service.id)) {
      setServices([...services, service]);
    }
  };

  const handleAddMembers = (newMembers: any[]) => {
    const uniqueNew = newMembers.filter(nm => !members.find(m => m.id === nm.id));
    setMembers([...members, ...uniqueNew]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/services/bundles')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          View Bundle
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Home className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Services</span>
        </div>
      </div>

      <div className="py-6 w-full space-y-6">

        {/* Basic Details Section */}
        <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-[20px] font-bold text-[#1E293B]">Bundle 2</h2>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 rounded bg-[#635BFF] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-[13px] font-medium text-[#475569]">Add it to online bookings</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Category</p>
              <span className="inline-flex items-center bg-[#E0E7FF] text-[#635BFF] px-3 py-1 rounded-lg text-[12px] font-bold">
                Category 1
              </span>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Duration</p>
              <p className="text-[14px] font-bold text-[#1E293B]">15 min</p>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Price Type</p>
              <p className="text-[14px] font-bold text-[#1E293B]">Fixed</p>
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Price</p>
              <p className="text-[14px] font-bold text-[#1E293B]">€ 270</p>
            </div>

            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Schedule Type</p>
              <p className="text-[14px] font-bold text-[#1E293B]">Booked in sequence</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[12px] font-medium text-[#94A3B8] mb-2">Description</p>
            <p className="text-[14px] font-medium text-[#1E293B] leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
          <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {services.map(service => (
              <div key={service.id} className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-[#1E293B]">{service.name}</h4>
                  <p className="text-[12px] font-medium text-[#94A3B8] mt-0.5">{service.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[16px] font-bold text-[#1E293B]">{service.price}</span>
                  <button
                    onClick={() => setServices(services.filter(s => s.id !== service.id))}
                    className="p-1.5 text-[#F43F5E] hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsAddServiceModalOpen(true)}
            className="bg-[#E0E7FF] text-[#635BFF] hover:bg-[#EEF2FF] px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* Members Required Section */}
        <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
          <h2 className="text-[16px] font-bold text-[#1E293B] mb-6">Members Required</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {members.map(member => (
              <div key={member.id} className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E2E8F0]">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[14px] font-bold text-[#1E293B]">{member.name}</span>
                </div>
                <button
                  onClick={() => setMembers(members.filter(m => m.id !== member.id))}
                  className="p-1.5 text-[#F43F5E] hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="bg-[#E0E7FF] text-[#635BFF] hover:bg-[#EEF2FF] px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Members
          </button>
        </div>

      </div>

      <AddServiceToBundleModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAdd={handleAddService}
      />

      <AddMemberToBundleModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAdd={handleAddMembers}
      />
    </div>
  );
}
