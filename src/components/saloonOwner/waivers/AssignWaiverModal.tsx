import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { Search, Users, X, Check } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const mockClients: Client[] = [
  { id: "1", name: "Maria Rodriguez", email: "maria@beautywellness.com", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Maria Rodriguez", email: "maria@beautywellness.com", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Maria Rodriguez", email: "maria@beautywellness.com", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Maria Rodriguez", email: "maria@beautywellness.com", avatar: "https://i.pravatar.cc/150?u=4" },
];

interface AssignWaiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  waiver: any;
  assignType?: "clients" | "employees";
}

export default function AssignWaiverModal({ isOpen, onClose, waiver, assignType = "clients" }: AssignWaiverModalProps) {
  const [isDefault, setIsDefault] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const toggleClient = (client: Client) => {
    if (selectedClients.find((c) => c.id === client.id)) {
      setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
    } else {
      setSelectedClients([...selectedClients, client]);
    }
  };

  const removeClient = (clientId: string) => {
    setSelectedClients(selectedClients.filter((c) => c.id !== clientId));
  };

  const handleAssign = () => {
    // API call logic here
    onClose();
    setSelectedClients([]);
    setIsDefault(false);
    setSearchQuery("");
  };

  const isEmployee = assignType === "employees";
  const entityName = isEmployee ? "employees" : "clients";
  const entityNameCapitalized = isEmployee ? "Employees" : "Client's Profiles";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign to ${isEmployee ? 'Employees' : "Client's Profiles"}`} maxWidth="max-w-[600px]">
      <div className="py-2">
        <p className="text-[14px] text-[#64748B] mb-6">
          Select which {entityName} you want to assign this waiver to, or set as default for all {entityName}.
        </p>

        {/* Set as Default Toggle */}
        <div className="bg-[#F8FAFC] rounded-[16px] p-4 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#635BFF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[14px] font-medium text-[#1E293B]">Set as default for all {entityName}</span>
          </div>
          <button
            onClick={() => setIsDefault(!isDefault)}
            className={`w-11 h-6 rounded-full transition-colors relative ${isDefault ? "bg-[#635BFF]" : "bg-[#E2E8F0]"
              }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${isDefault ? "left-6" : "left-1"
                }`}
            />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-[14px] font-medium text-[#1E293B] mb-3">Or select specific {entityName}</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Client List */}
        <div className="border border-[#E2E8F0] rounded-[16px] p-2 mb-6 max-h-[240px] overflow-y-auto">
          {mockClients.map((client) => {
            const isSelected = !!selectedClients.find((c) => c.id === client.id);
            return (
              <div
                key={client.id}
                onClick={() => toggleClient(client)}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-[#F8FAFC]" : "hover:bg-[#F8FAFC]"
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected
                      ? "bg-[#635BFF] border-[#635BFF]"
                      : "border-[#CBD5E1] bg-white"
                    }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </div>
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[14px] font-medium text-[#1E293B]">{client.name}</h4>
                  <p className="text-[12px] text-[#94A3B8]">{client.email}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Clients Area */}
        {selectedClients.length > 0 && (
          <div className="mb-6 animate-in slide-in-from-top-2 fade-in duration-200">
            <h3 className="text-[14px] font-medium text-[#1E293B] mb-3">
              Selected {entityName} ({selectedClients.length})
            </h3>
            <div className="border border-[#E2E8F0] rounded-[16px] p-4 flex flex-wrap gap-2">
              {selectedClients.map((client) => (
                <div
                  key={`selected-${client.id}`}
                  className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]"
                >
                  <span className="text-[13px] font-medium text-[#1E293B]">{client.name}</span>
                  <button
                    onClick={() => removeClient(client.id)}
                    className="text-[#F43F5E] hover:text-red-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-[14px] font-medium text-[#475569] bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedClients.length === 0 && !isDefault}
            className={`px-6 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${selectedClients.length > 0 || isDefault
                ? "bg-[#06B6D4] text-white hover:bg-[#0891b2] shadow-lg shadow-[#06B6D4]/30"
                : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
              }`}
          >
            {selectedClients.length > 0
              ? `Assign Now (${selectedClients.length})`
              : "Assign Now"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
