// "use client";

// import React, { useState } from "react";
// import { ChevronDown, ChevronUp, Edit2 } from "lucide-react";

// export default function AgendaAppointments() {
//   const [expandedId, setExpandedId] = useState<number | null>(1);

//   const appointments = [
//     {
//       id: 1,
//       name: "Maria Rodriguez",
//       phone: "+39 345 678 9123",
//       avatar: "https://i.pravatar.cc/100?img=1",
//       time: "12:00 AM - 12:15 AM",
//       status: "Booked",
//     },
//     {
//       id: 2,
//       name: "Maria Rodriguez",
//       phone: "+39 345 678 9123",
//       avatar: "https://i.pravatar.cc/100?img=5",
//       time: "12:00 AM - 12:15 AM",
//       status: "Booked",
//     },
//   ];

//   return (
//     <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)] h-full flex flex-col">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
//         <h2 className="text-[16px] font-bold text-[#1E293B]">Agenda - Appointments</h2>
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[12px] font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
//             Sep 16, 2025 <ChevronDown className="w-3 h-3 text-[#64748B]" />
//           </button>
//           <button className="flex-1 sm:flex-none px-4 py-1.5 border border-[#635BFF] text-[#635BFF] rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors text-center">
//             View All
//           </button>
//         </div>
//       </div>

//       {/* List Container */}
//       <div className="border border-[#E2E8F0] rounded-lg overflow-hidden flex-1 flex flex-col">
//         {/* Table Header */}
//         <div className="hidden md:grid bg-[#F8FAFC] grid-cols-3 px-6 py-4 border-b border-[#E2E8F0]">
//           <div className="text-[12px] font-bold text-[#64748B]">Client</div>
//           <div className="text-[12px] font-bold text-[#64748B]">Time</div>
//           <div className="text-[12px] font-bold text-[#64748B]">Status</div>
//         </div>

//         {/* List Body */}
//         <div className="flex-1 overflow-y-auto">
//           {appointments.map((apt) => {
//             const isExpanded = expandedId === apt.id;
//             return (
//               <div key={apt.id} className="border-b border-[#E2E8F0] last:border-b-0 p-6">

//                 {/* Main Row */}
//                 <div className="flex flex-col md:grid md:grid-cols-3 items-start md:items-center gap-4">
//                   {/* Client */}
//                   <div className="flex items-center gap-3 w-full">
//                     <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E2E8F0] shrink-0">
//                       <img src={apt.avatar} alt={apt.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="text-[13px] font-bold text-[#1E293B]">{apt.name}</div>
//                       <div className="text-[11px] font-medium text-[#94A3B8]">{apt.phone}</div>
//                     </div>
//                   </div>

//                   {/* Time */}
//                   <div className="text-[12px] font-semibold text-[#64748B] w-full">
//                     <span className="md:hidden font-bold mr-2">Time:</span>
//                     {apt.time}
//                   </div>

//                   {/* Status & Actions */}
//                   <div className="flex items-center justify-between w-full md:w-auto">
//                     <span className="bg-[#E0E7FF] text-[#635BFF] px-3 py-1 rounded-lg text-[11px] font-bold">
//                       {apt.status}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <button className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors">
//                         <Edit2 className="w-3.5 h-3.5" />
//                       </button>
//                       <button
//                         onClick={() => setExpandedId(isExpanded ? null : apt.id)}
//                         className="w-8 h-8 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#635BFF] transition-colors"
//                       >
//                         {isExpanded ? <ChevronUp className="w-4 h-4 text-[#635BFF]" /> : <ChevronDown className="w-4 h-4" />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expanded Timeline */}
//                 {isExpanded && (
//                   <div className="mt-6 pt-6 border-t border-[#F1F5F9] flex flex-col items-center">
//                     <h4 className="text-[13px] font-bold text-[#1E293B] mb-6">Booking Order</h4>

//                     <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
//                       <div className="flex items-start justify-center gap-4 w-full min-w-[300px] max-w-[400px] relative mx-auto">
//                         {/* Connecting Line */}
//                         <div className="absolute top-[14px] left-[15%] right-[15%] h-[2px] bg-[#E2E8F0] -z-10"></div>

//                         {/* Step 1 */}
//                         <div className="flex-1 flex flex-col items-center relative z-0">
//                           <div className="w-7 h-7 rounded-full bg-white border-[2px] border-[#FBBF24] text-[#FBBF24] font-bold text-[12px] flex items-center justify-center mb-2">1</div>
//                           <div className="bg-[#FEF3C7] text-[#F59E0B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">Overdue</div>
//                           <div className="text-[10px] font-semibold text-[#94A3B8]">12:00 - 12:05</div>
//                           <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
//                           <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
//                         </div>

//                         {/* Step 2 */}
//                         <div className="flex-1 flex flex-col items-center relative z-0">
//                           <div className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#64748B] font-bold text-[12px] flex items-center justify-center mb-2">2</div>
//                           <div className="bg-[#F1F5F9] text-[#64748B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">To Do</div>
//                           <div className="text-[10px] font-semibold text-[#94A3B8]">12:30 - 12:45</div>
//                           <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
//                           <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
//                         </div>

//                         {/* Step 3 */}
//                         <div className="flex-1 flex flex-col items-center relative z-0">
//                           <div className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#64748B] font-bold text-[12px] flex items-center justify-center mb-2">3</div>
//                           <div className="bg-[#F1F5F9] text-[#64748B] px-3 py-0.5 rounded-full text-[10px] font-bold mb-2">To Do</div>
//                           <div className="text-[10px] font-semibold text-[#94A3B8]">13:00 - 13:15</div>
//                           <div className="text-[12px] font-bold text-[#1E293B]">Shampoo</div>
//                           <div className="text-[11px] font-medium text-[#94A3B8]">Angelica</div>
//                         </div>
//                       </div>
//                     </div>

//                     <button className="mt-8 bg-[#E0E7FF] text-[#635BFF] px-6 py-2 rounded-lg text-[12px] font-bold hover:bg-[#EEF2FF] transition-colors">
//                       Print Receipt
//                     </button>
//                   </div>
//                 )}

//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import Image from "next/image";

type Appointment = {
  id: string;
  photo?: string;
  name: string;
  phone: string;
  time: string;
  status: "Booked" | "Completed" | "Cancelled";
};

type Props = {
  appointments: Appointment[];
};

export default function AgendaAppointments({ appointments }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Sep 16, 2025");

  const options = [
    "Sep 16, 2025",
    "Sep 17, 2025",
    "Sep 18, 2025",
    "Sep 19, 2025",
  ];
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#1E293B] font-manrope">
            Agenda - Appointments
          </h2>
        </div>

        <div className="flex gap-3">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 flex items-center gap-2.5 font-manrope rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              {selected}
              <ChevronDown width={16} height={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-md z-20">
                {options.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelected(item);
                      setOpen(false);
                    }}
                    className="font-manrope block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 text-sm font-medium font-manrope cursor-pointer">
            View All
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 bg-[#F3F3FF] rounded-t-xl px-6 py-3 text-[#29343D] text-sm font-medium font-manrope">
        <span>Client</span>
        <span>Time</span>
        <span>Status</span>
      </div>

      {/* Scrollable Body */}
      <div className="max-h-[500px] overflow-y-auto bg-white rounded-b-xl border border-gray-200">
        {appointments.map((appointment) => {
          const isOpen = openId === appointment.id;

          return (
            <div key={appointment.id} className="border-t border-gray-200">
              {/* Main Row */}
              <div className="grid grid-cols-3 max-[575px]:grid-cols-1 max-[575px]:gap-3 items-center px-6 py-5">
                {/* Client */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-pink-200 flex items-center justify-center text-white font-bold">
                    {/* {appointment.photo} */}
                    <Image
                      src={appointment.photo || ""}
                      alt={appointment.name}
                      width={48}
                      height={48}
                      objectFit="cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-[#29343D] font-manrope text-sm">
                      {appointment.name}
                    </p>
                    <p className="text-[#999] text-[12px] font-manrope font-normal">
                      {appointment.phone}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="text-[#526B7A] font-manrope font-normal text-[12px]">
                  {appointment.time}
                </div>

                {/* Status + Actions */}
                <div className="flex items-center gap-6">
                  <span className="px-2.5 py-1 rounded-full bg-[#DDDBFF] text-[#635BFF] text-sm font-manrope font-medium">
                    {appointment.status}
                  </span>

                  <div className="flex items-center gap-3">
                    <button className="bg-[#EFF4FA] px-4 py-2.5 rounded-[8px] cursor-pointer">
                      <Pencil size={16} color="#46CAEB" />
                    </button>

                    <button
                      onClick={() => setOpenId(isOpen ? null : appointment.id)}
                      className="text-indigo-500"
                    >
                      <ChevronDown
                        color="#635BFF"
                        size={24}
                        className={`cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isOpen && (
                <div className="px-10 pb-8">
                  <h3 className="text-center text[#29343D] font-semibold font-manrope mb-4 text-sm">
                    Booking Order
                  </h3>
                  <div className="relative flex justify-between items-start">
                    {/* Connector Line */}
                    <div className="absolute top-5 left-[calc(16.67%)] right-[calc(16.67%)] h-[2px] bg-[#B9C3CC]" />
                    {[1, 2, 3].map((step) => {
                      const isActive = step === 1;
                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-col items-center w-1/3"
                        >
                          {/* Circle */}
                          <div
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm font-manrope font-medium
                              ${isActive
                                ? "bg-[#FFF9E5] text-[#FFD648]"
                                : "bg-gray-500 text-white"
                              }
                            `}
                          >
                            {step}
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`
                              mt-3 text-xs px-2 py-1 rounded-[8px] font-medium font-manrope
                              ${isActive
                                ? "bg-[#FFF9E5] text-[#FFD648]"
                                : "bg-[#EFF4FA] text-[#0A2540]"
                              }
                            `}
                          >
                            {isActive ? "Overdue" : "To Do"}
                          </span>

                          {/* Details */}
                          <div className="mt-3 text-center">
                            <p className="text-xs text-[#999] font-manrope">
                              12:00-12:05
                            </p>
                            <p className="text-sm font-manrope text-[#29343D] font-semibold my-0.5">
                              Shampoo
                            </p>
                            <p className="text-xs text-[#999] font-manrope font-normal">
                              Angelica
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    <button className="px-4 py-2.5 bg-[#DDDBFF] text-[#635BFF] rounded-[8px] font-manrope hover:bg-[#D3D0FF] transition mt-4 cursor-pointer">
                      Print Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
