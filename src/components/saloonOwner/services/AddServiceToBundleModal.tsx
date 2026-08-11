import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Search } from "lucide-react";

interface AddServiceToBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: any) => void;
}

const mockServices = [
  { id: "1", name: "Hair Color", duration: "15 min", price: "€ 170" },
  { id: "2", name: "Hair Color", duration: "15 min", price: "€ 170" },
  { id: "3", name: "Hair Color", duration: "15 min", price: "€ 170" },
  { id: "4", name: "Hair Color", duration: "15 min", price: "€ 170" },
  { id: "5", name: "Hair Color", duration: "15 min", price: "€ 170" },
  { id: "6", name: "Hair Color", duration: "15 min", price: "€ 170" },
];

export default function AddServiceToBundleModal({ isOpen, onClose, onAdd }: AddServiceToBundleModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const selectedServices = mockServices.filter(s => selectedIds.includes(s.id));
    // Since the parent expects single onAdd for now, we'll map or adapt. 
    // The previous implementation added one service. If parent wants multiple, we can loop.
    // Wait, let's just pass the array and let parent handle it, or call onAdd multiple times.
    // Actually, looking at page.tsx, handleAddService takes a single service:
    // const handleAddService = (service: any) => { setSelectedServices([...selectedServices, service]); }
    // We should probably just call onAdd for each, or update parent. I'll just call onAdd multiple times for now.
    selectedServices.forEach((svc: any) => (onAdd as any)(svc));
    setSelectedIds([]);
    setSearchTerm("");
    onClose();
  };

  const filteredServices = mockServices.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Services" maxWidth="max-w-2xl">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] rounded-lg p-4 flex items-center justify-between transition-colors cursor-pointer"
              onClick={() => toggleSelection(service.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${selectedIds.includes(service.id) ? 'bg-[#635BFF] border-[#635BFF]' : 'border-[#CBD5E1] bg-white'
                  }`}>
                  {selectedIds.includes(service.id) && (
                    <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1E293B]">{service.name}</h4>
                  <p className="text-[12px] font-medium text-[#94A3B8]">{service.duration}</p>
                </div>
              </div>
              <div className="text-[16px] font-bold text-[#1E293B]">
                {service.price}
              </div>
            </div>
          ))}
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
