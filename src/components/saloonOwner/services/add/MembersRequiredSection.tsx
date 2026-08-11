import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { EditDurationModal } from "./EditDurationModal";

interface Member {
  id: number;
  name: string;
  avatar: string;
}

interface MembersRequiredSectionProps {
  isAllMembers: boolean;
  toggleAllMembers: () => void;
  mockMembers: Member[];
  selectedMembers: number[];
  toggleMember: (id: number) => void;
}

export function MembersRequiredSection({
  isAllMembers,
  toggleAllMembers,
  mockMembers,
  selectedMembers,
  toggleMember,
}: MembersRequiredSectionProps) {
  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [durations, setDurations] = useState<Record<number, string>>({});

  const handleSaveDuration = (duration: string) => {
    if (editingMember !== null) {
      setDurations((prev) => ({ ...prev, [editingMember]: duration }));
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] border border-[#E2E8F0]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-[16px] font-bold text-[#1E293B]">Members Required</h2>
        <CustomCheckbox
          label="All Members"
          checked={isAllMembers}
          onChange={toggleAllMembers}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMembers.map((member) => {
          const isChecked = selectedMembers.includes(member.id);
          return (
            <div key={member.id} className="bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CustomCheckbox
                  checked={isChecked}
                  onChange={() => toggleMember(member.id)}
                />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm">
                    <img src={member.avatar} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[14px] font-bold text-[#1E293B]">{member.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-[13px] font-bold text-[#1E293B]">{durations[member.id] || "-"}</span>
                  <span className="text-[10px] text-[#94A3B8]">Duration</span>
                </div>
                <button 
                  onClick={() => setEditingMember(member.id)}
                  className="text-[#635BFF] hover:text-[#524be0] transition-colors p-1.5 rounded-lg hover:bg-[#EEF2FF]"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <EditDurationModal
        isOpen={editingMember !== null}
        onClose={() => setEditingMember(null)}
        onSave={handleSaveDuration}
        initialDuration={editingMember !== null ? (durations[editingMember] || "15 min") : "15 min"}
      />
    </div>
  );
}
