import React from "react";

export default function Payment({
  paymentMethods,
  setSelectedPayment,
  setShowDivideModal,
  selectedPayment,
}: {
  paymentMethods: { id: string; label: string; icon: React.ReactNode }[];
  setSelectedPayment: (id: string) => void;
  setShowDivideModal: (show: boolean) => void;
  selectedPayment: string | null;
}) {
  return (
    <div>
      <div className="bg-white rounded-xl p-[30px] border border-[#E0E6EB]">
        <h3 className="text-sm font-semibold text-[#29343D] mb-2">
          Payment Methods
        </h3>
        <p className="text-xs font-manrope text-[#98A4AE] mb-4">
          Select one or more methods.
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setSelectedPayment(method.id);
                setShowDivideModal(true);
              }}
              className={`flex flex-col items-center justify-center py-6 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === method.id
                  ? "border-[#635BFF] bg-[#F5F4FF]"
                  : "border-[#EFF4FA] hover:border-[#635BFF] hover:bg-[#F5F4FF]"
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-3">
                {method.icon}
              </div>
              <span className="text-sm font-medium text-[#29343D]">
                {method.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
