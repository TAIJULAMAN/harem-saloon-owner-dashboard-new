"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Plus, ChevronDown, Trash2 } from "lucide-react";
import AddServiceToBundleModal from "@/components/saloonOwner/services/AddServiceToBundleModal";
import AddMemberToBundleModal from "@/components/saloonOwner/services/AddMemberToBundleModal";

export default function AddBundlePage() {
  const [isOnlineBooking, setIsOnlineBooking] = useState(true);
  const [bundleName, setBundleName] = useState("");
  const [category, setCategory] = useState("Owner");
  const [description, setDescription] = useState("");
  const [priceType, setPriceType] = useState("Fixed");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("15 min");
  const [scheduleType, setScheduleType] = useState("Booked in sequence");
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const handleAddService = (service: any) => {
    // Avoid duplicates
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  return (
    <div className="w-full pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center mb-6">
        <Link
          href="/dashboard/services/bundles"
          className="text-[#635BFF] hover:bg-[#EEF2FF] p-1.5 rounded-lg transition-colors mr-3"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[1.15rem] font-bold text-[#1E293B] font-manrope">Add Bundle</h1>
      </div>

      <div className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[1.1rem] font-bold text-[#1E293B]">Basic Details</h2>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${isOnlineBooking ? "bg-[#635BFF] border-[#635BFF]" : "border-2 border-[#CBD5E1] group-hover:border-[#635BFF]"
                  }`}
              >
                {isOnlineBooking && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
              <span className="text-[13px] font-medium text-[#475569]">Add it to online bookings</span>
              <input
                type="checkbox"
                className="hidden"
                checked={isOnlineBooking}
                onChange={(e) => setIsOnlineBooking(e.target.checked)}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Bundle Name *</label>
              <input
                type="text"
                value={bundleName}
                onChange={(e) => setBundleName(e.target.value)}
                placeholder="Enter service name"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors placeholder-[#94A3B8]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Category *</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none"
                >
                  <option value="Owner">Owner</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              rows={4}
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors resize-none placeholder-[#94A3B8]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Price Type *</label>
              <div className="relative">
                <select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none"
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Variable">Variable</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Price *</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors placeholder-[#94A3B8]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 md:pr-3">
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Duration *</label>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none"
              >
                <option value="15 min">15 min</option>
                <option value="30 min">30 min</option>
                <option value="45 min">45 min</option>
                <option value="60 min">60 min</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Members Required */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-[1.1rem] font-bold text-[#1E293B] mb-6">Members Required</h2>

          {selectedMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {selectedMembers.map(member => (
                <div key={member.id} className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E2E8F0]">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1E293B]">{member.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      const newMembers = selectedMembers.filter(m => m.id !== member.id);
                      setSelectedMembers(newMembers);
                    }}
                    className="p-1.5 text-[#F43F5E] hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="bg-[#E0E7FF] text-[#635BFF] hover:bg-[#EEF2FF] px-4 py-2 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Members
          </button>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-[1.1rem] font-bold text-[#1E293B] mb-6">Services</h2>

          <div className="w-full md:w-1/2 md:pr-3 mb-6">
            <label className="block text-[13px] font-bold text-[#1E293B] mb-2">Schedule Type *</label>
            <div className="relative">
              <select
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-medium text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors bg-white appearance-none"
              >
                <option value="Booked in sequence">Booked in sequence</option>
                <option value="Parallel">Parallel</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Selected Services List */}
          {selectedServices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {selectedServices.map(service => (
                <div key={service.id} className="bg-[#F8FAFC] rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1E293B]">{service.name}</h4>
                    <p className="text-[12px] font-medium text-[#94A3B8] mt-0.5">{service.duration}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[16px] font-bold text-[#1E293B]">{service.price}</span>
                    <button
                      onClick={() => handleRemoveService(service.id)}
                      className="p-1.5 text-[#F43F5E] hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsAddServiceModalOpen(true)}
            className="bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#635BFF] px-4 py-2.5 rounded-lg font-bold text-[13px] flex items-center gap-2 transition-colors w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Service
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
        onAdd={(members) => setSelectedMembers(members)}
      />

      {/* Footer / Save Button */}
      <div className="flex justify-end mt-8">
        <Link
          href="/dashboard/services/bundles"
          className="bg-[#635BFF] hover:bg-[#524be0] text-white px-8 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
