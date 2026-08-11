"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";
import { BasicDetailsSection } from "@/components/saloonOwner/services/add/BasicDetailsSection";
import { MembersRequiredSection } from "@/components/saloonOwner/services/add/MembersRequiredSection";
import { AddServicesIcons } from "@/components/saloonOwner/services/add/AddServicesIcons";
import { availableIcons, mockMembers } from "@/components/saloonOwner/services/Services/data";

export default function AddServicePage() {
  const router = useRouter();
  const [isOnlineBooking, setIsOnlineBooking] = useState(true);
  const [isAllMembers, setIsAllMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([1, 2, 3, 4]);
  const [selectedIcon, setSelectedIcon] = useState(0);

  const toggleMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(mId => mId !== id));
      setIsAllMembers(false);
    } else {
      setSelectedMembers([...selectedMembers, id]);
      if (selectedMembers.length === mockMembers.length - 1) {
        setIsAllMembers(true);
      }
    }
  };

  const toggleAllMembers = () => {
    if (isAllMembers) {
      setIsAllMembers(false);
      setSelectedMembers([]);
    } else {
      setIsAllMembers(true);
      setSelectedMembers(mockMembers.map(m => m.id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => router.push('/dashboard/services')}
          className="flex items-center gap-2 text-[15px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          Add Services
        </button>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
          <Home className="w-4 h-4" /> / <span className="bg-[#E0E7FF] text-[#635BFF] px-2 py-0.5 rounded-lg font-semibold text-[11px]">Services</span>
        </div>
      </div>

      <div className="py-6 w-full space-y-6">
        <BasicDetailsSection
          isOnlineBooking={isOnlineBooking}
          setIsOnlineBooking={setIsOnlineBooking}
        />

        <MembersRequiredSection
          isAllMembers={isAllMembers}
          toggleAllMembers={toggleAllMembers}
          mockMembers={mockMembers}
          selectedMembers={selectedMembers}
          toggleMember={toggleMember}
        />

        <AddServicesIcons
          availableIcons={availableIcons}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 pb-12">
          <button
            onClick={() => router.push('/dashboard/services')}
            className="px-8 py-2.5 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm shadow-[#635BFF]/20"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
