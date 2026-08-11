import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Search } from "lucide-react";

interface AddMemberToBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (members: any[]) => void;
}

const mockMembers = [
  { id: "1", name: "Maria Fernandez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "2", name: "Virgie Sutton", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "3", name: "Lois Gregory", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=9" },
  { id: "4", name: "Maria Fernandez", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=1" },
  { id: "5", name: "Virgie Sutton", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "6", name: "Lois Gregory", phone: "+39 345 678 9123", avatar: "https://i.pravatar.cc/100?img=9" },
];

export default function AddMemberToBundleModal({ isOpen, onClose, onAdd }: AddMemberToBundleModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedMembers = mockMembers.filter(m => selectedIds.includes(m.id));
    onAdd(selectedMembers);
    setSelectedIds([]);
    setSearchTerm("");
    onClose();
  };

  const filteredMembers = mockMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Services" maxWidth="max-w-3xl">
      <div className="space-y-6 pt-4">

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[13px] text-[#1E293B] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
          {filteredMembers.map(member => {
            const isSelected = selectedIds.includes(member.id);
            return (
              <div
                key={member.id}
                className={`bg-white border rounded-lg p-4 flex flex-col relative transition-colors cursor-pointer ${isSelected ? 'border-[#635BFF]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                onClick={() => toggleSelection(member.id)}
              >
                {/* Checkbox */}
                <div className="absolute top-4 left-4">
                  <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#635BFF] border-[#635BFF]' : 'border-[#CBD5E1] bg-white'
                    }`}>
                    {isSelected && (
                      <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Avatar and Info */}
                <div className="flex flex-col items-center justify-center mt-2">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F1F5F9] mb-3">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[13px] font-bold text-[#1E293B] text-center">{member.name}</h4>
                  <p className="text-[11px] font-medium text-[#94A3B8] text-center mt-0.5">{member.phone}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 pb-2">
          <button
            onClick={handleSave}
            disabled={selectedIds.length === 0}
            className={`px-8 py-2.5 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm ${selectedIds.length > 0 ? "bg-[#635BFF] hover:bg-[#524be0] shadow-[#635BFF]/20" : "bg-[#A5B4FC] cursor-not-allowed"
              }`}
          >
            Save List
          </button>
        </div>
      </div>
    </Modal>
  );
}
