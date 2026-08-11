"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Home, UserPlus, BookOpen, MoreVertical, ChevronDown, Banknote, Ticket, CreditCard, QrCode, Plus } from "lucide-react";
import SearchClientModal from "@/components/saloonOwner/checkout/SearchClientModal";
import SearchServiceModal from "@/components/saloonOwner/checkout/SearchServiceModal";
import DividePaymentModal from "@/components/saloonOwner/checkout/DividePaymentModal";

export default function CheckoutPage() {
  const router = useRouter();

  // Modals state
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isDivideModalOpen, setIsDivideModalOpen] = useState(false);

  // Data state
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [activePaymentMethods, setActivePaymentMethods] = useState<string[]>(["Cash"]);

  const paymentMethods = [
    { id: "Cash", icon: <Banknote className="w-6 h-6" /> },
    { id: "Gift Card", icon: <Ticket className="w-6 h-6" /> },
    { id: "Card Terminal", icon: <CreditCard className="w-6 h-6" /> },
    { id: "QR Code", icon: <QrCode className="w-6 h-6" /> },
  ];

  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    setIsClientModalOpen(false);
  };

  const handleSelectService = (service: any) => {
    // Add realistic mocked details for checkout
    const serviceToAdd = {
      ...service,
      id: Date.now(), // unique id
      date: "02/08/2025",
      price: "€ 170",
      startTime: "11:00",
      employee: { name: "Maria Rodriguez", avatar: "https://i.pravatar.cc/100?img=5" }
    };
    setServices([...services, serviceToAdd]);
    setIsServiceModalOpen(false);
  };

  // Calculations
  const subtotal = services.length * 170; // Hardcoded mock math
  const total = subtotal;

  const handlePaymentToggle = (id: string) => {
    setActivePaymentMethods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    if (activePaymentMethods.length > 1) {
      setIsDivideModalOpen(true);
    } else {
      // Single payment method, just complete checkout
      router.push("/dashboard?receiptSuccess=true");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <div className="bg-white  px-8 py-4 flex items-center justify-between top-0 z-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-[14px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#635BFF]" />
          Checkout
        </button>

        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#64748B]">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="bg-[#EEF2FF] text-[#635BFF] px-2 py-1 rounded-lg">Dashboard</span>
        </div>
      </div>

      <div className="py-6 w-full space-y-6 pb-24">

        {/* Basic Informations */}
        <div>
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-4">Basic Informations</h3>

          {!selectedClient ? (
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#1E293B]">
                {/* Custom User Icon approximation */}
                <UserPlus className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B] mb-3">No client registred</h4>
              <button
                onClick={() => setIsClientModalOpen(true)}
                className="bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2 rounded-lg font-bold text-[12px] transition-colors"
              >
                Select Client
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={selectedClient.avatar} alt="Avatar" className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <h4 className="text-[16px] font-bold text-[#1E293B]">{selectedClient.name}</h4>
                  <p className="text-[13px] text-[#94A3B8] font-medium mt-0.5">{selectedClient.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setIsClientModalOpen(true)}
                className="text-[#635BFF] text-[13px] font-bold hover:underline"
              >
                Change Client
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-[14px] font-bold text-[#1E293B] mb-1">Payment Methods</h3>
          <p className="text-[12px] text-[#94A3B8] font-medium mb-6">Select one or more methods.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentToggle(method.id)}
                className={`bg-white border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${activePaymentMethods.includes(method.id) ? "border-[#635BFF] shadow-sm" : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${activePaymentMethods.includes(method.id) ? "bg-[#EEF2FF] text-[#635BFF]" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}>
                  {method.icon}
                </div>
                <span className="text-[14px] font-bold text-[#1E293B]">{method.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-[#1E293B]">Services</h3>
            {services.length > 0 && (
              <button
                onClick={() => setIsServiceModalOpen(true)}
                className="bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-4 py-2 rounded-lg font-bold text-[12px] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Service
              </button>
            )}
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">

            {services.length === 0 ? (
              <div className="p-16 flex flex-col items-center justify-center text-center border-b border-[#E2E8F0]">
                <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#1E293B]">
                  <BookOpen className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B] mb-3">No services added</h4>
                <button
                  onClick={() => setIsServiceModalOpen(true)}
                  className="bg-[#E0E7FF] hover:bg-[#EEF2FF] text-[#635BFF] px-6 py-2 rounded-lg font-bold text-[12px] transition-colors"
                >
                  Select Services
                </button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-b border-[#E2E8F0]">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Service</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Date</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Price</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Start Time</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Duration</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-[#1E293B] whitespace-nowrap">Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, idx) => (
                      <tr key={service.id} className={idx !== services.length - 1 ? "border-b border-[#F1F5F9]" : ""}>
                        <td className="px-6 py-5 text-[13px] font-semibold text-[#1E293B]">{service.name}</td>
                        <td className="px-6 py-5 text-[13px] font-medium text-[#64748B]">{service.date}</td>
                        <td className="px-6 py-5 text-[13px] font-semibold text-[#1E293B]">{service.price}</td>
                        <td className="px-6 py-5 text-[13px] font-medium text-[#64748B]">{service.startTime}</td>
                        <td className="px-6 py-5 text-[13px] font-medium text-[#64748B]">{service.duration}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg w-fit">
                            <img src={service.employee.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
                            <span className="text-[12px] font-semibold text-[#1E293B]">{service.employee.name}</span>
                            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] ml-1" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Order Summary */}
            <div className="p-8 bg-white max-w-lg">
              <h4 className="text-[14px] font-bold text-[#1E293B] mb-6">Order Summary</h4>

              <div className="space-y-4 mb-4">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-[#64748B]">Tax</span>
                  <span className="font-bold text-[#1E293B]">0</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-[#64748B]">Discount</span>
                  <span className="font-bold text-[#1E293B]">0</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[14px] pt-4 mt-2">
                <span className="font-bold text-[#1E293B]">Total</span>
                <span className="font-bold text-[#1E293B] text-[16px]">€ {total}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 sm:p-6 border-t border-[#E2E8F0] flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <button
                onClick={() => router.back()}
                className="w-full sm:w-auto bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] px-6 py-2.5 rounded-lg font-bold text-[13px] transition-colors"
              >
                Back
              </button>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button className="shrink-0 w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
                  <MoreVertical className="w-4 h-4 text-[#64748B]" />
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={activePaymentMethods.length === 0}
                  className="flex-1 sm:flex-none w-full sm:w-auto bg-[#635BFF] hover:bg-[#524be0] disabled:opacity-50 text-white px-4 sm:px-8 py-2.5 rounded-lg font-bold text-[13px] transition-colors shadow-sm shadow-[#635BFF]/20"
                >
                  Save and Leave
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      <SearchClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSelectClient={handleSelectClient}
      />
      <SearchServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSelectService={handleSelectService}
      />
      <DividePaymentModal
        isOpen={isDivideModalOpen}
        onClose={() => setIsDivideModalOpen(false)}
        totalAmount={total}
        selectedMethods={activePaymentMethods}
      />
    </div>
  );
}
