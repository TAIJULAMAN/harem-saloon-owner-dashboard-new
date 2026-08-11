import React from "react";

export function MostLoyalCustomers() {
  const loyalCustomers = [
    {
      id: 1,
      name: "Sofa Biachi",
      lastVisit: "November 27, 2024",
      appointments: 25,
      spent: "€ 1,700",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      lastVisit: "October 04, 2024",
      appointments: 24,
      spent: "€ 1,500",
    },
    {
      id: 3,
      name: "Cameron Williamson",
      lastVisit: "December 20, 2024",
      appointments: 20,
      spent: "€ 1,200",
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 md:p-8">
      <h3 className="font-bold text-[#1E293B] text-[14px] mb-6">Most Loyal Customers</h3>

      <div className="space-y-4">
        {loyalCustomers.map((customer) => (
          <div key={customer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-[16px] gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[10px] bg-[#635BFF] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {customer.id}
              </div>
              <div>
                <div className="font-bold text-[13px] text-[#1E293B]">{customer.name}</div>
                <div className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Last Visit: {customer.lastVisit}</div>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-8 text-right pl-14 sm:pl-0">
              <div className="text-left sm:text-right">
                <div className="font-bold text-[14px] text-[#1E293B]">{customer.appointments}</div>
                <div className="text-[11px] text-[#94A3B8] font-medium">Appointments</div>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-bold text-[14px] text-[#22C55E]">{customer.spent}</div>
                <div className="text-[11px] text-[#94A3B8] font-medium">Total Spent</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
