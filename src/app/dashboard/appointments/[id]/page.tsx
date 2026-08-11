"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AppointmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="w-full space-y-6">

      {/* Top Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-4 flex items-center">
        <Link
          href="/dashboard/appointments"
          className="flex items-center text-[14px] font-bold text-[#1E293B] hover:text-[#635BFF] transition-colors gap-2"
        >
          <ChevronLeft className="w-4 h-4 text-[#635BFF]" />
          View Appointment
        </Link>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Column: Basic Informations */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 space-y-6">
          <h2 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope">Basic Informations</h2>

          <div className="space-y-2">
            <span className="text-[12px] font-medium text-[#94A3B8]">Client</span>
            <div className="bg-[#F8F9FE] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#E2E8F0] overflow-hidden shrink-0">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Maria Fernandez" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-bold text-[#1E293B] font-manrope leading-tight truncate">Maria Fernandez</span>
                  <span className="text-[13px] font-medium text-[#94A3B8] truncate">maria@gmail.com</span>
                </div>
              </div>
              <button className="w-full sm:w-auto shrink-0 bg-[#E0E7FF] hover:bg-[#cdd7fb] text-[#635BFF] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors whitespace-nowrap">
                View Profile
              </button>
            </div>
          </div>

          <div className="flex items-start justify-between border-t border-[#E2E8F0] pt-6">
            <div className="space-y-1">
              <span className="text-[12px] font-medium text-[#94A3B8] block">Date</span>
              <span className="text-[14px] font-bold text-[#1E293B]">02/08/2025</span>
            </div>
            <div className="space-y-1">
              <span className="text-[12px] font-medium text-[#94A3B8] block">Time</span>
              <span className="text-[14px] font-bold text-[#1E293B]">11:00 - 11:15</span>
            </div>
            <div className="w-16"></div> {/* Spacer to keep layout balanced if needed */}
          </div>

          <div className="space-y-2 border-t border-[#E2E8F0] pt-6">
            <span className="text-[12px] font-medium text-[#94A3B8] block">Status</span>
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold tracking-wide bg-[#E0E7FF] text-[#635BFF]">
              Booked
            </span>
          </div>
        </div>

        {/* Right Column: Appointment Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-8">Appointment Activity</h2>

          <div className="space-y-8 relative">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[99px] top-2 bottom-6 w-[2px] bg-[#E2E8F0] -z-10"></div>

            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-20 text-right shrink-0 pt-0.5">
                <span className="text-[13px] font-bold text-[#1E293B] block leading-tight">02 Aug 2025</span>
                <span className="text-[11px] font-medium text-[#94A3B8]">at 07:00</span>
              </div>
              <div className="relative flex items-center justify-center pt-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#635BFF] bg-white"></div>
              </div>
              <div className="pt-0.5">
                <span className="text-[13px] font-medium text-[#1E293B]">Appointment Created</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-20 text-right shrink-0 pt-0.5">
                <span className="text-[13px] font-bold text-[#1E293B] block leading-tight">02 Aug 2025</span>
                <span className="text-[11px] font-medium text-[#94A3B8]">at 07:00</span>
              </div>
              <div className="relative flex items-center justify-center pt-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#06B6D4] bg-white"></div>
              </div>
              <div className="pt-0.5">
                <span className="text-[13px] font-medium text-[#1E293B]">Appointment Confirmed</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-20 text-right shrink-0 pt-0.5">
                <span className="text-[13px] font-bold text-[#1E293B] block leading-tight">02 Aug 2025</span>
                <span className="text-[11px] font-medium text-[#94A3B8]">at 07:00</span>
              </div>
              <div className="relative flex items-center justify-center pt-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#64748B] bg-white"></div>
              </div>
              <div className="pt-0.5">
                <span className="text-[13px] font-medium text-[#1E293B]">Appointment Started</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-20 text-right shrink-0 pt-0.5">
                <span className="text-[13px] font-bold text-[#1E293B] block leading-tight">02 Aug 2025</span>
                <span className="text-[11px] font-medium text-[#94A3B8]">at 07:00</span>
              </div>
              <div className="relative flex items-center justify-center pt-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#06B6D4] bg-white"></div>
              </div>
              <div className="pt-0.5">
                <span className="text-[13px] font-medium text-[#1E293B]">Receipt Printed</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4">
              <div className="w-20 text-right shrink-0 pt-0.5">
                <span className="text-[13px] font-bold text-[#1E293B] block leading-tight">02 Aug 2025</span>
                <span className="text-[11px] font-medium text-[#94A3B8]">at 07:00</span>
              </div>
              <div className="relative flex items-center justify-center pt-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#10B981] bg-white"></div>
              </div>
              <div className="pt-0.5">
                <span className="text-[13px] font-medium text-[#1E293B]">Paid</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Note Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-6 relative">
        <h2 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-4">Note</h2>

        <p className="text-[13px] font-medium text-[#64748B] leading-relaxed max-w-4xl">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
        </p>
      </div>

      {/* Services Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
        <div className="p-6">
          <h2 className="text-[1.1rem] font-bold text-[#1E293B] font-manrope mb-6">Services</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope w-[20%]">Service</th>
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope">Date</th>
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope">Price</th>
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope">Start Time</th>
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope">Duration</th>
                  <th className="pb-4 text-[13px] font-bold text-[#1E293B] font-manrope w-[25%]">Employee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E2E8F0] last:border-0">
                  <td className="py-6 text-[13px] font-bold text-[#1E293B]">Haircut</td>
                  <td className="py-6 text-[13px] font-medium text-[#64748B]">02/08/2025</td>
                  <td className="py-6 text-[13px] font-medium text-[#64748B]">€ 170</td>
                  <td className="py-6 text-[13px] font-medium text-[#64748B]">11:00</td>
                  <td className="py-6 text-[13px] font-medium text-[#64748B]">15 min</td>
                  <td className="py-6">
                    <div className="inline-flex items-center gap-2 bg-[#F8F9FE] px-2 py-1.5 rounded-lg border border-[#E2E8F0] cursor-pointer hover:bg-[#F1F5F9] transition-colors">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-[#E2E8F0]">
                        <img src="https://i.pravatar.cc/150?img=5" alt="Maria Rodriguez" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[13px] font-bold text-[#1E293B] font-manrope">Maria Rodriguez</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Bar */}
        <div className="p-6 bg-white border-t border-[#E2E8F0] rounded-b-xl flex items-center justify-between">
          <span className="text-[14px] font-bold text-[#1E293B] font-manrope">Total</span>
          <span className="text-[16px] font-bold text-[#1E293B]">€ 340</span>
        </div>
      </div>

    </div>
  );
}
