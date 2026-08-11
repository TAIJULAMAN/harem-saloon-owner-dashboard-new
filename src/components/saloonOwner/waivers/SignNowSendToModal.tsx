import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";
import { User, Mail, UserPlus, ChevronDown, Search, Plus } from "lucide-react";

interface SignNowSendToModalProps {
  isOpen: boolean;
  onClose: () => void;
  waiver: any;
}

export default function SignNowSendToModal({ isOpen, onClose, waiver }: SignNowSendToModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [signType, setSignType] = useState<'in-person' | 'remote' | null>(null);

  // Group 1 receiver form state
  const [receiverType, setReceiverType] = useState<string>("Employees");
  const [isReceiverTypeDropdownOpen, setIsReceiverTypeDropdownOpen] = useState(false);

  // Remote Receivers State
  const [remoteReceivers, setRemoteReceivers] = useState<{ id: number, type: string, firstName?: string, lastName?: string, email?: string }[]>([
    { id: 1, type: 'Employees' }
  ]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const resetAndClose = () => {
    setStep(1);
    setSignType(null);
    setReceiverType("Employees");
    setIsReceiverTypeDropdownOpen(false);
    setRemoteReceivers([{ id: 1, type: 'Employees' }]);
    setOpenDropdownId(null);
    onClose();
  };

  const handleNext = () => {
    if (step === 1 && signType) {
      setStep(2);
    } else if (step === 2) {
      // Logic for step 2 next (e.g., submit)
      resetAndClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Sign Now/Send To" maxWidth="max-w-2xl">
      {step === 1 && (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-6 py-6">
            <div
              onClick={() => setSignType('in-person')}
              className={`border rounded-[16px] p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${signType === 'in-person'
                ? 'border-[#635BFF] bg-[#EEF2FF]'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
            >
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                <User className={`w-8 h-8 ${signType === 'in-person' ? 'text-[#635BFF]' : 'text-[#635BFF]'}`} />
              </div>
              <p className="text-[15px] font-medium text-[#1E293B]">In person</p>
            </div>
            <div
              onClick={() => setSignType('remote')}
              className={`border rounded-[16px] p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${signType === 'remote'
                ? 'border-[#635BFF] bg-[#EEF2FF]'
                : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                }`}
            >
              <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center">
                <Mail className={`w-8 h-8 ${signType === 'remote' ? 'text-[#635BFF]' : 'text-[#635BFF]'}`} />
              </div>
              <p className="text-[15px] font-medium text-[#1E293B]">Remote</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!signType}
              className={`px-8 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${signType
                ? 'bg-[#635BFF] text-white hover:bg-[#524be0]'
                : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && signType === 'in-person' && (
        <div className="flex flex-col space-y-8 mt-2">
          {/* Signers on the same waiver */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-medium text-[#1E293B]">Signers on the same waiver</h3>
              <button className="text-[13px] font-medium text-[#635BFF] hover:underline">Add Group</button>
            </div>

            <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[14px] font-medium text-[#1E293B]">Group 1</h4>
                <button className="bg-[#EEF2FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-medium flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors">
                  <Plus className="w-4 h-4" /> Add Signer
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Receiver Type</label>
                  <div
                    onClick={() => setIsReceiverTypeDropdownOpen(!isReceiverTypeDropdownOpen)}
                    className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#CBD5E1] transition-colors bg-white"
                  >
                    <span className="text-[14px] text-[#475569]">{receiverType}</span>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </div>

                  {isReceiverTypeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 overflow-hidden">
                      {['Employees', 'Clients', 'External'].map((type) => (
                        <div
                          key={type}
                          onClick={() => { setReceiverType(type); setIsReceiverTypeDropdownOpen(false); }}
                          className="px-4 py-2.5 text-[14px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {receiverType === 'External' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[13px] font-medium text-[#1E293B] block mb-1">First Name *</label>
                        <input type="text" placeholder="Enter first name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                      </div>
                      <div>
                        <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Last Name *</label>
                        <input type="text" placeholder="Enter last name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Email *</label>
                      <input type="email" placeholder="Enter email" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Select Receiver</label>
                      <div className="relative">
                        <input type="text" placeholder="Select" className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                        <Search className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Email *</label>
                      <input type="email" placeholder="Enter email" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Independent signers */}
          <div>
            <h3 className="text-[14px] font-medium text-[#1E293B] mb-3">Independent signers (Same template different contracts)</h3>
            <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-sm flex items-center justify-between">
              <h4 className="text-[14px] font-medium text-[#1E293B]">List of independent signers</h4>
              <button className="bg-[#EEF2FF] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-medium flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors">
                <Plus className="w-4 h-4" /> Add Signer
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button className="bg-[#EEF2FF] text-[#635BFF] px-5 py-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors">
              <Plus className="w-4 h-4" /> Add Receiver
            </button>
            <button
              onClick={handleNext}
              className="bg-[#635BFF] text-white px-8 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#524be0] transition-colors shadow-sm shadow-[#635BFF]/20"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && signType === 'remote' && (
        <div className="flex flex-col space-y-6 mt-2 max-h-[60vh] overflow-y-auto pr-2 pb-2">
          {remoteReceivers.map((receiver, index) => (
            <div key={receiver.id} className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-sm">
              <h4 className="text-[14px] font-medium text-[#1E293B] mb-6">Receiver {index + 1}</h4>
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Receiver Type</label>
                  <div
                    onClick={() => setOpenDropdownId(openDropdownId === receiver.id ? null : receiver.id)}
                    className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#CBD5E1] transition-colors bg-white"
                  >
                    <span className="text-[14px] text-[#475569]">{receiver.type}</span>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                  </div>

                  {openDropdownId === receiver.id && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 overflow-hidden">
                      {['Employees', 'Clients', 'External'].map((type) => (
                        <div
                          key={type}
                          onClick={() => {
                            setRemoteReceivers(remoteReceivers.map(r => r.id === receiver.id ? { ...r, type } : r));
                            setOpenDropdownId(null);
                          }}
                          className="px-4 py-2.5 text-[14px] text-[#475569] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {receiver.type === 'External' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[13px] font-medium text-[#1E293B] block mb-1">First Name *</label>
                        <input type="text" placeholder="Enter first name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                      </div>
                      <div>
                        <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Last Name *</label>
                        <input type="text" placeholder="Enter last name" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Email *</label>
                      <input type="email" placeholder="Enter email" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Select Receiver</label>
                      <div className="relative">
                        <input type="text" placeholder="Select" className="w-full border border-[#E2E8F0] rounded-lg pl-4 pr-10 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                        <Search className="w-4 h-4 text-[#94A3B8] absolute right-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[13px] font-medium text-[#1E293B] block mb-1">Email *</label>
                      <input type="email" placeholder="Enter email" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#635BFF] placeholder:text-[#94A3B8]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setRemoteReceivers([...remoteReceivers, { id: Date.now(), type: 'Employees' }])}
              className="bg-[#EEF2FF] text-[#635BFF] px-5 py-2.5 rounded-lg text-[13px] font-medium flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Receiver
            </button>
            <button
              onClick={handleNext}
              className="bg-[#635BFF] text-white px-8 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#524be0] transition-colors shadow-sm shadow-[#635BFF]/20"
            >
              Send to receivers
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
