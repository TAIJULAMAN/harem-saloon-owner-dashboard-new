import React, { useState } from "react";
import Modal from "@/components/saloonOwner/common/Modal";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

export default function AddEmployeeModal({ isOpen, onClose, isEdit = false }: AddEmployeeModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const [services, setServices] = useState([
    { id: 1, name: "Hair Color", duration: "15 min", price: "€ 170", active: true },
    { id: 2, name: "Hair Color", duration: "30 min", price: "€ 170", active: false },
    { id: 3, name: "Hair Color", duration: "15 min", price: "€ 170", active: false },
    { id: 4, name: "Hair Color", duration: "15 min", price: "€ 170", active: true },
    { id: 5, name: "Hair Color", duration: "30 min", price: "€ 170", active: false },
    { id: 6, name: "Hair Color", duration: "15 min", price: "€ 170", active: false },
  ]);

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Contacts" },
    { id: 3, label: "Contract" },
    { id: 4, label: "Services" }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Employee" : "Add Employee"} maxWidth="max-w-2xl">
      <div className="mb-10 relative px-2 sm:px-8">
        <div className="max-w-sm mx-auto relative">
          {/* Background Progress line */}
          <div className="absolute left-4 right-4 top-4 h-[2px] bg-[#E2E8F0]"></div>
          {/* Active Progress line */}
          <div className="absolute left-4 top-4 h-[2px] bg-[#635BFF] transition-all duration-300" style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)` }}></div>

          <div className="flex justify-between items-center relative z-10">
            {steps.map(step => (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${currentStep >= step.id ? "bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30" : "bg-[#F1F5F9] text-[#94A3B8]"
                    }`}
                >
                  {step.id}
                </div>
                <span
                  className={`absolute top-10 text-[10px] sm:text-[11px] font-semibold text-center whitespace-nowrap transition-colors duration-300 ${currentStep >= step.id ? "text-[#1E293B]" : "text-[#94A3B8]"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">First Name *</label>
              <input type="text" placeholder="Enter first name" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Last Name *</label>
              <input type="text" placeholder="Enter last name" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Date of birth *</label>
              <input type="text" placeholder="Enter date of birth" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]" />
            </div>
            <div className="col-start-1">
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Address *</label>
              <input type="text" placeholder="Enter address" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">City *</label>
              <input type="text" placeholder="Enter city" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Province *</label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]">
                <option>Select province</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">CAP *</label>
              <input type="text" placeholder="Enter CAP" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="col-span-2">
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">E-mail *</label>
              <input type="email" placeholder="Enter email" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Emergency Contact Name</label>
              <input type="text" placeholder="Enter emergency contact name" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Emergency Contact (Telephone)</label>
              <input type="text" placeholder="Enter emergency contact telephone" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Contract Type *</label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]">
                <option>Part Time</option>
                <option>Full Time</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Tax ID Code *</label>
              <input type="text" placeholder="Enter Tax ID Code" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">IBAN</label>
              <input type="text" placeholder="Enter IBAN for salary payments" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Start Date *</label>
              <input type="text" placeholder="Enter start date" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">End Date</label>
              <input type="text" placeholder="Enter end date" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]" />
            </div>
            <div className="col-span-2">
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Role *</label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]">
                <option>Staff</option>
                <option>Manager</option>
                <option>Accountant</option>
              </select>
              <button className="text-[#635BFF] text-[13px] font-semibold mt-2 hover:underline">
                Add role permissions
              </button>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Item remuneration type *</label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors text-[#94A3B8]">
                <option>Fixed</option>
                <option>Hourly</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">Amount *</label>
              <input type="text" placeholder="Enter amount" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#635BFF] transition-colors" />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#F8FAFC] rounded-lg p-4 border border-[#F1F5F9]">
                <div>
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">{service.name}</div>
                  <div className="text-[11px] font-bold text-[#94A3B8]">{service.duration}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[14px] font-bold text-[#1E293B]">{service.price}</div>
                  <div
                    onClick={() => toggleService(service.id)}
                    className={`w-9 h-5 flex items-center rounded-full p-[2px] cursor-pointer transition-colors ${service.active ? 'bg-[#635BFF]' : 'bg-[#CBD5E1]'
                      }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${service.active ? 'translate-x-4' : 'translate-x-0'
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-[#E2E8F0]">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-5 py-2 text-[13px] font-semibold text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
            >
              Back
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#635BFF] hover:bg-[#524be0] text-white text-[13px] font-semibold rounded-lg transition-colors"
            >
              {isEdit ? "Save Changes" : "Add Member and send invitation"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
